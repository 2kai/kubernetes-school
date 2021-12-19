##### How to start

###### GitHub Actions

Application is built and pushed to Docker Hub automatically by GitHub Actions. Trigger is any change in this folder (/ping-pong/**)

###### Encryption/decryption

Copy PGP private key into container

```shell
gpg --export-secret-keys kai@list.ru > private.key
```

Then inside container run following commands

```shell
# To encrypt
sops --encrypt --in-place --encrypted-regex '^(data)$' --pgp 4AC71DA9F8AE00CFF2BEBBAA640615841665E668 ping-pong/manifests/postgres-secret.yaml
# To decrypt
gpg --import private.key
GPG_TTY=`tty` sops --decrypt --in-place ping-pong/manifests/postgres-secret.yaml
```

###### Manual

```shell
docker build -t 2kai/k8s-school-ping-pong .
docker push 2kai/k8s-school-ping-pong
docker run 2kai/k8s-school-ping-pong
```

##### Part 1

###### Exercise 1.09

```shell
kubectl apply -f ping-pong/manifests/
```

Now you can open http://localhost:8081/pingpong at the browser and see how number is being increased after refresh.

##### Part 2

###### Exercise 2.07

```shell
kubectl apply -f ping-pong/manifests/
```

http://localhost:8081/pingpong still shows number of pings and http://localhost:8081/pingpong/increase-and-get increases
it. But now number is stored in PostgreSQL database.

##### Part 3

###### Exercise 3.01

```shell
kubectl apply -f common/manifests/namespace.yaml
kubectl apply -f ping-pong/manifests/
```

Now the application is deployed to Google Cloud and can be opened at http://<EXTERNAL_IP>.

###### Exercise 3.02

```shell
kubectl apply -f common/manifests/namespace.yaml
kubectl apply -f ping-pong/manifests/
kubectl apply -f log-output/manifests/log-output/
```

Now the applications are deployed to Google Cloud, use ingresses and can be opened at http://<EXTERNAL_IP>/pingpong and
http://<EXTERNAL_IP>/log-output

###### Exercise 3.09

```shell
kubectl apply -f ping-pong/manifests/
kubectl apply -f log-output/manifests/log-output/
```

Visually nothing was changed in this exercise. Added requests and limits for resources.

##### Part 4

###### Exercise 4.01

```shell
kubectl apply -f ping-pong/manifests/
kubectl apply -f log-output/manifests/log-output/
```

Visually nothing was changed in this exercise. Added readinessProbe.

##### Part 5

###### Exercise 5.04

```shell
k3d cluster delete
HOST_IP=`ip -4 route show default | cut -d" " -f3`
k3d cluster create --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2 --k3s-arg "--disable=traefik@server:0" --k3s-arg "--tls-san="$HOST_IP"@server:0"
sed -i 's/https:\/\/0.0.0.0/https:\/\/'"$HOST_IP"'/' /root/.kube/config
kubectl cluster-info
kubectl apply -f https://github.com/knative/serving/releases/download/knative-v1.0.0/serving-crds.yaml
kubectl apply -f https://github.com/knative/serving/releases/download/knative-v1.0.0/serving-core.yaml
kubectl apply -f https://github.com/knative/net-contour/releases/download/knative-v1.0.0/contour.yaml \
              -f https://github.com/knative/net-contour/releases/download/knative-v1.0.0/net-contour.yaml
kubectl patch configmap/config-network \
  --namespace knative-serving \
  --type merge \
  --patch '{"data":{"ingress-class":"contour.ingress.networking.knative.dev"}}'
kubectl apply -f ping-pong/manifests/knative-service.yaml
```

Now you can make cURL request and see successful response. Application is serverless and pod is being created once you
request the application.

```shell
root@2d7baeb2e116:/opt# curl -H "Host: ping-pong-serverless.default.example.com" -I http://172.17.0.1:8081
HTTP/1.1 200 OK
content-length: 4
content-type: application/json
date: Sun, 19 Dec 2021 09:47:44 GMT
server: envoy
x-envoy-upstream-service-time: 2873
```
