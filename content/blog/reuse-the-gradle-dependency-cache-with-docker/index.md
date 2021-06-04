---
title: "Reuse the Gradle Dependency Cache With Docker"
date: 2021-06-03T20:48:42-05:00
toc: true
---

Ever wondered where all those JAR files go?

<!--more-->

The Gradle dependency cache usually lives at `${HOME}/.gradle/`. So, to list out top-level packages, you would run:

```
ls -al ${HOME}/.gradle/caches/modules-2/files-2.1/
```

Why should you care? Well, when running a `gradle build` locally, the dependencies are only downloaded once. Then subsequent builds reuse the dependency cache.

But this is not the case in Docker... When building an image, the environment is clean and isolated. There is no dependency cache.

No worries, though. We can make one. This is best explained by comparing the Dockerfiles below.

## Sister Links

- GitHub: <https://github.com/zwbetz-gh/reuse-the-gradle-dependency-cache-with-docker>

## Regular Build

Filename: `Dockerfile-app`

```
FROM gradle:7.0.2-jdk11-hotspot
WORKDIR /app
COPY ./ ./
RUN gradle clean build --no-daemon
CMD java -jar build/libs/*.jar
```

When building, the dependencies are downloaded each time 😢.

```
docker build --no-cache -f Dockerfile-app -t app .
```

## Build With Dependency Cache

Filename: `Dockerfile-dependency-cache`

```
FROM gradle:7.0.2-jdk11-hotspot as builder
WORKDIR /app
COPY ./ ./
RUN gradle clean build --no-daemon

FROM gradle:7.0.2-jdk11-hotspot
COPY --from=builder /root/.gradle /root/.gradle
```

Build the dependency cache. Use a [multi-stage build](https://docs.docker.com/develop/develop-images/multistage-build/), so that none of the app-generated files are copied. We just care about the dependency cache.

```
docker build --no-cache -f Dockerfile-dependency-cache -t dependency-cache .
```

Filename: `Dockerfile-app-cached`

```
FROM dependency-cache:latest
WORKDIR /app
COPY ./ ./
RUN gradle clean build --no-daemon
CMD java -jar build/libs/*.jar
```

Now when building, the dependency download is skipped, and the dependency cache is used 🤗.

```
docker build --no-cache -f Dockerfile-app-cached -t app-cached .
```

## Stats

This will vary depending on your network speed.

In my samples, the regular build took about 34 sec. The dependency cached build took about 11 sec. That's a 23 sec diff, and a 67% time savings.

This may not sound like much, but if your stack has multiple Gradle repos, this adds up. It also works well for CI/CD pipelines. Everyone likes faster builds.

## Related

- [Why Is My Gradle Build in Docker So Slow?]({{< relref "why-is-my-gradle-build-in-docker-so-slow" >}})
