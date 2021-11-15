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

Now you can open http://localhost:8081/log-output/1.07 at the browser and get "Kiitti", current timestamp and random
string.

###### Exercise 1.10

```shell
kubectl apply -f log-output/manifests/log-output
```

Now you can open http://localhost:8081/log-output at the browser and get "Kiitti", current timestamp (from the file) and
random string.

###### Exercise 1.11

```shell
kubectl apply -f common/manifests
kubectl apply -f log-output/manifests/log-output
kubectl apply -f ping-pong/manifests
```

Now you can open http://localhost:8081/log-output at the browser and get "Kiitti", current timestamp (from the file) and
random string. On the next line you can see number of ping-pongs from "Ping-pong" application. Number is saved in
persistent storage.

##### Part 2

###### Exercise 2.01

```shell
kubectl apply -f log-output/manifests/log-output
kubectl apply -f ping-pong/manifests
```

From now http://localhost:8081/pingpong/increase-and-get increases number of pings by one and return the
value. http://localhost:8081/pingpong just return current values of pings. And you can
open http://localhost:8081/log-output at the browser and get "Kiitti", current timestamp (from the file) and random
string. On the next line you can see number of ping-pongs from "Ping-pong" application. Number is got by HTTP request
from "Ping-pong" application.
