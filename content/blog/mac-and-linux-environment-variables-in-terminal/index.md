---
title: "List, Get, Set, and Unset Mac and Linux Environment Variables in Terminal"
date: 2021-04-11T00:20:51-05:00
toc: true
---

**Note:** This doc assumes you will use the Bash (`bash`) shell. You can check which shell you're using by running `/bin/ps -p $$ -ocomm=`

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
<VAR_NAME>="<VAR_VALUE>"
```

**Usage:**

```
MY_NAME="Jane Doe"
```

**Persist on Mac:**

Add:

```
export MY_NAME="Jane Doe"
```

to your `~/.bash_profile`. Then source it with `source ~/.bash_profile` or restart your Terminal

**Persist on Linux:**

Add:

```
export MY_NAME="Jane Doe"
```

to your `~/.bashrc`. Then source it with `source ~/.bashrc` or restart your Terminal

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

Add:

```
unset MY_NAME
```

to your `~/.bash_profile`. Then source it with `source ~/.bash_profile` or restart your Terminal

**Persist on Linux:**

Add:

```
unset MY_NAME
```

to your `~/.bashrc`. Then source it with `source ~/.bashrc` or restart your Terminal

## Related

- [List, Get, Set, and Unset Windows Environment Variables in Command Prompt]({{< relref "windows-environment-variables-in-command-prompt" >}})
