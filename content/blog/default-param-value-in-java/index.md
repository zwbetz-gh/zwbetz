---
title: "Default Parameter Values in Java"
date: 2018-08-10T13:35:32-05:00
publishdate: 2018-08-10
draft: false
aliases:
  - /2018/08/default-parameter-values-in-java/
toc: false
---

I'm used to C#, so if I want a parameter to have a default value, it can be done like this. 

```
private static void sayHi(string message = "Hi") 
{
    Console.WriteLine(message);
}
```

But what about Java? It can be done as well, and one way is to use method overloading. 

```
private static void sayHi(String message) {
    System.out.println(message);
}

private static void sayHi() {
    sayHi("Hi");
}
```

Shoutout to this [stackoverflow](https://stackoverflow.com/questions/997482/does-java-support-default-parameter-values) post. 
