##### How to start

###### GitHub Actions

Application is built and pushed to Docker Hub automatically by GitHub Actions. Trigger is any change in this folder (/ping-pong/**)

###### Encryption/decryption

Copy PGP private key into container

```shell
gpg --export-secret-keys kai@list.ru > private.key
```

Then inside container run following commands

```shell
# To encrypt
sops --encrypt --in-place --encrypted-regex '^(data)$' --pgp 4AC71DA9F8AE00CFF2BEBBAA640615841665E668 ping-pong/manifests/postgres-secret.yaml
# To decrypt
gpg --import private.key
GPG_TTY=`tty` sops --decrypt --in-place ping-pong/manifests/postgres-secret.yaml
```

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

##### Part 2

###### Exercise 2.07

```shell
kubectl apply -f ping-pong/manifests/
```

http://localhost:8081/pingpong still shows number of pings and http://localhost:8081/pingpong/increase-and-get increases
it. But now number is stored in PostgreSQL database.

##### Part 3

###### Exercise 3.01

```shell
kubectl apply -f common/manifests/namespace.yaml
kubectl apply -f ping-pong/manifests/
```

Now the application is deployed to Google Cloud and can be opened at http://<EXTERNAL_IP>.

###### Exercise 3.02

```shell
kubectl apply -f common/manifests/namespace.yaml
kubectl apply -f ping-pong/manifests/
kubectl apply -f log-output/manifests/log-output/
```

Now the applications are deployed to Google Cloud, use ingresses and can be opened at http://<EXTERNAL_IP>/pingpong and
http://<EXTERNAL_IP>/log-output

###### Exercise 3.09

```shell
kubectl apply -f ping-pong/manifests/
kubectl apply -f log-output/manifests/log-output/
```

Visually nothing was changed in this exercise. Added requests and limits for resources.

###### Exercise 4.01

```shell
kubectl apply -f ping-pong/manifests/
kubectl apply -f log-output/manifests/log-output/
```

Visually nothing was changed in this exercise. Added readinessProbe.
