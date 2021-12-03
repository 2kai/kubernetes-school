##### How to start

###### GitHub Actions

Application is built and pushed to Docker Hub and to Google Cloud Registry automatically by GitHub Actions. Trigger is
any change in this folder (/todo-project/**)

###### Encryption/decryption using PGP

Copy PGP private key into container

```shell
gpg --export-secret-keys kai@list.ru > private.key
```

Then inside container run following commands

```shell
# To encrypt
sops --encrypt --in-place --encrypted-regex '^(data)$' --pgp 4AC71DA9F8AE00CFF2BEBBAA640615841665E668 todo-project/manifests/postgres-secret.yaml
# To decrypt
gpg --import private.key
GPG_TTY=`tty` sops --decrypt --in-place todo-project/manifests/postgres-secret.yaml
```

###### Encryption/decryption using Google Cloud KMS

```shell
gcloud auth login
gcloud auth application-default login
# To encrypt
gcloud kms keyrings create sops --location global
gcloud kms keys create sops-key --location global --keyring sops --purpose encryption
gcloud kms keys list --location global --keyring sops
sops --encrypt --in-place --encrypted-regex '^(data)$' --gcp-kms projects/devops-with-kubernetes-291121/locations/global/keyRings/sops/cryptoKeys/sops-key todo-project/manifests/postgres-secret.yaml
# To decrypt
sops --decrypt --in-place todo-project/manifests/postgres-secret.yaml
```

###### Manual

```shell
docker build -t 2kai/k8s-school-todo-project-api api
docker push 2kai/k8s-school-todo-project-api:latest
docker run -p 8080:3000 2kai/k8s-school-todo-project-api
docker build -t 2kai/k8s-school-todo-project-frontend frontend
docker push 2kai/k8s-school-todo-project-frontend:latest
docker run -p 80:8080 2kai/k8s-school-todo-project-frontend
```

##### Part 1

###### Exercise 1.02

```shell
kubectl create deployment todo-project-deployment --image=2kai/k8s-school-todo-project
```

###### Exercise 1.04

```shell
kubectl delete deployment todo-project-deployment
kubectl apply -f todo-project/manifests/deployment.yaml
```

###### Exercise 1.05

```shell
kubectl port-forward deployment/todo-project-deployment --address 0.0.0.0 3005:3000
```

Now you can open http://localhost:8001/ at the browser and get "Kiitti".

###### Exercise 1.06

```shell
kubectl apply -f todo-project/manifests/nodeport-service.yaml
```

Now you can open http://localhost:8082/ at the browser and get "Kiitti".

###### Exercise 1.08

```shell
kubectl apply -f todo-project/manifests/
```

Now you can open both http://localhost:8081/ (ClusterIP service) and http://localhost:8082/ (NodePort service) at the
browser and get "Kiitti".

###### Exercise 1.12

```shell
kubectl apply -f todo-project/manifests/
```

Now you can open http://localhost:8081/daily at the browser and get daily picture.

###### Exercise 1.13

Now you can open http://localhost:8081 at the browser and get simple index page with daily picture.

##### Part 2

###### Exercise 2.02

```shell
kubectl apply -f todo-project/manifests/
```

Now you can open http://localhost:8081 at the browser and get simple index page. TODO items list is provided by TODO
api. Also, you can submit new TODO item.

###### Exercise 2.03

```shell
kubectl apply -f common/manifests
kubectl apply -f todo-project/manifests
```

Now project resources are located in separate namespace.

###### Exercise 2.08

```shell
kubectl apply -f todo-project/manifests/
kubectl -n project cp todo-project/api/structure.sql todo-project-postgres-ss-0:/structure.sql
kubectl -n project exec -it todo-project-postgres-ss-0 -- sh -c 'psql -U postgres < /structure.sql'
```

Now todos are stored in PostgreSQL database.

###### Exercise 2.09

```shell
kubectl apply -f todo-project/manifests/
```

Now todo with a link to Wikipedia will be added once a day automatically.

###### Exercise 2.10

```shell
kubectl apply -f todo-project/manifests/
```

Now you can open http://localhost:8081/grafana. Login with admin / prom-operator and play with logs and statistics from
Prometheus.

##### Part 3

###### Exercise 3.03

Decrypt todo-project/manifests/postgres-secret.yaml with PGP and encrypt it with Google Cloud KMS

```shell
kubectl apply -f common/manifests/namespace.yaml
kubectl apply -f common/manifests/persistentvolumeclaim.yaml
```

Now the project is deployed by GitHub Actions to Google Cloud and can be opened at http://<EXTERNAL_IP>

###### Exercise 3.04

Now every new branch of the project is deployed separately by GitHub Actions to Google Cloud and can be opened at
different external IPs.

###### Exercise 3.05

Now when branch is deleted then its environment is also being deleted from Google Cloud.

###### Exercise 3.08

```shell
kubectl apply -f todo-project/manifests/
```

Visually nothing was changed in this exercise. Added requests and limits for resources. 
