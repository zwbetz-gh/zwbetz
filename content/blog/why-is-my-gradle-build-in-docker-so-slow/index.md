---
title: "Why is my gradle build in docker so slow?"
date: 2020-02-26T00:00:00-05:00
toc: false
show_comments: false
---

_Why is my gradle build in docker so slow?_ I've asked myself this question often recently. Building _outside_ of docker is quick, so what gives?

Docker caches each of its steps in a layer. So if a given step hasn't changed, it's cached, and should make the image build quickly. So why wasn't this happening for gradle builds? 

In the original `Dockerfile`, when the gradle build was run, it would re-download **all dependencies** each time. This was the cause of the slowness. The solution was to cache the downloaded dependencies. Unfortunately, gradle doesn't have a built-in task to only download dependencies, but I worked around this. 

Now the dependencies are only downloaded if dependency-related files are changed. Otherwise, the dependency cache is used, and only the source code is built.

## Before

```
FROM gradle:6.2.1-jdk11

RUN gradle --version && java -version 

WORKDIR /app

COPY ./ /app/

RUN gradle clean build --no-daemon

CMD java -jar build/libs/*.jar
```

## After

```
FROM gradle:6.2.1-jdk11

RUN gradle --version && java -version 

WORKDIR /app

# Only copy dependency-related files
COPY build.gradle gradle.properties settings.gradle /app/

# Only download dependencies
# Eat the expected build failure since no source code has been copied yet
RUN gradle clean build --no-daemon > /dev/null 2>&1 || true

# Copy all files
COPY ./ /app/

# Do the actual build
RUN gradle clean build --no-daemon

CMD java -jar build/libs/*.jar
```

## Bonus

At least the following items should be included in your `.dockerignore` file, so that they're not unnecessarily sent to the docker build context.

```
.gradle/
bin/
build/
gradle/
```
