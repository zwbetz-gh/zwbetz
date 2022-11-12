---
title: "The Mystery of the Expired JWT"
date: 2022-11-11T22:09:26-06:00
toc: false
draft: false
---

We recently swapped out the OAuth2 service account in one of our apps. The only config change needed was the base URL for the authorization server, the `client_id`, and the `client_secret` (only for the backend service). It should have been easy: For each service, edit the relevant environment variables, then redeploy it. Of course, after doing this, we could no longer log in...

<!--more-->

This particular app was a React frontend that talked to a Spring Boot backend. Everything lived in an on-premises Kubernetes setup.

I popped open the DevTools Network tab and repeated the usual steps to login to the app. The `/authorize` request responded with a 200. The `/token` request responded with a 200 as well and it returned the JWT. Yet, the request to our backend service was responding with a 401 Unauthorized. Hmm.

So, my first area of investigation was to make sure the JWT that the frontend received from the authorization server looked normal. We were using the old OAuth2 service account in another environment, so I could log in to both environments and compare the JWTs.

I decoded both JWTs at <https://jwt.io/> and they were virtually identical. The only difference was the "expires in" time. The old service account was 20 mins, the new service account was 10 mins. This was known and expected.

Okay, the JWT is fine, so time to investigate the server logs where the 401 was being returned.

Nothing stood out at first. I turned the logging level up to trace with `LOGGING_LEVEL_ORG_SPRINGFRAMEWORK=TRACE` and restarted the pod. Now, I was up to my neck in logs. After a bit of keyword-searching-foo, I finally found a meaningful error message:

> org.springframework.security.oauth2.server.resource.InvalidBearerTokenException: An error occurred while attempting to decode the Jwt: Jwt expired at ...

Expired? What?! I _just_ logged in. I should have about 10 mins of life left in this JWT.

I was scratching my head. I may have yelled at the wall. This didn't make sense.

Then, I noticed something odd. The timestamps on these server logs looked a bit... off. I checked my Mac clock again. Yep. The timestamps were about 11 mins off.

It turns out the system clock for this on-premises setup was out of sync. Dude. So, we asked our DevOps team to fix it. They did, and we redeployed everything.

Guess what? We could log in again! Good times.
