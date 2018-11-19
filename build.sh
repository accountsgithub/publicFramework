#!/bin/bash
echo -e "\e[1;32m step3: build docker image ......"
echo -e "\e[0m"

IMAGE_NAME="public-framework/public-framework-front:v0.0.1"

docker build -t $IMAGE_NAME .

if [ $? -ne 0 ]; then
  echo -e "\e[1;31m build docker is unsuccessful."
  echo -e "\e[0m"
  exit;
else
    echo -e "\e[1;32m SUMMARY: build docker is successful, image name: $IMAGE_NAME"
    echo -e "\e[0m"
fi
