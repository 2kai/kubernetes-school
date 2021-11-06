##### How to start

###### GitHub Actions

Application is built and pushed to Docker Hub automatically by GitHub Actions. Trigger is any change in this folder (/log-output/**)

###### Manual

```shell
docker build -t 2kai/k8s-school-log-output .
docker push 2kai/k8s-school-log-output
docker run -p 80:8090 2kai/k8s-school-log-output
```

##### Part 1

###### Exercise 1.07

```shell
kubectl apply -f log-output/manifests/
```

Now you can open http://localhost:8081/ at the browser and get "Kiitti", current timestamp and random string.
