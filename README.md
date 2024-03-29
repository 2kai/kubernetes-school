##### Part 0

```shell
docker build -t kubernetes-school .
docker run --rm -it -p 8001:3005 -p 9090:9090 -p 8080:8080 -v /var/run/docker.sock:/var/run/docker.sock -v "$PWD":/opt -v "$PWD"/.config/.config:/root/.config/gcloud -v "$PWD"/.config/.kube:/root/.kube kubernetes-school bash
```

Then inside Docker container

```shell
HOST_IP=`ip -4 route show default | cut -d" " -f3`
k3d cluster create --port 8082:30080@agent:0 --port 8081:80@loadbalancer -a 2 --k3s-arg "--tls-san="$HOST_IP"@server:0"
docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube
sed -i 's/https:\/\/0.0.0.0/https:\/\/'"$HOST_IP"'/' /root/.kube/config
kubectl cluster-info
k9s
```

##### Part 1

1.01, 1.03 - hash-generator  
1.02, 1.04, 1.05, 1.06, 1.08, 1.12, 1.13 - todo-project  
1.07, 1.10, 1.11 - log-output  
1.09 - ping-pong

##### Part 2

2.01, 2.03, 2.06 - log-output  
2.02, 2.04, 2.08, 2.09, 2.10 - todo-project  
2.07 - ping-pong

##### Part 3

```shell
gcloud auth login
gcloud config set project devops-with-kubernetes-291121
gcloud services enable container.googleapis.com
gcloud container clusters create dwk-cluster --zone=europe-north1-b --release-channel=rapid --cluster-version=1.22
# Do something
gcloud container clusters delete dwk-cluster --zone=europe-north1-b
```

3.01, 3.02, 3.09 - ping-pong  
3.03, 3.04, 3.05, 3.08 - todo-project

###### Exercise 3.06

**DBaaS vs DIY**

* Setup (DBaaS = DIY)

  Setup of DBaaS looks like a simple choice of an image. But in real life it could be a bit more painful when it comes
  to configuration of networking. On the other hand modern databases are almost production ready, and it is not a
  problem to set up new database.
* Configuration (DBaaS < DIY)

  Here I'd give a win to DIY databases. You have the full power and can configure everything like you want. DBaaS are
  pretty closed in this meaning. From top of my head - there is a problem with max_connections in PostgreSQL that you
  cannot change it without changing machine type (and therefore increased costs) and have to use PgBouncer, e.g.
* Backup and maintenance overall (DBaaS > DIY)

  It is so easy to make backups and restore database in DBaaS in comparison with DIY. Even if dumps are easy to create
  in DIY then you still have a question where to store them, how to restore easily etc.
* Price (DBaaS < DIY)

  At the first glance DBaaS is much more expensive. I took a look at our last month invoice in one project. We paid €124
  for very simple instance of Google Cloud SQL. Early in this course we saw that for that money one can buy 6 nodes
  1vCPU each. I understand that database is not just CPU but also RAM and disk and networking. But still DIY looks
  cheaper than DBaaS.

* Log and monitoring (DBaaS > DIY)

  Since Cloud SQL is the part of big Cloud family then it is easier to set up logging and monitoring (in most cases it
  works out of the box). This is not a big problem for DIY but still requires more efforts.

As usual the choice between DBaaS and DIY is a matter of each particular case. And the correct choice depends on many
factors besides aforementioned.

###### Exercise 3.07

I have both options (Cloud SQL and DIY PostgreSQL) at my current job. And my choice for this course is DIY PostgreSQL.
It is more interesting to work and learn StatefulSet and PVC. It is more useful for learning k8s manifests. It is
cheaper for such small projects. It doesn't require all cool stuff that Cloud SQL provides.

###### Exercise 3.10

Enabled Google Cloud Logging and Google Cloud Monitoring.
![](./logs.png "Kubernetes Logs")

##### Part 4

4.01 - ping-pong  
4.02, 4.04, 4.05, 4.06 - todo-project

###### Exercise 4.03

```shell
kubectl -n prometheus port-forward prometheus-kube-prometheus-stack-1639-prometheus-0 9090:9090 --address=0.0.0.0
```

Query for Prometheus: `scalar(count(kube_pod_info{namespace="prometheus", created_by_kind="StatefulSet"}))`

###### Exercise 4.07

```shell
flux bootstrap github \
    --owner=2kai \
    --repository=kubernetes-school-cluster
```

