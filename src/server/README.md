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

Method | Endpoint | Description
---|---|---
GET | /notebooks | [Get all notebooks](#get-all-notebooks)
POST | /notebook | [Create a notebook](#create-a-notebook)
GET | /notebook | [Get a notebook](#get-a-notebook)
DELETE | /notebook | [Delete a notebook](#delete-a-notebook)
PUT | /notebook | [Update notebook name](#update-notebook-name)
POST | /page | [Create a page](#create-a-page)
GET | /page | [Get a page](#get-a-page)
DELETE | /page | [Delete a page](#delete-a-page)
PUT | /page | [Update a page](#update-a-page)
POST | /signup | [Sign up](#sign-up)
POST | /signout | [Sign out](#sign-out)
POST | /login | [Login](#login)

---

## Detailed about routes

### Get all notebooks

**GET /notebooks** - Returns all available user's notebooks.

**Output Example:**
```json5
[
    {
        "id": "6067d2e386d8b93c0cb9a368",
        "name": "asd",
        "pages": [
            {
                "body": "",
                "create_at": "Sat, 03 Apr 2021 05:28:51 GMT",
                "id": "6067d2e386d8b93c0cb9a369",
                "metadata": "",
                "title": "New page"
            }
        ]
    },
    {
        "id": "6067d2ea86d8b93c0cb9a36a",
        "name": "312s",
        "pages": [
            {
                "body": "",
                "create_at": "Sat, 03 Apr 2021 05:28:58 GMT",
                "id": "6067d2ea86d8b93c0cb9a36b",
                "metadata": "",
                "title": "New page"
            }
        ]
    }
]
```

---

### Create a notebook

**POST /notebook** - Create a notebook for user. Also creates empty page.

**Input Query Params:**
* name - notebook's name

**Input Example:**
```
http://localhost:5000/notebook?name=TestNotebook
```

**Output Example:**
```json5
{
    "id": "6067d50a86d8b93c0cb9a36c",
    "name": "TestNotebook",
    "pages": [
        {
            "body": "",
            "create_at": "Sat, 03 Apr 2021 05:38:02 GMT",
            "id": "6067d50a86d8b93c0cb9a36d",
            "metadata": "",
            "title": "New page"
        }
    ]
}
```

---

### Get a notebook

**GET /notebook** - Returns a notebook with given ID

**Input Query Params:**
* nid - notebook's id

**Input Example:**
```
http://localhost:5000/notebook?nid=6067d2e386d8b93c0cb9a368
```

**Handling errors**
* When no notebook with such ID raises **404** response

**Output Example:**
```json5
{
    "id": "6067d2e386d8b93c0cb9a368",
    "name": "asd",
    "pages": [
        {
            "body": "",
            "create_at": "Sat, 03 Apr 2021 05:28:51 GMT",
            "id": "6067d2e386d8b93c0cb9a369",
            "metadata": "",
            "title": "New page"
        }
    ]
}
```

---

### Delete a notebook

**DELETE /notebook** - Deletes a notebook with given ID

**Input Query Params:**
* nid - notebook's id

**Input Example:**
```
http://localhost:5000/notebook?nid=6067d2e386d8b93c0cb9a368
```

**Handling errors**
* When no notebook with such ID raises **404** response

**Output Example:** 200

---

### Update notebook name

**PUT /notebook** - Updates notebook's name

**Input Query Params:**
* nid - notebook's id
* name - new name to which you want to change

**Input Example:**
```
http://localhost:5000/notebook?nid=6067d2ea86d8b93c0cb9a36a&name=NewName
```

**Handling errors**
* When no notebook with such ID raises **404** response

**Output Example:** 200

---

### Create a page

**POST /page** - Creates page of user's notebook

**Input JSON Params Example:**
```json5
{
    "nid": "6067d2ea86d8b93c0cb9a36a",
    "title": "New page of notebook",
    "body": "This is body of notebook",
    "metadata": ""
}
```

**Handling errors**
* When no notebook with such ID raises **404** response

**Output Example:** 200

---

### Get a page

**GET /page** - Returns page of notebook

**Input Query Params:**
* nid - notebook's id
* pid - page's id

**Input Example:**
```
http://localhost:5000/page?nid=6067d2ea86d8b93c0cb9a36a&pid=6067d50a86d8b93c0cb9a36d
```

**Handling errors**
* When no notebook with such ID raises **404** response
* When no page with such ID raises **404** response

**Output Example:**
```json5
{
    "body": "",
    "create_at": "Sat, 03 Apr 2021 05:38:02 GMT",
    "id": "6067d50a86d8b93c0cb9a36d",
    "metadata": "",
    "title": "New page"
}
```

---

### Delete a page

**DELETE /page** - Deletes page of notebook

**Input Query Params:**
* nid - notebook's id
* pid - page's id

**Input Example:**
```
http://localhost:5000/page?nid=6067d2ea86d8b93c0cb9a36a&pid=6067d50a86d8b93c0cb9a36d
```

**Handling errors**
* When no notebook with such ID raises **404** response
* When no page with such ID raises **404** response

**Output Example:** 200

---

### Update a page

**PUT /page** - Updates page of notebook

**Input JSON Params Example:**
```json5
{
    "nid": "6067d2ea86d8b93c0cb9a36a",
    "pid": "6067dab463cdb8ff5729d625",
    "body": "New body",
    "metadata": "",
    "title": "Updated title"
}
```

**Handling errors**
* When no notebook with such ID raises **404** response
* When no page with such ID raises **404** response

**Output Example:** 200

---

### Sign up

**POST /signup** - Sign up in account

**Input Form-Data:**
* name
* email
* password

**Outputs:**
* 409 - if user is already registered
* 500 - if something went wrong (with database, but shouldn't raises)
* 200 - if user was successfully registered
---

### Sign out

**POST /signout** - Sign out of account

**NOTE: NOW AFTER SIGNING OUT, IT IS REDIRECTING TO "/" PAGE**

---

### Login

**POST /login** - Log in account

**Input Form-Data:**
* email
* password

**Outputs:**
* 401 - if user entered wrong password
* 409 - if user is not registered
* 200 - if user was successfully logged in
