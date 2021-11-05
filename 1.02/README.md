###### GitHub Actions
Application is built and pushed to Docker Hub automatically by GitHub Actions. Trigger is any change in this folder (/1.02/**)

###### Manual
```shell
docker build -t 2kai/k8s-school-1.02 .
docker push 2kai/k8s-school-1.02
docker run -p 80:3000 2kai/k8s-school-1.02
```