Now cluster is managed by Flux and https://github.com/2kai/kubernetes-school-cluster repository.

###### Exercise 4.08

Final script to recreate cluster from scratch

```shell
HOST_IP=`ip -4 route show default | cut -d" " -f3`
k3d cluster create --port 8082:30080@agent:0 --port 8081:80@loadbalancer -a 2 --k3s-arg "--tls-san="$HOST_IP"@server:0"
docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube
sed -i 's/https:\/\/0.0.0.0/https:\/\/'"$HOST_IP"'/' /root/.kube/config
kubectl create namespace argo-rollouts
kubectl apply -n argo-rollouts -f https://raw.githubusercontent.com/argoproj/argo-rollouts/master/manifests/install.yaml
# Create JSON key for Service account
kubectl create namespace flux-system
kubectl -n flux-system create secret generic google-applications-credentials --from-file=keyfile.json --type=Opaque
flux bootstrap github \
    --owner=2kai \
    --repository=kubernetes-school-cluster
kubectl annotate serviceaccount kustomize-controller \
  --namespace flux-system \
  iam.gke.io/gcp-service-account=github-actions@devops-with-kubernetes-291121.iam.gserviceaccount.com
kubectl -n project cp todo-project/api/structure.sql todo-project-postgres-ss-0:/structure.sql
kubectl -n project exec -it todo-project-postgres-ss-0 -- sh -c 'psql -U postgres < /structure.sql'
```

##### Part 5

5.01 - dummy-site  
5.02 - todo-project

###### Exercise 5.03

Learned how to run Automated Canary Releases using Linkerd and Flagger.  
Script command output is [here](./5.03.txt)

###### Exercise 5.04

**Rancher vs Anthos vs OpenShift**

I choose Anthos.

* It allows to manage all my infrastructure including Google Cloud resources and on-prem resources (yes, I have two
  servers inside).
* I don't want to deal with RedHat ecosystem because right now almost everything in my company is in Google ecosystem.
* Google Cloud Marketplace provides a lot of production-ready solutions that are suitable for me.
* Anthos has "Migrate for Anthos and GKE" tool to move smoothly.

Actually this is very hard exercise. Good choice always depends on requirements and how chosen tool fit to them. So in
real life I'd start with description of what infrastructure we have and what we want to do with it and how to manage it.

###### Exercise 5.06

NB! I mentioned just three products (marked two on the picture, this is a mistake) as indirect usage because either I
know what I'm using (and what is this product dependent on) or I don't know this at all because "indirect usage" is
located under the hood very deeply and at the moment I'm not really interested how it works in background.

* What I used during the course
    * Kubernetes - as base system for this course
    * k3s - as lightweight Kubernetes distribution
    * PostgreSQL - as a database for applications
    * Nats - as a messenger in Part 4
    * Argo - as Kubernetes controller to try Canary releases in Part 4
    * Flux - as a tool to try GitOps approach in CI/CD management
    * Helm - as a package manager for Kubernetes used in Part 2-4
    * GKE - as a platform to host and manage Kubernetes cluster
    * Google Cloud - as a platform to manage Google Cloud resources
    * Prometheus - as monitoring system in Part 2-4
    * Grafana - as analytics visualizer in Part 2-4
    * GitHub Actions - as build and CI/CD process
    * Linkerd - as service mesh in Part 5
    * Google Persistent Disk - as a persisent storage in Part 3
    * Google Container Registry - as a container registry in Part 3
* What I used indirectly
    * Gradle - to build Java application I think
    * Istio - as service mesh
    * Werf - as part of CI/CD process
* What I used outside the course
    * MariaDB - as database
    * MongoDB - as database
    * MySQL - as database
    * Percona - as database
    * Redis - as queue
    * RabbitMQ - as messenger
    * TeamCity - to build application and deploy it to production environment
    * GitLab - for CI/CD process
    * Jenkins - for CI/CD process
    * AWS - as platform for hosted Kubernetes
    * Heroku - as platform for hosting application
    * Google Stackdriver - as log collector. I think this is already deprecated.
    * New Relic - for error collecting and APM
    * Sentry - for error collecting and APM
    * Datadog - as data collector and visualizer
    * Logstash - as log collector
    * Nginx - as proxy server
    * Terraform - to manage Google Cloud infrastructure
    * Whitesource - to manage dependencies in GitHub

![](./landscape.png "Nice picture of products and services")
