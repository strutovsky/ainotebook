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

- [GET /notebooks](#get-notebooks)
- [POST /notebook](#post-notebook)
- [GET /notebook/id](#get-notebookid)
- [POST /notebook/id/page](#post-notebookidpage)
- [GET /notebook/id/page/id](#get-notebookidpageid)

### GET /notebooks
Gets all user notebooks with pages title.

**Response example:**
```json5
[
        {
        "id": "601029a1sfdsgj90a7a0d1d2143",
        "name":  "NotebookName",
        "pages": [
                   {
                    "id": "60103fdb8339e34d32a4fd6b",
                    "title": "PageTitle"
                   },

                   {
                    "id": "601040bf8339e34d32a4fd6e",
                    "title": "PageName"
                   }
             ]
        },

        {
        "id": "62342asadjf93207a0d1348dfa",
        "name": "NotebookName2",
        "pages": []
        }
]
```

### POST /notebook
Creates notebook with given name.

**Request example:**
```json5
{
    "name": "Name of notebook"
}
```

**Response example:**
```json5
{
    "id": "601029a1fdc90a7a0d1d2143",
    "name": "Name of notebook"
}
```

### GET /notebook/id
Gets user notebook by its ID.

**Request example:**
```http request
http://localhost:8001/notebook/600f37cd1009d3f1136fcf6c
```

**Response example:**
```json5
{
    "id": "600f37cd1009d3f1136fcf6c",
    "name": "Notebook for testing",
    "pages": [
        {
            "id": "60103fdb8339e34d32a4fd6b",
            "date": "28.08.2000",
            "metadata": "23424",
            "title": "Test Title"
        }
    ]
}
```

### POST /notebook/id/page
Creates a page of notebook.

**Request example:**
```json5
{
    "date": "28.08.2000",
    "metadata": "23424",
    "text": "This is text for page",
    "title": "Test Title"
}
```

**Response:** 200

### GET /notebook/id/page/id
Gets a page of user notebook

**Request example:**
```http request
http://localhost:8001/notebook/60116e30b6576f31e60616f4/page/60116e52b6576f31e60616f5
```

**Response example:**
```json5
{
    "date": "28.08.2000",
    "id": "60116e52b6576f31e60616f5",
    "metadata": "23424",
    "text": "Hello",
    "title": "Test Title"
}
```