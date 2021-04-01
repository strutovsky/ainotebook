# AiNotebook backend microservice
This server is a main service to handle all data that comes from frontend side.

- [Folder structure](#folder-structure)
- [Local installation](#local-installation)
- [Build docker image](#build-docker-image)
- [API endpoints](#api-endpoints)

Postman collection's available [here.](https://www.getpostman.com/collections/2ff733b0bbe7df69aaf1)

## Folder structure
```
server
├── routes
│   ├── __init__.py
│   └── notebooks.py        -> routes for notebooks
├── README.md
├── Dockerfile
├── server.py                 -> flask app runs here
└── requirements.txt 
```

## Local installation
```bash
python3 -m pip install --user --upgrade pip
python3 -m pip install --user virtualenv
python3 -m venv venv
source venv/bin/activate
python -m pip install -U wheel pip setuptools 
python -m pip install -r requirements.txt
```
Start server: 
```
python server.py
```

## Build docker image
```bash
docker build -t ainotebook-server .
docker run -p 5000:5000 ainotebook-server
```

## API endpoints
There endpoints allow you to handle backend service.

Method | Endpoint | Description | Input | Output
---|---|---|---|---
GET | /notebooks | Get all notebooks | - | <p>[
    {
        "id": "6065f30e3fbc16a1a89e1665",
        "name": "",
        "pages": [
            {
                "body": "1",
                "create_at": "Thu, 01 Apr 2021 22:21:48 GMT",
                "id": "60661d4cfa9f51145e7f2972",
                "metadata": "2",
                "title": "3"
            }
        ]
    }
]</p>
POST | /notebook | Create notebook | **Query:** name - *notebook name* |



####