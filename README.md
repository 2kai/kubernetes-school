##### Part 0

```shell
docker build -t kubernetes-school .
docker run --rm -it -p 8001:3005 -v /var/run/docker.sock:/var/run/docker.sock -v "$PWD":/opt -v "$PWD"/.config/.kube:/root/.kube kubernetes-school bash
```

Then inside Docker container

```shell
HOST_IP=`ip -4 route show default | cut -d" " -f3`
k3d cluster create --port 8082:30080@agent:0 --port 8081:80@loadbalancer -a 2 --k3s-arg "--tls-san="$HOST_IP"@server:0"
docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube
sed -i 's/https:\/\/0.0.0.0/https:\/\/'"$HOST_IP"'/' /root/.kube/config
kubectl cluster-info
k9s
```

##### Part 1

1.01, 1.03 - hash-generator  
1.02, 1.04, 1.05, 1.06, 1.08, 1.12, 1.13 - todo-project  
1.07, 1.10, 1.11 - log-output  
1.09 - ping-pong

##### Part 2

2.01, 2.03, 2.06 - log-output  
2.02, 2.04, 2.08 - todo-project  
2.07 - ping-pong
