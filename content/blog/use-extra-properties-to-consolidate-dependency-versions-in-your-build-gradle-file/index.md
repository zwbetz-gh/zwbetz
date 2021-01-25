---
title: "Use Extra Properties to Consolidate Dependency Versions in Your build.gradle File"
date: 2021-01-24T20:46:03-06:00
tags: []
toc: false
show_comments: false
---

When defining dependency versions in your `build.gradle` file, if dependencies share the same version, you have to repeat it each time. 

For example:

```groovy
dependencies {
	implementation "org.springframework.boot:spring-boot-starter-actuator:2.4.2"
	implementation "org.springframework.boot:spring-boot-starter-data-jpa:2.4.2"
	implementation "org.springframework.boot:spring-boot-starter-web:2.4.2"
}
```

You can consolidate this by defining an [extra property](https://docs.gradle.org/current/userguide/writing_build_scripts.html#sec:extra_properties) (in gradle-speak). Note: double quotes are required when using groovy's [string interpolation](https://docs.groovy-lang.org/latest/html/documentation/#_string_interpolation).

For example:

```groovy
ext {
  springVersion = '2.4.2'
}

dependencies {
	implementation "org.springframework.boot:spring-boot-starter-actuator:${springVersion}"
	implementation "org.springframework.boot:spring-boot-starter-data-jpa:${springVersion}"
	implementation "org.springframework.boot:spring-boot-starter-web:${springVersion}"
}
```
