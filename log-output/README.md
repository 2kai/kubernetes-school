##### How to start

###### GitHub Actions

Application is built and pushed to Docker Hub automatically by GitHub Actions. Trigger is any change in this folder (/log-output/**)

###### Manual

```shell
docker build -t 2kai/k8s-school-log-output-1-07 --target=e107 .
docker build -t 2kai/k8s-school-log-output-writer --target=writer .
docker build -t 2kai/k8s-school-log-output-reader --target=reader .
docker push 2kai/k8s-school-log-output-1-07
docker push 2kai/k8s-school-log-output-writer
docker push 2kai/k8s-school-log-output-reader
docker run -p 80:8090 2kai/k8s-school-log-output-1-07
docker run 2kai/k8s-school-log-output-writer
docker run -p 81:8090 2kai/k8s-school-log-output-reader
```

##### Part 1

###### Exercise 1.07

```shell
kubectl apply -f log-output/manifests/1.07
```

Now you can open http://localhost:8081/1.07 at the browser and get "Kiitti", current timestamp and random string.
