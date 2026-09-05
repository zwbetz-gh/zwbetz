---
title: "SQL Query Pagination With Spring Boot and JdbcTemplate"
date: 2022-09-10T21:08:38-05:00
toc: true
draft: false
---

There are times when the amount of data you need to fetch is simply too large for a single trip. Don't fear, pagination is _one way_ to solve this.

<!--more-->

## How it Works

If you've used Spring Boot before, you may know that JPA includes pagination support out-of-the-box. While this is nice, there are some scenarios (like the one I encountered at work recently) where you're working with raw, complex SQL, but you still need some way to do pagination.

Luckily, with a bit of trial and error, and a bunch of googling, I crafted a solution.

If you get stuck, checkout the [GitHub repo](https://github.com/zwbetz-gh/sql-query-pagination-with-spring-boot-and-jdbctemplate) for the full project.

## Relevant Files

### PaginationRunner.java

File: [src/main/java/com/example/demo/PaginationRunner.java](https://github.com/zwbetz-gh/sql-query-pagination-with-spring-boot-and-jdbctemplate/blob/main/src/main/java/com/example/demo/PaginationRunner.java)

```java
// package and import lines removed for brevity

@Component
public class PaginationRunner implements ApplicationRunner {

  Logger logger = LoggerFactory.getLogger(PaginationRunner.class);

  /**
   * The pageSize is configurable. We default it to 5 here.
   * You can override it in the src/main/resources/application.properties file by setting pagination_runner.page_size.
   * Or, via env var by setting PAGINATION_RUNNER_PAGE_SIZE.
   */
  @Value("${pagination_runner.page_size:5}")
  private int pageSize;

  /**
   * The jdbcTemplate uses the default data source. Which, in this demo, is the in-memory H2 database.
   */
  @Autowired
  private JdbcTemplate jdbcTemplate;

  /**
   * This class implements ApplicationRunner.
   * So, this component will run after the Spring Application Context is initialized.
   */
  @Override
  public void run(ApplicationArguments args) throws Exception {
    logger.info("Starting PaginationRunner");
    loopThroughThePages();
    logger.info("Finished PaginationRunner");
  }

  /**
   * Loop through the pages until you encounter an empty page.
   */
  private void loopThroughThePages() {
    Pageable pageable = PageRequest.of(0, pageSize);
    Page<Map<String, Object>> page = findAll(pageable);

    while (!page.isEmpty()) {
      logProgress(pageable, page);
      page.stream().forEach(this::handleRow);
      pageable = pageable.next();
      page = findAll(pageable);
    }
  }

  /**
   * Find all the rows.
   * You _could_ create the query using LIMIT and OFFSET...
   * But, I went with a plain WHERE clause that selects a range of IDs because it's faster.
   */
  private Page<Map<String, Object>> findAll(Pageable pageable) {
    long startId = pageable.getOffset();
    long endId = startId + pageable.getPageSize();
    String sql = String.format(
        "SELECT * FROM word WHERE id > %s AND id <= %s",
        startId,
        endId
    );
    logger.info("findAll sql: {}", sql);
    List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
    long total = countAll();
    return new PageImpl<>(rows, pageable, total);
  }

  /**
   * Count all the rows.
   */
  private long countAll() {
    String sql = "SELECT COUNT(*) FROM word";
    logger.info("countAll sql: {}", sql);
    return jdbcTemplate.queryForObject(sql, Long.class);
  }

  /**
   * Log the progress.
   * You'll thank yourself for this, especially if the "job" is long-running.
   */
  private void logProgress(Pageable pageable, Page<Map<String, Object>> page) {
    int currentPage = pageable.getPageNumber() + 1;
    int totalPages = page.getTotalPages();
    int currentRowCount = page.getNumberOfElements();
    long totalRowCount = page.getTotalElements();
    logger.info(
        "On page {} of {}. Rows in page: {}. Total rows: {}",
        currentPage, totalPages, currentRowCount, totalRowCount
    );
  }

  /**
   * Actually do something with each row.
   * In this demo, I'm just logging the row.
   * In a real scenario, maybe you're building up a bulk request to send somewhere else, etc.
   */
  private void handleRow(Map<String, Object> row) {
    logger.info(row.toString());
  }

}
```

### schema.sql

File: [src/main/resources/schema.sql](https://github.com/zwbetz-gh/sql-query-pagination-with-spring-boot-and-jdbctemplate/blob/main/src/main/resources/schema.sql)

```sql
-- When using the in-memory H2 database, this is how the schema is defined.

CREATE TABLE word (
  id INT AUTO_INCREMENT PRIMARY KEY,
  word CHARACTER VARYING
);
```

### data.sql

File: [src/main/resources/data.sql](https://github.com/zwbetz-gh/sql-query-pagination-with-spring-boot-and-jdbctemplate/blob/main/src/main/resources/data.sql)

```sql
-- When using the in-memory H2 database, this is how the data is seeded.
-- I got this data by grepping for words starting with "b" in the built-in Mac dictionary at /usr/share/dict/words.

INSERT INTO word (word) VALUES ('babblesome');
INSERT INTO word (word) VALUES ('babbling');
INSERT INTO word (word) VALUES ('babblingly');
INSERT INTO word (word) VALUES ('babblish');
INSERT INTO word (word) VALUES ('babblishly');
INSERT INTO word (word) VALUES ('babbly');
INSERT INTO word (word) VALUES ('babby');
INSERT INTO word (word) VALUES ('babe');
INSERT INTO word (word) VALUES ('babehood');
INSERT INTO word (word) VALUES ('babelet');
INSERT INTO word (word) VALUES ('babelike');
```

## Sample Output

You can view this by running the app with: `./gradlew bootRun`

```
Starting PaginationRunner
findAll sql: SELECT * FROM word WHERE id > 0 AND id <= 5
countAll sql: SELECT COUNT(*) FROM word
On page 1 of 3. Rows in page: 5. Total rows: 11
{ID=1, WORD=babblesome}
{ID=2, WORD=babbling}
{ID=3, WORD=babblingly}
{ID=4, WORD=babblish}
{ID=5, WORD=babblishly}
findAll sql: SELECT * FROM word WHERE id > 5 AND id <= 10
countAll sql: SELECT COUNT(*) FROM word
On page 2 of 3. Rows in page: 5. Total rows: 11
{ID=6, WORD=babbly}
{ID=7, WORD=babby}
{ID=8, WORD=babe}
{ID=9, WORD=babehood}
{ID=10, WORD=babelet}
findAll sql: SELECT * FROM word WHERE id > 10 AND id <= 15
countAll sql: SELECT COUNT(*) FROM word
On page 3 of 3. Rows in page: 1. Total rows: 11
{ID=11, WORD=babelike}
findAll sql: SELECT * FROM word WHERE id > 15 AND id <= 20
countAll sql: SELECT COUNT(*) FROM word
Finished PaginationRunner
```
