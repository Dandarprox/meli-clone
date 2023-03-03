# Meli clone

This is a clone of the Mercado Libre website, made with Next.js and Express.

# Components
- Server
- Client

The server is a simple Express server that serves the client.
It contains the following available endpoints:

```
- /api/v1/items?q=:query&limit=:limit
- /api/v1/items/:id
- /api/v1/items/:id/description
- /health
```

The client is a Next.js application that consumes the server endpoints.
And it contains the following pages:

```
- /  
- /items
- /items/:id
```

# How to run
## Prerequisites
- Node.js
- Pnpm
  npm install -g pnpm
## Server

```
cd server
pnpm install
pnpm build
pnpm start
```
The server will be running on localhost port 3001.

## Client

```
cd client
pnpm install
pnpm build
pnpm start
```
The client will be running on localhost port 3000.

Access http://localhost:3000 to see the application.