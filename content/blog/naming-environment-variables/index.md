---
title: "Naming Environment Variables"
date: 2021-01-24T20:33:13-06:00
toc: false
show_comments: false
---

I often go back-and-forth on what to name env vars. Should I put an underscore here? Should I combine these words into one?

While reading [spring's docs](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-external-config-relaxed-binding-from-environment-variables), I came across a concise set of rules for just that. Now, the rules are specific to spring configuration. But I like them as general rules too. 

Anddd, I quote:

> Most operating systems impose strict rules around the names that can be used for environment variables. For example, Linux shell variables can contain only letters (`a` to `z` or `A` to `Z`), numbers (`0` to `9`) or the underscore character (`_`). By convention, Unix shell variables will also have their names in UPPERCASE.
>
> Spring Boot’s relaxed binding rules are, as much as possible, designed to be compatible with these naming restrictions.
>
> To convert a property name in the canonical-form to an environment variable name you can follow these rules:
> - Replace dots (`.`) with underscores (`_`).
> - Remove any dashes (`-`).
> - Convert to uppercase.
>
> For example, the configuration property `spring.main.log-startup-info` would be an environment variable named `SPRING_MAIN_LOGSTARTUPINFO`.
>
> Environment variables can also be used when binding to object lists. To bind to a `List`, the element number should be surrounded with underscores in the variable name.
>
> For example, the configuration property `my.acme[0].other` would use an environment variable named `MY_ACME_0_OTHER`.
