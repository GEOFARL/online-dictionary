#!/bin/bash

echo 'run application_start.sh: ' >>/home/ubuntu/online-dictionary/deploy.log
echo 'pm2 restart "Online dictionary"' >>/home/ubuntu/online-dictionary/deploy.log
pm2 restart "Online dictionary" >>/home/ubuntu/online-dictionary/deploy.log
