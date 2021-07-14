---
title: "How to Show Docker Memory Usage: Amount Total, Amount Used, and Percent Used"
date: 2021-07-14T11:56:54-05:00
toc: false
---

I can view the total memory allocated to Docker with `docker system info`, as well as the amount and percent used for each container with `docker stats`.

But how do I look at **total usage**? With a little Bash-foo, of course.

<!--more-->

Throw the following snippet into a Bash function or script and run when needed.

## Snippet

```sh
mem_amount_total_with_unit=$(docker system info \
| grep 'Total Memory: ' \
| tr -d 'Total Memory: ')

unit=$(echo ${mem_amount_total_with_unit} \
| sed 's/[0-9\.]*//g')

mem_amount_total=$(echo ${mem_amount_total_with_unit} \
| sed 's/[^0-9\.]*//g')

mem_percent_used=$(docker stats --no-stream --format '{{.MemPerc}}' \
| tr -d '%' \
| paste -s -d '+' - \
| bc)

mem_amount_used=$(echo "scale=2; ${mem_amount_total} * ${mem_percent_used} / 100" \
| bc)

echo "Memory Amount Total: ${mem_amount_total}${unit}"
echo "Memory Amount Used: ${mem_amount_used}${unit}"
echo "Memory Percent Used: ${mem_percent_used}%"
```

## Sample Output

I currently have 12GB of memory allocated to Docker, which translates to 11.7GiB reported. I assume it uses a portion for "other things".

I also have 15 containers running, each with various memory appetites.

```
Memory Amount Total: 11.7GiB
Memory Amount Used: 8.88GiB
Memory Percent Used: 75.98%
```

## References

- [docker system info](https://docs.docker.com/engine/reference/commandline/system_info/)
- [docker stats](https://docs.docker.com/engine/reference/commandline/stats/)
- [tr (coreutils)](https://www.gnu.org/software/coreutils/manual/coreutils.html#Operating-on-characters)
- [paste (coreutils)](https://www.gnu.org/software/coreutils/manual/coreutils.html#paste-invocation)
- [grep](https://www.gnu.org/software/grep/manual/grep.html)
- [sed](https://www.gnu.org/software/sed/manual/sed.html)
- [bc](https://www.gnu.org/software/bc/manual/html_mono/bc.html)
