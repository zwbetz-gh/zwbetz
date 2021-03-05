---
title: "Check Flyway Migration Filename Prefix for Uniqueness at Build Time"
date: 2021-02-19T11:30:42-06:00
toc: false
show_comments: false
---

A Flyway migration filename prefix must be unique. If it is not unique, then Flyway will fail at **run-time**. This is not good enough (for me), because it means that duplicate prefixes could be merged, and it would not be discovered until the app was deployed. 

What to do about this? A small gradle task can be added that checks prefixes for uniqueness at **build-time**. 

## Usage

For example, say two developers accidentally committed the same prefix. 

```
V1__foo.sql
V1__foo.sql
```

The second developer would see this error on a build:

```
* What went wrong:
Execution failed for task ':checkFlywayMigrationFilenamePrefixForUniqueness'.
> Flyway migration filename prefix is not unique: V1
```

## Code

Add the following to your `build.gradle` file. 

You can view all gradle tasks by running `./gradlew tasks`

```groovy
task checkFlywayMigrationFilenamePrefixForUniqueness() {

  // Document the task
  group = 'Verification'
  description = 'Check Flyway migration filename prefix for uniqueness'

  // Provide the Action block
  doLast {

    // The default Flyway locations dir is src/main/resources/db/migration
    // So, go one level up, in case custom dirs are used
    def dir = "src/main/resources/db"

    // Get a list of filenames
    def filenames = fileTree(dir).files.name

    // Get a list of prefixes
    def prefixes = filenames.collect { it.split("__")[0] }

    // Check each prefix
    prefixes.each {

      // Get how many times the prefix appears in the list
      def count = prefixes.count(it)

      // If the prefix is not unique, throw an exception
      if (count > 1) {
        throw new GradleException("Flyway migration filename prefix is not unique: $it")
      }
    }
  }
}

// Tell it to run after the build task
build.finalizedBy(checkFlywayMigrationFilenamePrefixForUniqueness)
```
