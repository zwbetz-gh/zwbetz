---
title: "End-to-End (e2e) Testing Rules"
date: 2021-02-23T22:15:56-06:00
toc: true
---

e2e testing projects have gained a sad reputation over the years. They're known to be slow, flaky, and time-consuming.

Yet, it doesn't have to be this way. Can you imagine e2e tests that are fast, reliable, and clean? It's possible. And by following this small set of rules, you can set yourself up for success.

<!--more-->

## Tests Must Be Independent

Tests cannot depend on each other. A given test must handle its own setup and teardown logic and should be able to run by itself.

By setup and teardown, I do not mean the deployed app under test, which should be handled by CI/CD (preferably as a deploy to a clean environment before the test run, then an environment teardown after the test run). Instead, I mean _data_. Two tests should not rely on the same data. If test `a` modifies that data, then test `b` becomes flaky. Tests should generate their own data via UI actions, or use seeded test data (say, from database migration files).

This rule will grant you the gift of speed, because it allows tests to run in parallel. (When tests run in parallel, there's no guarantee of run order).

Nightwatch.js allows running tests in parallel by specifying `N` [workers](https://nightwatchjs.org/gettingstarted/configuration/). Let's say you specified 5 workers. Then you could spin up 5 chrome nodes via [Selenium Grid](https://github.com/SeleniumHQ/docker-selenium) to handle the workload.

## Religiously Prune Flaky Tests

If a flaky test cannot be immediately fixed, then it should be deleted or ignored. You simply don't have time to deal with flakiness.

Your test report must be trustworthy. If your report is constantly littered with flaky failures, then no one will trust it. Strive for meaningful failures.

## Never Hard Sleep

Hard sleeping is notorious for slowing down tests. If you must wait for an element, never hardcode the wait-time. Instead, use polling.

In Nightwatch.js hard sleeping looks like `pause()`, in Java it looks like `Thread.sleep()`.

If you always wait for an element for 10 seconds, and the element becomes available in 1 second, then you've just wasted 9 seconds.

Nightwatch.js offers `before()` and `after()` [functions](https://nightwatchjs.org/api/expect/), which retry an assertion for a given amount of time, at a given polling interval.

## Refactor, Refactor, Refactor

Whenever you find yourself doing the same action in multiple tests, pull that action out into a helper function. This allows future changes to that action to be made in only one place.

## Use Page Objects

Your tests should consist of calling action functions and doing assertions.

If you have to model your page within a test, this leads to spaghetti code.

Instead, have a separate layer, often called a Page Object layer, where your UI is modelled in plain old (insert your language here) objects.

## Prefer IDs for Element Selectors

An HTML `id`, by [definition](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id), must be unique. This makes them a great choice for element locators. It gives you the confidence that your tests are targeting the correct elements.

## At Least One Tester Should Be a Developer

e2e tests are their own little software project. They need tender loving care just like the app under test. A seasoned developer knows how to offer this care.

This doesn't mean the developer must abandon the usual feature-cranking and bug-fixing work. But the developer should be involved in the architecture decisions of the e2e tests and should review pull requests.

## Follow the Test Pyramid

Push your tests as far down the pyramid as you can. If a testcase can be sufficiently covered by a unit test, then it should be a unit test.

Be selective about what you e2e test. Aim to keep your total e2e test count relatively small. Do not duplicate testing effort done by lower-level tests.

<br>
<br>

{{< figure
img="test-pyramid.png"
alt="Test Pyramid"
caption="The Test Pyramid, courtesy of <https://martinfowler.com/articles/practical-test-pyramid.html>"
command="Resize"
options="600x" >}}
