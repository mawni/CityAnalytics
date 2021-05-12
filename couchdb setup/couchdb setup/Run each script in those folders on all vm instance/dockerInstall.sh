#!/bin/bash

# This file is for installing docker


# install the docker, I will set the docker version be
sudo apt-get update


sudo yes Y | apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release



curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg


echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null


sudo yes Y | apt-get install docker-ce=5:20.10.5~3-0~ubuntu-focal docker-ce-cli=5:20.10.5~3-0~ubuntu-focal containerd.io # note I set the engine version to be 5:20.10.5~3-0~ubuntu-focal


sudo docker run hello-world # check if install successful
