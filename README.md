# deno_docker_template

here is sample of deno app development environment for docker using mysql.  

# start containers

```sh
docker-compose build
docker-compose up -d

CONTAINER ID   IMAGE                     COMMAND                  CREATED       STATUS         PORTS                           NAMES
4bdcea215e8d   deno_sample_app:deno      "/tini -- docker-ent…"   2 hours ago   Up 9 minutes   0.0.0.0:8080->8080/tcp          deno_docker_template-web-1
91f5ff61aee7   steveltn/https-portal:1   "/init"                  2 hours ago   Up 2 hours     80/tcp, 0.0.0.0:3443->443/tcp   deno_docker_template-https-1
49e9626e67c6   mysql:5.7                 "docker-entrypoint.s…"   2 hours ago   Up 2 hours     3306/tcp, 33060/tcp             deno_docker_template-db-1
```

# endpoints

https://localhost:3443/exec  
see this on docker logs  
it is successful  
```
INFO connecting db:3306
INFO connected to db:3306
[ { id: 1, name: "manyuanrong", created_at: 2022-10-13T13:10:16.000Z } ] [ { id: 1, name: "manyuanrong" } ]
```