##### Part 0

```shell
docker build -t kubernetes-school .
docker run --rm -it -p 8001:3005 -v /var/run/docker.sock:/var/run/docker.sock -v "$PWD":/opt -v "$PWD"/.config/.kube:/root/.kube kubernetes-school bash
```

Then inside Docker container

```shell
HOST_IP=`ip -4 route show default | cut -d" " -f3`
k3d cluster create -a 2 --k3s-arg "--tls-san="$HOST_IP"@server:0"
sed -i 's/https:\/\/0.0.0.0/https:\/\/'"$HOST_IP"'/' /root/.kube/config
kubectl cluster-info
```
