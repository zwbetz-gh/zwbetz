---
title: "Windows Environment Variables in Command Prompt"
date: 2021-04-07T13:00:11-05:00
toc: true
---

## Get an Environment Variable

**Syntax:**

```
echo %<VAR_NAME>%
```

**Usage:**

Let's pretend that your Windows account is named `foo`. On a traditional Windows machine, here's what you'd see:

```
echo %USERNAME%
foo
```

```
echo %USERPROFILE%
C:\Users\foo
```

## Set an Environment Variable

**Syntax:**

```
setx <VAR_NAME> "<VAR_VALUE>"
```

**Usage:**

```
setx MY_NAME "Jane Doe"
```

**Note:** Changes made by `setx` will only be picked up in new instances of Command Prompt. So, **restart** Command Prompt to pick up the change.

## Unset an Environment Variable

**Syntax:**

```
reg delete "HKCU\Environment" /v <VAR_NAME> /f
```

**Usage:**

```
reg delete "HKCU\Environment" /v MY_NAME /f
```

**Note:** Changes made by `reg` will only be picked up in new instances of Command Prompt. So, **restart** Command Prompt to pick up the change.

## Related

- [Install Python on Windows Without Admin Access]({{< relref "install-python-on-windows-without-admin-access" >}})
- [Install NodeJS on Windows Without Admin Access]({{< relref "install-nodejs-on-windows-without-admin-access" >}})
