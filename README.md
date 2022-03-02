# Webshop Starter
## Getting Started

Use docker compose to startup all containers. 

```bash
docker-compose up -d
```

This command will bring the following services up:
- mongoDB on localhost:27017
- DB-Admin on localhost:8081 (This service is only for debugging purpose)
- Shop API on localhost:3000
- Shop Frontend on localhost:80
- TODO: Shop Admin deploy
