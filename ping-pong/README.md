##### How to start

###### GitHub Actions

Application is built and pushed to Docker Hub automatically by GitHub Actions. Trigger is any change in this folder (/ping-pong/**)

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
