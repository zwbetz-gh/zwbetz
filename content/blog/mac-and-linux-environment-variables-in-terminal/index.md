---
title: "List, Get, Set, and Unset Mac and Linux Environment Variables in Terminal"
summary: "Say 'Environment Variables' 5 times fast while staring into the Terminal."
date: 2021-04-11T00:20:51-05:00
toc: true
---

## List All Environment Variables

```
env
```

## Get an Environment Variable

**Syntax:**

```
echo ${<VAR_NAME>}
```

**Usage:**

```
echo ${MY_NAME}
```

## Set an Environment Variable

**Syntax:**

```
export <VAR_NAME>="<VAR_VALUE>"
```

**Usage:**

```
export MY_NAME="Jane Doe"
```

**Persist on Mac:**

Add `export MY_NAME="Jane Doe"` to your [shell config file]({{< relref "shell-config-file-on-mac" >}}).

Restart your Terminal.

**Persist on Linux:**

Add `export MY_NAME="Jane Doe"` to your `~/.bashrc` file.

Restart your Terminal.

## Unset an Environment Variable

**Syntax:**

```
unset <VAR_NAME>
```

**Usage:**

```
unset MY_NAME
```

**Persist on Mac:**

Add `unset MY_NAME` to your [shell config file]({{< relref "shell-config-file-on-mac" >}}).

Restart your Terminal.

**Persist on Linux:**

Add `unset MY_NAME` to your `~/.bashrc` file.

Restart your Terminal.

## Related

- [List, Get, Set, and Unset Windows Environment Variables in Command Prompt]({{< relref "windows-environment-variables-in-command-prompt" >}})
