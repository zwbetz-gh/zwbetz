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

Luckily, with a bit of trial and error, and a bunch of googling, I crafted a solution. Roughly, here's how it works:

- Pick a page size, also known as a _chunk_ size. I've defaulted it to 5 for this sample, which is artificially small
- Create a `Pageable`. Start it a 0 (the first page) and pass it the page size
- Get the first page by calling `findAll`. This method accepts the `Pageable` then creates a query from it. You _could_ create the query using `LIMIT` and `OFFSET`, but I went with a plain `WHERE` clause that selects a range of IDs since it's more performant. This method also calls `countAll` to get the total
- While the current page is not empty, do the work. First, log the progress. You'll thank yourself for this, especially if the job is long-running. Next, _do something_ with each row. I'm only logging the row in this sample. Next, increment the `Pageable` then use it to call `findAll` again

**Note:** The page size value is configurable, so you can override it in the `src/main/resources/application.properties` file by setting `pagination_runner.page_size`. Or via env var by setting `PAGINATION_RUNNER_PAGE_SIZE`.

If you get stuck, checkout the [GitHub repo](https://github.com/zwbetz-gh/sql-query-pagination-with-spring-boot-and-jdbctemplate) for the full project.

## Relevant Files

### PaginationRunner.java

File: [src/main/java/com/example/demo/PaginationRunner.java](https://github.com/zwbetz-gh/sql-query-pagination-with-spring-boot-and-jdbctemplate/blob/main/src/main/java/com/example/demo/PaginationRunner.java)

```java
// package and import lines removed for brevity

@Component
public class PaginationRunner implements ApplicationRunner {

  Logger logger = LoggerFactory.getLogger(PaginationRunner.class);

  @Value("${pagination_runner.page_size:5}")
  private int pageSize;

  @Autowired
  private JdbcTemplate jdbcTemplate;

  @Override
  public void run(ApplicationArguments args) throws Exception {
    logger.info("Starting PaginationRunner");
    loopThroughThePages();
    logger.info("Finished PaginationRunner");
  }

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

  private Page<Map<String, Object>> findAll(Pageable pageable) {
    long startId = pageable.getOffset();
    long endId = startId + pageable.getPageSize();
    String sql = String.format("SELECT * FROM word WHERE id > %s AND id <= %s", startId, endId);
    logger.info("findAll sql: {}", sql);
    List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
    long total = countAll();
    return new PageImpl<>(rows, pageable, total);
  }

  private long countAll() {
    String sql = "SELECT COUNT(*) FROM word";
    logger.info("countAll sql: {}", sql);
    return jdbcTemplate.queryForObject(sql, Long.class);
  }

  private void logProgress(Pageable pageable, Page<Map<String, Object>> page) {
    int currentPage = pageable.getPageNumber() + 1;
    int totalPages = page.getTotalPages();
    int currentRowCount = page.getNumberOfElements();
    long totalRowCount = page.getTotalElements();
    logger.info("On page {} of {}. Rows in this page: {}. Total rows: {}", currentPage, totalPages, currentRowCount, totalRowCount);
  }

  private void handleRow(Map<String, Object> row) {
    logger.info(row.toString());
  }

}
```

### schema.sql

When using the in-memory H2 database, this is how the schema is defined.

File: [src/main/resources/schema.sql](https://github.com/zwbetz-gh/sql-query-pagination-with-spring-boot-and-jdbctemplate/blob/main/src/main/resources/schema.sql)

```sql
CREATE TABLE word (
  id INT AUTO_INCREMENT PRIMARY KEY,
  word CHARACTER VARYING
);
```

### data.sql

When using the in-memory H2 database, this is how the data is seeded.

I got this data by grepping for words starting with "b" from the built-in Mac dictionary at `/usr/share/dict/words`.

File: [src/main/resources/data.sql](https://github.com/zwbetz-gh/sql-query-pagination-with-spring-boot-and-jdbctemplate/blob/main/src/main/resources/data.sql)

```sql
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
On page 1 of 3. Rows in this page: 5. Total rows: 11
{ID=1, WORD=babblesome}
{ID=2, WORD=babbling}
{ID=3, WORD=babblingly}
{ID=4, WORD=babblish}
{ID=5, WORD=babblishly}
findAll sql: SELECT * FROM word WHERE id > 5 AND id <= 10
countAll sql: SELECT COUNT(*) FROM word
On page 2 of 3. Rows in this page: 5. Total rows: 11
{ID=6, WORD=babbly}
{ID=7, WORD=babby}
{ID=8, WORD=babe}
{ID=9, WORD=babehood}
{ID=10, WORD=babelet}
findAll sql: SELECT * FROM word WHERE id > 10 AND id <= 15
countAll sql: SELECT COUNT(*) FROM word
On page 3 of 3. Rows in this page: 1. Total rows: 11
{ID=11, WORD=babelike}
findAll sql: SELECT * FROM word WHERE id > 15 AND id <= 20
countAll sql: SELECT COUNT(*) FROM word
Finished PaginationRunner
```
