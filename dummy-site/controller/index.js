const k8s = require('@kubernetes/client-node');
const mustache = require('mustache');
const request = require('request');
const JSONStream = require('json-stream');
const fs = require('fs').promises;

// Use Kubernetes client to interact with Kubernetes

const timeouts = {};

const kc = new k8s.KubeConfig();

process.env.NODE_ENV === 'development' ? kc.loadFromDefault() : kc.loadFromCluster();

const opts = {};
kc.applyToRequest(opts);

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const sendRequestToApi = async (api, method = 'get', options = {}) => new Promise((resolve, reject) => request[method](
        `${kc.getCurrentCluster().server}${api}`,
        {
            ...opts, ...options,
            headers: {...options.headers, ...opts.headers}
        },
        (err, res) => err ? reject(err) : resolve(JSON.parse(res.body))
    )
);

const fieldsFromDummySite = (object) => ({
    dummy_site_name: object.metadata.name,
    job_name: `${object.metadata.name}-job`,
    namespace: object.metadata.namespace,
    website_url: object.spec.website_url,
    image: object.spec.image
});

const pvcForDummySiteAlreadyExists = async (fields) => {
    const {dummy_site_name, namespace} = fields;
    const persistentvolumeclaims = await sendRequestToApi(`/api/v1/namespaces/${namespace}/persistentvolumeclaims`);

    console.log(persistentvolumeclaims);

    return persistentvolumeclaims.items.find(item => item.metadata.labels.dummy_site === dummy_site_name);
};

const getYAML = async (object_name, fields) => {
    const deploymentTemplate = await fs.readFile(`templates/${object_name}.mustache`, 'utf-8');

    return mustache.render(deploymentTemplate, fields);
};

const createObject = async (object_type, api_url, fields) => {
    console.log('Creating ', object_type, 'for', fields.dummy_site_name, 'to namespace', fields.namespace)

    const yaml = await getYAML(object_type, fields);

    console.log('YAML for ', object_type, ':', yaml);

    return sendRequestToApi(api_url, 'post', {
        headers: {
            'Content-Type': 'application/yaml'
        },
        body: yaml
    });
};

const maintainStatus = async () => {
    (await k8sApi.listPodForAllNamespaces()).body; // A bug in the client(?) was fixed by sending a request and not caring about response

    /**
     * Watch DummySites
     */
    const dummy_site_stream = new JSONStream()

    dummy_site_stream.on('data', async ({type, object}) => {
        const fields = fieldsFromDummySite(object)

        if (type === 'ADDED') {
            if (await pvcForDummySiteAlreadyExists(fields)) {
                // May be this is not the smartest way to check that we have already dummy site.
                // But I think this is okay for learning purposes.
                console.log('PVC for', fields.dummy_site_name, 'already exists');
                return;
            }

            let result = await createObject('pv', `/api/v1/persistentvolumes`, fields);
            console.log('Create pv result:', result);

            result = await createObject('pvc', `/api/v1/namespaces/${fields.namespace}/persistentvolumeclaims`, fields);
            console.log('Create pvc result:', result);

            result = await createObject('job', `/apis/batch/v1/namespaces/${fields.namespace}/jobs`, fields);
            console.log('Create job result:', result);

            result = await createObject('deployment', `/apis/apps/v1/namespaces/${fields.namespace}/deployments`, fields);
            console.log('Create deployment result:', result);

            result = await createObject('service', `/api/v1/namespaces/${fields.namespace}/services`, fields);
            console.log('Create service result:', result);

            result = await createObject('ingress', `/apis/networking.k8s.io/v1/namespaces/${fields.namespace}/ingresses`, fields);
            console.log('Create ingress result:', result);

        }
    })

    request.get(`${kc.getCurrentCluster().server}/apis/stable.dwk/v1/dummysites?watch=true`, opts).pipe(dummy_site_stream)
}

maintainStatus();
