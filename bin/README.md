# AiNotebook deploying

## Using docker-compose

There is four services into docker-compose:

service | IP | desc
---|---|---
mongo | 172.20.0.2:8000 | uses volume */data/mongo-volume*
ui | 172.20.0.4:8080 | -
server | 172.20.0.3:8001 | - 
nginx-proxy | none | -


Run ainotebook services via docker-compose:
```bash
cd docker-compose-deployment
docker-compose up --build
```