##### How to start

###### GitHub Actions

Application is built and pushed to Docker Hub automatically by GitHub Actions. Trigger is any change in this folder (/hash-generator/**)

###### Manual

```shell
docker build -t 2kai/k8s-school-hash-generator .
docker push 2kai/k8s-school-hash-generator
docker run 2kai/k8s-school-hash-generator
```

##### Part 1

###### Exercise 1.01

```shell
kubectl create deployment hash-generator-deployment --image=2kai/k8s-school-hash-generator
```

###### Exercise 1.03

```shell
kubectl delete deployment hash-generator-deployment
kubectl apply -f hash-generator/manifests/deployment.yaml
```
