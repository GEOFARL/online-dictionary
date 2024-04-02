#!/bin/bash
echo 'run after_install.sh: ' >>/home/ubuntu/online-dictionary/deploy.log

echo 'cd /home/ubuntu/online-dictionary' >>/home/ubuntu/online-dictionary/deploy.log
cd /home/ubuntu/online-dictionary >>/home/ubuntu/online-dictionary/deploy.log

echo 'sudo npm install' >>/home/ubuntu/online-dictionary/deploy.log
sudo npm install >>/home/ubuntu/online-dictionary/deploy.log

echo 'sudo npm run build' >>/home/ubuntu/online-dictionary/deploy.log
sudo npm run build >>/home/ubuntu/online-dictionary/deploy.log
