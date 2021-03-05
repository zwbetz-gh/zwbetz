---
title: "Coming from Java (or a C-like language) to Hugo's Go Templates"
date: 2018-12-10T10:36:54-06:00
publishdate: 2018-12-10
draft: false
toc: true
---

If you have a basic understanding of Java, or any other C-like language, then this post will ease you into Hugo's Go Templates syntax. 

## Arithmetic operators

Arithmatic operators are provided by [Hugo's Math functions](https://gohugo.io/functions/math/).

### Addition

**Java:**
```
int result = 1 + 2;
```

**Go Templates:**
```
{{ $result := add 1 2 }}
```

**Value of result variable:**
```
3
```

### Subtraction

**Java:**
```
int result = 2 - 1;
```

**Go Templates:**
```
{{ $result := sub 2 1 }}
```

**Value of result variable:**
```
1
```

### Multiplication

**Java:**
```
int result = 3 * 3;
```

**Go Templates:**
```
{{ $result := mul 3 3 }}
```

**Value of result variable:**
```
9
```

### Division

**Java:**
```
int result = 6 / 3;
```

**Go Templates:**
```
{{ $result := div 6 3 }}
```

**Value of result variable:**
```
2
```

### Modulus

**Java:**
```
int result = 10 % 2;
```

**Go Templates:**
```
{{ $result := mod 10 2 }}
```

**Value of result variable:**
```
0
```

## Relational operators

Relational operators are provided as [Hugo functions](https://gohugo.io/functions/).

### Equal to

**Java:**
```
boolean result = "go" == "go";
```

**Go Templates:**
```
{{ $result := eq "go" "go" }}
```

**Value of result variable:**
```
true
```

### Not equal to

**Java:**
```
boolean result = "go" != "go";
```

**Go Templates:**
```
{{ $result := ne "go" "go" }}
```

**Value of result variable:**
```
false
```

### Greater than

**Java:**
```
boolean result = 2 > 1;
```

**Go Templates:**
```
{{ $result := gt 2 1 }}
```

**Value of result variable:**
```
true
```

### Less than

**Java:**
```
boolean result = 2 < 1;
```

**Go Templates:**
```
{{ $result := lt 2 1 }}
```

**Value of result variable:**
```
false
```

### Greater than or equal to

**Java:**
```
boolean result = 2 >= 1;
```

**Go Templates:**
```
{{ $result := ge 2 1 }}
```

**Value of result variable:**
```
true
```

### Less than or equal to

**Java:**
```
boolean result = 2 <= 1;
```

**Go Templates:**
```
{{ $result := le 2 1 }}
```

**Value of result variable:**
```
false
```

## Logical operators

See the [Introduction to Hugo Templating](https://gohugo.io/templates/introduction/) for more examples of logical operators. 

### And

**Java:**
```
if ("go" == "go" && 2 > 1) {
  System.out.println("Logical and"); 
}
```

**Go Templates:**
```
{{ if and (eq "go" "go") (gt 2 1) }}
  {{ print "Logical and" }}
{{ end }}
```

**Output:**
```
Logical and
```

### Or

**Java:**
```
if ("java" == "go" || 2 > 1) {
  System.out.println("Logical or"); 
}
```

**Go Templates:**
```
{{ if or (eq "java" "go") (gt 2 1) }}
  {{ print "Logical or" }}
{{ end }}
```

**Output:**
```
Logical or
```

## Loops

Go Templates use [`range`](https://gohugo.io/functions/range/) to iterate over a map, array, or slice. It's similar to the Java for-each loop. 

### For-each loop

**Java:**
```
String[] animals = { "Cat", "Dog", "Bird" };
for (String animal : animals) {
  System.out.println(animal);
}
```

**Go Templates:**
```
{{ $animals := slice "Cat" "Dog" "Bird" }}
{{ range $animals }}
  {{ . }}
{{ end }}
```

**Output:**
```
Cat
Dog
Bird
```

### Regular for loop

Using the [`seq`](https://gohugo.io/functions/seq/) function, a regular Java for loop can be imitated. 

**Java:**
```
for (int i = 1; i < 10; i++) {
  System.out.print(i + " ");
}
```

**Go Templates:**
```
{{ $i := seq 9 }}
{{ range $i }}
  {{- print . " " -}}
{{ end }}
```

**Output:**
```
1 2 3 4 5 6 7 8 9 
```

## Strings

For more info, see the docs on the [`print`](https://gohugo.io/functions/print/) and [`printf`](https://gohugo.io/functions/printf/) functions, as well as the docs on [fmt, a Go Package](https://golang.org/pkg/fmt/).

### String concatenation using print

**Java:**
```
String message = "Hello" + " " + "world";
```

**Go Templates:**
```
{{ $message := print "Hello" " " "world" }}
```

**Value of message variable:**
```
Hello world
```

### String concatenation using printf

**Java:**
```
String message = String.format("Hello %s", "world");
```

**Go Templates:**
```
{{ $message := printf "Hello %s" "world" }}
```

**Value of message variable:**
```
Hello world
```
