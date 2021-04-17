# AiNotebook app
AiNotebook is an app designed for note taking. 

## Build and run 

In [this README](bin/README.md) is written information how to build and run AiNotebook app manually.
Or you can run via autoscript (includes 3 replicas for backend):

```bash
:~/ainotebook$ sudo chmod +x run.sh
:~/ainotebook$ sudo chmod +x stop.sh
:~/ainotebook$ ./run.sh
:~/ainotebook$ ./stop.sh
```

## Folder structure
```
ainotebook
├── bin                 
│   ├── docker-compose-deployment
│   └── README.md
├── data
│   └── mongo-volume
├── src
│   ├── server
│   ├── storage
│   └── ui
├── .gitignore
└── README.md
```
**bin** - the folder with deployment scripts and executable file <br>
**data** - the folder with the volumes of databases <br>
**src** - the folder with source files of the microservices
