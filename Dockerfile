# syntax=docker/dockerfile:1

# --- Build stage ---
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies (cached unless package files change)
COPY package*.json ./
RUN npm ci

# Build the static site
COPY . .
RUN npm run build

# --- Serve stage ---
FROM nginx:alpine AS serve

# SPA fallback: serve index.html for any unmatched route so client-side
# routing works on direct visits and page refreshes.
RUN printf 'server {\n\
    listen 80;\n\
    server_name _;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
