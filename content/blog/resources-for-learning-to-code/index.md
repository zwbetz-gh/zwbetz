---
title: "Resources for learning to code"
date: 2018-11-02
publishdate: 2018-11-02
draft: false
toc: false
---

I'm sometimes asked about resources I would recommend for learning how to code. That phrase can mean _a lot_ of things, so pulling from my own experience, here's how I'd narrow it down. Please note that these are my personal recommendations, and are only a _very small_ slice of the "learning to code" pie. 

All resources linked below are free, except those by TeamTreehouse. Yes, their content is paid, but it's well worth it, as they have the best cost-to-value ratio of any online video course I've used. They offer a free trial, so if you hustle, you can finish a full course before the trail expires. 

## Basic Web Design

If you just want to build pretty websites, a solid foundation in HTML and CSS is what you need. 

* HTML
    * [Learn Enough HTML to Be Dangerous](https://www.learnenough.com/html-tutorial)
    * [Mozilla: Introduction to HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML)
    * [TeamTreehouse: Learn Web Design](https://teamtreehouse.com/tracks/web-design)
* CSS
    * [Learn Enough CSS & Layout to Be Dangerous](https://www.learnenough.com/css-and-layout-tutorial)
    * [Mozilla: Introduction to CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS)

## Advanced Web Design

As you get more serious, you'll want to keep your projects in version control (Git). Long gone are the days of losing your only site backup. And if you're on a team, Git makes collaboration easy. 

Before learning Git, it makes sense to have a solid foundation in command line, which is called Command Prompt on Windows, or Terminal on Mac and Linux. If you plan to work in IT/Software, command line skills will pay dividends throughout your career. 

Next is JavaScript, which lets you add behavior to your websites (and much more). 

Finally, learn a Static Site Generator, which will keep your code DRY with base templates and layouts, and make the build-test-deploy cycle faster. 

All previous items, plus:

* Command Line
    * [Learn Enough Command Line to Be Dangerous](https://www.learnenough.com/command-line-tutorial)
    * [TeamTreehouse: Console Foundations](https://teamtreehouse.com/library/console-foundations)
* Git
    * [Learn Enough Git to Be Dangerous](https://www.learnenough.com/git-tutorial)
    * [Atlassian Git Tutorials](https://www.atlassian.com/git/tutorials)
    * [TeamTreehouse: Git Basics](https://teamtreehouse.com/library/git-basics)
* JavaScript
    * [Learn Enough JavaScript to Be Dangerous](https://www.learnenough.com/javascript-tutorial)
    * [Mozilla: Learn JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript)
    * [TeamTreehouse: Full Stack JavaScript](https://teamtreehouse.com/tracks/full-stack-javascript)
* Static Site Generator
    * [Hugo](https://gohugo.io/)

## Web Development

If you plan to work in Software, then you'll definitely need to learn Relational Databases, as these will be the datastore for most web apps. SQL is the language used to query relational databases. 

Next is learning a Server Side Language and Framework. Some of the most popular are listed below -- and from my experience -- are the most likely to land you a job. Instead of hopping around from language to language (and framework to framework), I recommend picking one, and learning it well. 

Most projects these days use Continuous Integration (CI), aka The Pipeline, which basically means you merge in small changes often, instead of waiting till the end to merge in a big change. These small changes then get the full treatment, e.g. your project is built from scratch, tested, then deployed to various environments. 

Finally, there is containerization. This adds a level of abstraction to the web app, which makes it easier for developers to get their environment setup and get consistent testing results. Among other things, it also ensures the environment you are working with locally will be the same environment in Dev, PreProd, PROD, etc. 

All previous items, plus: 

* Relational Databases and SQL
    * [TeamTreehouse: Beginning SQL](https://teamtreehouse.com/tracks/beginning-sql)
    * [TeamTreehouse: Querying Relational Databases](https://teamtreehouse.com/library/querying-relational-databases)
    * [SQL Server: Query Data](https://docs.microsoft.com/en-us/sql/lp/sql-server/query-data?view=sql-server-2017#pivot=products&panel=products1)
* Server Side Language and Framework
    * C# MVC
        * [ASP.NET Learn](https://www.asp.net/learn)
        * [TeamTreehouse: ASP.NET Web Development](https://teamtreehouse.com/tracks/aspnet-web-development)
    * Java Spring MVC
        * [Spring Guides](https://spring.io/guides)
        * [TeamTreehouse: Spring Basics](https://teamtreehouse.com/library/spring-basics)
    * Ruby on Rails
        * [Learn Enough Ruby to Be Dangerous](https://www.learnenough.com/ruby-tutorial)
        * [Ruby on Rails Tutorial by Michael Hartl](https://www.railstutorial.org/book)
        * [Ruby on Rails Guides](https://guides.rubyonrails.org/)
        * [TeamTreehouse: Rails Development](https://teamtreehouse.com/tracks/rails-development)
* Continuous Integration (aka Pipeline)
    * [Jenkins Docs](https://jenkins.io/doc/)
* Containerization
    * [Docker Docs](https://docs.docker.com/)
