---
title: "List, Get, Set, and Unset Windows Environment Variables in Command Prompt"
date: 2021-04-07T13:00:11-05:00
toc: true
---

## List All Environment Variables

```
set
```

## Get an Environment Variable

**Syntax:**

```
echo %<VAR_NAME>%
```

**Usage:**

Let's pretend that your Windows account is named `foo`. On a traditional Windows machine, here's what you'd see:

`echo %USERNAME%` will output `foo`

`echo %USERPROFILE%` will output `C:\Users\foo`

## Set an Environment Variable (Only for Current Session)

**Syntax:**

```
set <VAR_NAME>="<VAR_VALUE>"
```

**Usage:**

```
set MY_NAME="Jane Doe"
```

## Set an Environment Variable (Persist)

**Syntax:**

```
setx <VAR_NAME> "<VAR_VALUE>"
```

**Usage:**

```
setx MY_NAME "Jane Doe"
```

**Note:** Changes made by `setx` will only be picked up in new instances of Command Prompt. So, **restart** Command Prompt to pick up the change.

## Unset an Environment Variable (Only for Current Session)

**Syntax:**

```
set <VAR_NAME>=
```

**Usage:**

```
set MY_NAME=
```

## Unset an Environment Variable (Persist)

**Syntax:**

```
reg delete "HKCU\Environment" /v <VAR_NAME> /f
```

**Usage:**

```
reg delete "HKCU\Environment" /v MY_NAME /f
```

**Note:** Changes made by `reg` will only be picked up in new instances of Command Prompt. So, **restart** Command Prompt to pick up the change.

## Docs

- [set](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/set_1)
- [setx](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/setx)
- [reg delete](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/reg-delete)

## Related

- [List, Get, Set, and Unset Mac and Linux Environment Variables in Terminal]({{< relref "mac-and-linux-environment-variables-in-terminal" >}})
