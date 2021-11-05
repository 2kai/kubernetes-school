###### GitHub Actions
Application is built and pushed to Docker Hub automatically by GitHub Actions. Trigger is any change in this folder (/1.01/**)

###### Manual
```shell
docker build -t 2kai/k8s-school-1.01 .
docker push 2kai/k8s-school-1.01
docker run 2kai/k8s-school-1.01
```
