---
title: "Add a git commit hook to run Prettier on only staged files in a NodeJS project"
date: 2020-09-16T20:45:10-05:00
tags: [git, prettier, nodejs, javascript]
toc: true
show_comments: false
---

[Prettier](https://www.npmjs.com/package/prettier) is a popular code formatter, and I especially like it for JS projects. You can add a script to run it with something like `npm run prettier`, but wouldn't it be nice if it would run automatically every time you did a git commit? On top of that, say your project is huge with thousands of files, wouldn't it be nice if prettier only ran on staged (changed) files?

Well, all of this is possible. See below for details. Make sure to update dependency versions as needed.

## Sample file tree

```
node_modules/
src/app.js
.gitignore
.prettierrc.json
package.json
package-lock.json
```

## .prettierrc.json

```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "none",
  "bracketSpacing": false,
  "arrowParens": "always",
  "proseWrap": "never",
  "endOfLine": "lf"
}
```

## package.json

```json
{
  "scripts": {
    "prettier": "prettier --write src"
  },
  "lint-staged": {
    "*.js": [
      "npm run prettier"
    ]
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "dependencies": {
    "husky": "^4.2.5",
    "lint-staged": "^10.4.0",
    "prettier": "^2.1.2"
  }
}
```
