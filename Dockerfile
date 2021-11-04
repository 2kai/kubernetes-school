FROM debian:11.1-slim

MAINTAINER "Sasha Klepikov <kai@list.ru>"

RUN apt-get update \
    && apt-get --yes upgrade \
    && apt-get install --yes --no-install-recommends apt-utils lsb-release software-properties-common apt-transport-https ca-certificates curl gnupg2 iproute2

# Docker
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - \
    && add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable" \
    && apt-get update \
    && apt-get --yes --no-install-recommends install docker-ce docker-ce-cli containerd.io

# kubectl
RUN curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | tee /etc/apt/sources.list.d/kubernetes.list \
    && apt-get update \
    && apt-get install --yes --no-install-recommends kubectl

# k3d
RUN curl -s https://raw.githubusercontent.com/rancher/k3d/main/install.sh | bash
