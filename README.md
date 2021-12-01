##### Part 0

```shell
docker build -t kubernetes-school .
docker run --rm -it -p 8001:3005 -v /var/run/docker.sock:/var/run/docker.sock -v "$PWD":/opt -v "$PWD"/.config/.config:/root/.config/gcloud -v "$PWD"/.config/.kube:/root/.kube kubernetes-school bash
```

Then inside Docker container

```shell
HOST_IP=`ip -4 route show default | cut -d" " -f3`
k3d cluster create --port 8082:30080@agent:0 --port 8081:80@loadbalancer -a 2 --k3s-arg "--tls-san="$HOST_IP"@server:0"
docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube
sed -i 's/https:\/\/0.0.0.0/https:\/\/'"$HOST_IP"'/' /root/.kube/config
kubectl cluster-info
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add stable https://charts.helm.sh/stable
kubectl create namespace prometheus
helm install prometheus-community/kube-prometheus-stack --generate-name --namespace prometheus \
  --set grafana.ingress.enabled=true \
  --set grafana.ingress.path=/grafana \
  --set grafana.'grafana\.ini'.server.root_url=http://0.0.0.0:3000/grafana \
  --set grafana.'grafana\.ini'.server.serve_from_sub_path=true
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
kubectl create namespace loki-stack
helm upgrade --install loki --namespace=loki-stack grafana/loki-stack
k9s
```

##### Part 1

1.01, 1.03 - hash-generator  
1.02, 1.04, 1.05, 1.06, 1.08, 1.12, 1.13 - todo-project  
1.07, 1.10, 1.11 - log-output  
1.09 - ping-pong

##### Part 2

2.01, 2.03, 2.06 - log-output  
2.02, 2.04, 2.08, 2.09, 2.10 - todo-project  
2.07 - ping-pong

###### Part 3

```shell
gcloud auth login
gcloud config set project devops-with-kubernetes-291121
gcloud services enable container.googleapis.com
gcloud container clusters create dwk-cluster --zone=europe-north1-b --release-channel=rapid --cluster-version=1.22
# Do something
gcloud container clusters delete dwk-cluster --zone=europe-north1-b
```

3.01, 3.02 - ping-pong
3.03 - todo-project  
