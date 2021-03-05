---
title: "QuickBooks Windows desktop development docs"
date: 2018-09-21T15:07:37-05:00
publishdate: 2018-09-21
draft: false
aliases:
  - /2018/09/quickbooks-windows-desktop-development-docs/
toc: false
---

Created a [GitHub repo](https://github.com/zwbetz-gh/qb-win-desktop-dev-docs) with docs and code examples for developing against QuickBooks (QB) Desktop on Windows. It pulls from my experience developing [Windows Forms](https://docs.microsoft.com/en-us/dotnet/framework/winforms/) apps that query from and import data to QB.

It includes:

* Installing a QB trial version and troubleshooting it
* Reactivating the QB trial version after expiration
* Installing QB SDK
* Adding QBFC library to Visual Studio
* Reference to official QB SDK docs
* Code examples for:
    * Connecting to, and beginning a session with QB
    * Querying a list of employee names
    * Importing a list of timesheets
    * Ending a session with, and closing connection to QB
