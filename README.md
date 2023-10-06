# ProPsycho Second Edition

## Development

### Prerequisites

1. MongoDB installed

 Installation instructions: Please follow the [official](https://www.mongodb.com/docs/manual/installation/) documentation of MongoDB

2. Redis installed

 Installation instructions: Please follow the [official](https://redis.io/docs/getting-started/installation/) documentation of Redis

3. Node installed

 Installation instructions: Please follow the [official](https://nodejs.org/en/download) documentation of Node

### Installation

1. Git clone the repository

```bash
git clone https://github.com/hairbui76/pro-psycho-v2
```

2. Install dependencies

```bash
npm i
```

3. Rename `.env.example` to `.env` or create a new environment file based on your configuration

4. Run development server and client

```bash
npm run dev
```

## Docker

### Prerequisites

Docker installed, follow the [official](https://docs.docker.com/engine/install/) documentation of Docker

### Deploy on your own machine

#### Server

Build the image and run the container with Docker compose

```bash
docker-compose up --build
```

#### Client

1. Bundle the application

```bash
cd client
npm run build
```

2. Build the image with Docker

```bash
cd client
docker build . -t propsycho_client -f Dockerfile-nginx
```

3. Run the container with Docker

```bash
docker run -p 3000:80 propsycho_client
```
