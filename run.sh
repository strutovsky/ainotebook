#!/bin/bash

cd bin/docker-compose-deployment
docker-compose up --build --scale backend=3