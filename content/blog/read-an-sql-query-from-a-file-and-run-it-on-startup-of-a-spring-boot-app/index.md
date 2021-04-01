---
title: "Read an SQL Query From a File and Run It on Startup of a Spring Boot App"
date: 2021-03-31T22:58:48-05:00
toc: false
---

This is useful when you need to check the output of an SQL query on startup of a Spring Boot app. There are no template literal strings in Java 11, so for maintainability, the multi-line query is read from a file.

In this minimal sample, a table of TODOs is queried. If rows are returned, a warning message is logged. Else, success.

## Data File

[`src/main/resources/data.sql`](https://github.com/zwbetz-gh/read-an-sql-query-from-a-file-and-run-it-on-startup-of-a-spring-boot-app/blob/main/src/main/resources/data.sql)

```sql
DROP TABLE IF EXISTS todo;

CREATE TABLE todo (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  content TEXT NOT NULL
);

INSERT INTO
  todo (content)
VALUES
  ('Brew coffee'),
  ('Wash the dog'),
  ('Make dinner');
```

## Query File

[`src/main/resources/query.sql`](https://github.com/zwbetz-gh/read-an-sql-query-from-a-file-and-run-it-on-startup-of-a-spring-boot-app/blob/main/src/main/resources/query.sql)

```sql
SELECT id, content
FROM todo;
```

## Application Runner

[`src/main/java/com/example/demo/SqlQueryApplicationRunner.java`](https://github.com/zwbetz-gh/read-an-sql-query-from-a-file-and-run-it-on-startup-of-a-spring-boot-app/blob/main/src/main/java/com/example/demo/SqlQueryApplicationRunner.java)

```java
package com.example.demo;

import java.io.IOException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

import com.google.common.io.Resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import lombok.extern.log4j.Log4j2;

@Component
@Order(1)
@Log4j2
public class SqlQueryApplicationRunner implements ApplicationRunner {

  @Autowired
  JdbcTemplate jdbcTemplate;

  private String readFile(final String relFilePath) throws IOException {
    final URL url = Resources.getResource(relFilePath);
    return Resources.toString(url, StandardCharsets.UTF_8);
  }

  @Override
  public void run(ApplicationArguments args) throws Exception {
    log.info("Running an SQL query to check TODOs");
    final String sql = readFile("query.sql");
    final List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);

    if (rows.size() > 0) {
      for (Map<String, Object> row : rows) {
        log.warn(row.toString());
      }
      log.warn("You have TODOs ...");
    } else {
      log.info("Congrats, your TODO list is empty");
    }
  }

}
```

## Sample Output

```
2021-03-31 23:53:47.645  INFO 4820 --- [           main] com.example.demo.DemoApplication         : Started DemoApplication in 1.277 seconds (JVM running for 1.535)
2021-03-31 23:53:47.647  INFO 4820 --- [           main] c.e.demo.SqlQueryApplicationRunner       : Running an SQL query to check TODOs
2021-03-31 23:53:47.653  WARN 4820 --- [           main] c.e.demo.SqlQueryApplicationRunner       : {ID=1, CONTENT=Brew coffee}
2021-03-31 23:53:47.653  WARN 4820 --- [           main] c.e.demo.SqlQueryApplicationRunner       : {ID=2, CONTENT=Wash the dog}
2021-03-31 23:53:47.653  WARN 4820 --- [           main] c.e.demo.SqlQueryApplicationRunner       : {ID=3, CONTENT=Make dinner}
2021-03-31 23:53:47.653  WARN 4820 --- [           main] c.e.demo.SqlQueryApplicationRunner       : You have TODOs ...
```
