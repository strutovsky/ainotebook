# AiNotebook deploying

## Using docker-compose

There is four services into docker-compose:

service | IP | desc
---|---|---
mongo | mongo:27017 | uses volume */data/mongo-volume*
ui | localhost | -
backend | backend:5000 | For production
backend | localhost/api | For development [(requires authentication)](bin/docker-compose-deployment/ainotebook-proxy/README.md)
backend signup | localhost/signup | Sign up
backend signout | localhost/signout | Sign out
backend login | localhost/login | Login


Run ainotebook services via docker-compose:
```bash
cd docker-compose-deployment
docker-compose up --build
```

Run with scaling:
```bash
cd docker-compose-deployment
docker-compose up --scaling backend=3
```