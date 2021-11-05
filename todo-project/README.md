##### How to start

###### GitHub Actions

Application is built and pushed to Docker Hub automatically by GitHub Actions. Trigger is any change in this folder (/1.02/**)

###### Manual

```shell
docker build -t 2kai/k8s-school-todo-project .
docker push 2kai/k8s-school-todo-project
docker run -p 80:3000 2kai/k8s-school-todo-project
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
