# Spiritus Webapp

This repository contains source code, Github workflows and docker files required to run the application both locally and in various environments.

## Local development
First, intall all dependencies for the development server:
```bash
npm install
```

Run dev server:
```bash
npm run dev
```

If you have issues setting up tailwindcss, check this page:
- https://tailwindcss.com/docs/guides/nextjs

To build an optimized version of the app run the following:

```bash
npm run build && npm run start
```

This should build the app and start it on defualt port (3000).

## Local deployment using Docker
To deploy the app on your local machine using docker you should do the following steps:
```bash
docker build -t test-app .
docker run -p 3000:3000 --env-file .env.local test-app
```

Please note that the env file must be provided, otherwise the app will not function properly.

## Local deloyment using docker compose
The app will be available on `localhost:8080`.

Build the app (to confirm build is passing):
```bash
docker compose -f ./docker-compose.local.yml build
```

Start the app:
```bash
docker compose -f ./docker-compose.local.yml up
```

`CTRL+C` will stop the app container.

You can start the service in detached mode (allows you to continue using the terminal):
```bash
docker compose -f ./docker-compose.local.yml up -d
```

Stop the app
```bash
docker compose -f ./docker-compose.local.yml stop
```

Teardown the app:
```bash
docker compose -f ./docker-compose.local.yml down
```

This will remove all associated containers and volumes.
