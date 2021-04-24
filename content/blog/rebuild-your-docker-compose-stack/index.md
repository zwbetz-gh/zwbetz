---
title: "Rebuild Your Docker Compose Stack"
date: 2020-10-06T21:17:47-05:00
toc: false
---

When using volumes with Docker Compose, especially with NodeJS projects, sometimes vague errors show up, like file permission errors for reading or writing a file. When this happens, it can be helpful to rebuild your Docker Compose stack from scratch to resolve these errors.

1. Down everything, which stops and removes containers, and removes volumes

        docker-compose down -v

1. List all volumes to confirm they're removed

        docker volume ls

1. If volumes still exist, remove them one-by-one

        docker volume rm <VOLUME_NAME>

1. Build and up everything in detached mode

        docker-compose up -d --build
