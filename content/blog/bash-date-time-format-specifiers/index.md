---
title: "Bash date time format specifiers"
date: 2019-05-21T23:04:33-05:00
tags: [command-line]
toc: false
show_comments: true
---

Given the following bash date, here's what each [specifier](http://man7.org/linux/man-pages/man1/date.1.html) will do. 

```
Mon May 27 18:11:12 DST 2019
```

## Specifiers

| Specifier | Output | Description |
| --- | --- | --- |
| `%%` | `%` | a literal % |
| `%a` | `Mon` | locale's abbreviated weekday name (e.g., Sun) |
| `%A` | `Monday` | locale's full weekday name (e.g., Sunday) |
| `%b` | `May` | locale's abbreviated month name (e.g., Jan) |
| `%B` | `May` | locale's full month name (e.g., January) |
| `%c` | `Mon May 27 18:11:12 2019` | locale's date and time (e.g., Thu Mar 3 23:05:25 2005) |
| `%C` | `20` | century; like %Y, except omit last two digits (e.g., 20) |
| `%d` | `27` | day of month (e.g., 01) |
| `%D` | `05/27/19` | date; same as %m/%d/%y |
| `%e` | `27` | day of month, space padded; same as %_d |
| `%F` | `2019-05-27` | full date; like %+4Y-%m-%d |
| `%g` | `19` | last two digits of year of ISO week number (see %G) |
| `%G` | `2019` | year of ISO week number (see %V); normally useful only with %V |
| `%h` | `May` | same as %b |
| `%H` | `18` | hour (00..23) |
| `%I` | `06` | hour (01..12) |
| `%j` | `147` | day of year (001..366) |
| `%k` | `18` | hour, space padded ( 0..23); same as %_H |
| `%l` | ` 6` | hour, space padded ( 1..12); same as %_I |
| `%m` | `05` | month (01..12) |
| `%M` | `11` | minute (00..59) |
| `%p` | `PM` | locale's equivalent of either AM or PM; blank if not known |
| `%P` | `pm` | like %p, but lower case |
| `%r` | `06:11:12 PM` | locale's 12-hour clock time (e.g., 11:11:04 PM) |
| `%R` | `18:11` | 24-hour hour and minute; same as %H:%M |
| `%s` | `1558998672` | seconds since 1970-01-01 00:00:00 UTC |
| `%S` | `12` | second (00..60) |
| `%T` | `18:11:12` | time; same as %H:%M:%S |
| `%u` | `1` | day of week (1..7); 1 is Monday |
| `%U` | `21` | week number of year, with Sunday as first day of week (00..53) |
| `%V` | `22` | ISO week number, with Monday as first day of week (01..53) |
| `%w` | `1` | day of week (0..6); 0 is Sunday |
| `%W` | `21` | week number of year, with Monday as first day of week (00..53) |
| `%x` | `05/27/19` | locale's date representation (e.g., 12/31/99) |
| `%X` | `18:11:12` | locale's time representation (e.g., 23:13:48) |
| `%y` | `19` | last two digits of year (00..99) |
| `%Y` | `2019` | year |
| `%z` | `-0500` | +hhmm numeric time zone (e.g., -0400) |
| `%Z` | `DST` | alphabetic time zone abbreviation (e.g., EDT) |

## Source

The above markdown table was generated with the following bash script. 

```bash
#!/bin/bash

specifiers=(
  "%%|a literal %"
  "%a|locale's abbreviated weekday name (e.g., Sun)"
  "%A|locale's full weekday name (e.g., Sunday)"
  "%b|locale's abbreviated month name (e.g., Jan)"
  "%B|locale's full month name (e.g., January)"
  "%c|locale's date and time (e.g., Thu Mar 3 23:05:25 2005)"
  "%C|century; like %Y, except omit last two digits (e.g., 20)"
  "%d|day of month (e.g., 01)"
  "%D|date; same as %m/%d/%y"
  "%e|day of month, space padded; same as %_d"
  "%F|full date; like %+4Y-%m-%d"
  "%g|last two digits of year of ISO week number (see %G)"
  "%G|year of ISO week number (see %V); normally useful only with %V"
  "%h|same as %b"
  "%H|hour (00..23)"
  "%I|hour (01..12)"
  "%j|day of year (001..366)"
  "%k|hour, space padded ( 0..23); same as %_H"
  "%l|hour, space padded ( 1..12); same as %_I"
  "%m|month (01..12)"
  "%M|minute (00..59)"
  "%p|locale's equivalent of either AM or PM; blank if not known"
  "%P|like %p, but lower case"
  "%r|locale's 12-hour clock time (e.g., 11:11:04 PM)"
  "%R|24-hour hour and minute; same as %H:%M"
  "%s|seconds since 1970-01-01 00:00:00 UTC"
  "%S|second (00..60)"
  "%T|time; same as %H:%M:%S"
  "%u|day of week (1..7); 1 is Monday"
  "%U|week number of year, with Sunday as first day of week (00..53)"
  "%V|ISO week number, with Monday as first day of week (01..53)"
  "%w|day of week (0..6); 0 is Sunday"
  "%W|week number of year, with Monday as first day of week (00..53)"
  "%x|locale's date representation (e.g., 12/31/99)"
  "%X|locale's time representation (e.g., 23:13:48)"
  "%y|last two digits of year (00..99)"
  "%Y|year"
  "%z|+hhmm numeric time zone (e.g., -0400)"
  "%Z|alphabetic time zone abbreviation (e.g., EDT)"
)

echo
date_string='Mon May 27 18:11:12 DST 2019'
echo "$date_string"
echo

echo "| Specifier | Output | Description |"
echo "| --- | --- | --- |"
for i in "${specifiers[@]}"; do
  specifier="$(echo "$i" | cut -d '|' -f 1)"
  description="$(echo "$i" | cut -d '|' -f 2)"
  output="$(date -d "$date_string" +"$specifier")"
  echo "| \`$specifier\` | \`$output\` | $description |"
done
echo
```
