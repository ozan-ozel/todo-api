## Todo Api Service using Nestjs, Typeorm & Postgresql

### Local Setup (using npm)

```sh
docker-compose down                                   # docker-compose down (Shutdown postgres)
docker-compose up                                     # docker-compose up (Run postgres)
npm run typeorm:run-migrations                        # Apply migrations to db
npm run start:dev                                     # Start the project
```

### Local Setup (using docker)

- Please make sure that db is running locally on the correct port.
- Before running the commands below, create an .env file using the .env.development.

```sh
docker-compose up                                     # docker-compose up (Run postgres)
docker build -t todo-api .                            # Build Docker image
docker run --env-file .env -p 3000:3000 todo-api      # Run docker image after building
```

### Documentation

```sh
SWAGGER DOCUMENTATION: http://localhost:3000/api
```
