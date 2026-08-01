#!/bin/sh

#simple docker dev server script for local development
docker run --rm -it -v $(pwd):/app -w /app -p 3000:3000 node:26-alpine sh -c "npm install && npm run dev"
