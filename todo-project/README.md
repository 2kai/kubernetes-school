##### How to start

###### GitHub Actions

Application is built and pushed to Docker Hub automatically by GitHub Actions. Trigger is any change in this folder (/todo-project/**)

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
kubectl port-forward deployment/todo-project-deployment  --address 0.0.0.0 3005:3000
```

Now you can open http://localhost:8001/ at the browser and get "Kiitti".

###### Exercise 1.06

```shell
kubectl apply -f todo-project/manifests/nodeport-nodeport-service.yaml
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
