#!/bin/bash

nohup /app_home/bin/config_generate &

nginx -g 'daemon off;'