#!/usr/bin/env bash

DIRS=(
  bash
  python
)

print_shell_backticks() {
  echo '```shell'
}

print_backticks() {
  echo '```'
}

print_exit_code() {
  echo ''
  echo '$ echo ${?}'
  echo ${1}
}

for dir in ${DIRS[@]}; do
  cd ${dir}
  echo "########################################"
  echo ${dir}
  echo "########################################"

  print_shell_backticks
  echo '$ ./script --help'
  ./script --help
  print_exit_code ${?}
  print_backticks
  echo ''

  print_shell_backticks
  echo '$ ./script --what'
  ./script --what
  print_exit_code ${?}
  print_backticks
  echo ''

  print_shell_backticks
  echo '$ ./script -p'
  ./script -p
  print_exit_code ${?}
  print_backticks
  echo ''

  print_shell_backticks
  echo '$ ./script --'
  ./script --
  print_exit_code ${?}
  print_backticks
  echo ''

  print_shell_backticks
  echo '$ ./script -- "Jane"'
  ./script -- "Jane"
  print_exit_code ${?}
  print_backticks
  echo ''

  print_shell_backticks
  echo '$ ./script -u -p "Woah" -- "Jane"'
  ./script -u -p "Woah" -- "Jane"
  print_exit_code ${?}
  print_backticks
  echo ''

  print_shell_backticks
  echo '$ echo "stdin" | ./script --uppercase --prefix "Woah" --'
  echo "stdin" | ./script --uppercase --prefix "Woah" --
  print_exit_code ${?}
  print_backticks
  echo ''

  cd ..
done
