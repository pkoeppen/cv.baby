#!/bin/bash
sudo pm2 stop all
sudo rm -rf $(ls /var/www | grep -v node_modules)
sudo rm -rf /var/www/.nuxt
