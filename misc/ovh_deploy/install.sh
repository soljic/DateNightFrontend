#!/bin/bash
##########################################################
## This script will install deps on a bare instance     ##
## It can be used until we figure out something better  ##
##########################################################

## install docker engine by manually adding the repository
## Reference: https://docs.docker.com/engine/install/ubuntu/#install-from-a-package
sudo apt-get update
sudo apt install ca-certificates curl gnupg lsb-release -y
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin -y

## add current user to docker group to prevent sudo calls
## Reference: https://docs.docker.com/engine/install/linux-postinstall/
sudo groupadd docker
sudo usermod -aG docker $USER

## installs nvm and makes it ready for use
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
export NVM_DIR="$HOME/.nvm"
# This loads nvm
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
# This loads nvm bash_completion
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
# install latest node (this can break stuff)
nvm install node

## install nginx
## add certificate related deps deps
sudo apt install nginx certbot python3-certbot-nginx -y

## generate certificate
## NOTE: DNS records must already be set
## if they are not set certificate will not be issued!
sudo certbot --nginx -d demo.spiritus.app

## FOR PROD ENV
# sudo certbot --nginx -d spiritus.app

# re-evaluate nginx configs & reload
sudo nginx -t && nginx -s reload
