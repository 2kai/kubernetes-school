##### Part 0

```shell
docker build -t kubernetes-school .
docker run --rm -it -v /var/run/docker.sock:/var/run/docker.sock -v "$PWD"/.config/.kube:/root/.kube kubernetes-school bash
```

Then inside Docker container

```shell
HOST_IP=`ip -4 route show default | cut -d" " -f3`
k3d cluster create -a 2 --k3s-arg "--tls-san="$HOST_IP"@server:0"
sed -i 's/https:\/\/0.0.0.0/https:\/\/'"$HOST_IP"'/' /root/.kube/config
kubectl cluster-info
```

##### Part 1

###### Exercise 1.01

```shell
kubectl create deployment hashgenerator-deployment --image=2kai/k8s-school-1.01
```
