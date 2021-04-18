---
title: "Check Flyway Migration Filename Prefix for Uniqueness at Build Time"
date: 2021-02-19T11:30:42-06:00
toc: true
---

When using Flyway, each migration filename prefix must be unique. If they're not unique, then Flyway will fail at **run-time**.

This was not good enough (for me), because it meant that duplicate prefixes could be merged, and would not be discovered until the app was deployed.

What to do about this? A small gradle task can be added that checks prefixes for uniqueness at **build-time**.

Shift Left when you can :)

## Usage

For example, say two developers accidentally committed the same prefix:

```
V1.0.0__migration_1.sql
V1.0.0__migration_2.sql
```

The second developer would see this error on a build:

```
* What went wrong:
Execution failed for task ':checkFlywayMigrationFilenamePrefixForUniqueness'.
> Flyway migration filename prefix is not unique for: V1.0.0
  V1.0.0__migration_1.sql
  V1.0.0__migration_2.sql
```

## Syntax

**Note:** These snippets assume you're using the gradle wrapper.

View all gradle tasks with:

```
./gradlew tasks
```

Run this single task with:

```
./gradlew checkFlywayMigrationFilenamePrefixForUniqueness
```

Do a build with:

```
./gradlew build
```

## Code

Add the following to your [`build.gradle`](https://github.com/zwbetz-gh/check-flyway-migration-filename-prefix-for-uniqueness-at-build-time/blob/main/build.gradle) file:

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

      // Save prefix to a var
      def prefix = it

      // Get how many times the prefix appears in the list
      def count = prefixes.count(prefix)

      // If the prefix is not unique, throw an exception
      if (count > 1) {

        // Get a list of guilty filenames
        def guiltyFilenames = filenames.findAll { it.startsWith("${prefix}__") }

        // Create an error message
        def message = "Flyway migration filename prefix is not unique for: ${prefix}"

        // For each guilty filename, add it to the error message
        guiltyFilenames.each { message += "\n${it}" }

        // Throw an exception
        throw new GradleException(message)
      }
    }
  }
}

// Tell it to run after the build task
build.finalizedBy(checkFlywayMigrationFilenamePrefixForUniqueness)
```

## Sister Repo

<https://github.com/zwbetz-gh/check-flyway-migration-filename-prefix-for-uniqueness-at-build-time>
