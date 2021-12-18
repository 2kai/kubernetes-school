##### How to start

###### GitHub Actions

Application is built and pushed to Docker Hub automatically by GitHub Actions. Trigger is any change in this folder (/dummy-site/**)

###### Manual

```shell
docker build -t 2kai/k8s-school-dummy-site app
docker push 2kai/k8s-school-dummy-site
docker build -t 2kai/k8s-school-dummy-site-controller controller
docker push 2kai/k8s-school-dummy-site-controller
```

##### Part 5

###### Exercise 5.01

```shell
kubectl apply -f dummy-site/manifests
```

Now you can open http://localhost:8081/dummy/wikipedia at the browser and get main Wikipedia page. It is done by CRD
DummySite, so you can create any website.
