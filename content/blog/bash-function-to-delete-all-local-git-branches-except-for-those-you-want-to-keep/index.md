---
title: "Bash Function to Delete All Local Git Branches Except for Those You Want to Keep"
date: 2019-03-22T11:18:57-05:00
toc: false
---

**Update:** a newer, slicker version of this function is available at <https://github.com/zwbetz-gh/dotfiles>.

---

Inspired by this [stackoverflow answer](https://stackoverflow.com/a/28572339), I wanted to write a bash function that could handle more than the scenario of "delete all local git branches except for master". Add the below snippet to your `.bash_profile` or `.bashrc` and you're ready to rock. Some notes on what it can do:

- If run it **without** arguments, it will delete all local branches, except for the current branch
- If run it **with** arguments, it will delete all local branches, except for the current branch and whatever branches you pass in
- It outputs which branches will be kept, and which will be deleted
- It outputs the final command to be run 
- It prompts you before running the final command, to which you can enter 1 for Yes or 2 for No

Some things I learned: 

- You can concatenate/build strings in bash by assigning the string to itself plus whatever you want to add, e.g. `var="${var} something else"`
- You can use `tr -d <string>` to remove character(s) from a string
- You can use `eval` to run a command string that you've built 
- `exit` will exit the script, while `return` will exit the function (which is what I wanted in this case)
- You can split a string on whitespace and convert it to an array. See the `branchesToKeep` variable below for an example 

## Function

```bash
gitDeleteAllLocalBranchesExceptFor() {
  local currentBranch
  currentBranch="$(git branch | grep ^* | tr -d "*" | tr -d " ")"

  local branchesToKeep
  # Split on whitespace and convert to array
  branchesToKeep=(${currentBranch} ${@})
  echo "Branches to keep:"
  for branch in "${branchesToKeep[@]}"
  do
    if [[ "${branch}" == "${currentBranch}" ]]; then
      echo "  ${branch} (current)"
    else
      echo "  ${branch}"
    fi
  done

  local cmd
  cmd="git branch | grep -v ^*"

  for arg in "${@}"
  do
    cmd="${cmd} | grep -v ${arg}"
  done

  local branchesToDelete
  branchesToDelete=$(eval $cmd)
  if [[ -z "${branchesToDelete}" ]]; then
    echo "There are no branches to delete..."
    return
  else
    echo -e "Branches to delete:\n${branchesToDelete}"
  fi

  cmd="${cmd} | xargs git branch -D"
  echo -e "Command to run:\n  ${cmd}"

  echo "Do you want to run this command? (enter a number)"
  select yn in "Yes" "No"; do
    case $yn in
      Yes )
        eval ${cmd}
        break
        ;;
      No )
        break
        ;;
    esac
  done
}
```

## Examples

```
$ git branch
  branch1
  branch2
  branch3
  branch4
  branch5
* master

$ gitDeleteAllLocalBranchesExceptFor branch1 branch2
Branches to keep:
  master (current)
  branch1
  branch2
Branches to delete:
  branch3
  branch4
  branch5
Command to run:
  git branch | grep -v ^* | grep -v branch1 | grep -v branch2 | xargs git branch -D
Do you want to run this command? (enter a number)
1) Yes
2) No
#? 1
Deleted branch branch3 (was db13a41).
Deleted branch branch4 (was db13a41).
Deleted branch branch5 (was db13a41).

$ git branch
  branch1
  branch2
* master

$ gitDeleteAllLocalBranchesExceptFor
Branches to keep:
  master (current)
Branches to delete:
  branch1
  branch2
Command to run:
  git branch | grep -v ^* | xargs git branch -D
Do you want to run this command? (enter a number)
1) Yes
2) No
#? 1
Deleted branch branch1 (was db13a41).
Deleted branch branch2 (was db13a41).

$ git branch
* master

$ gitDeleteAllLocalBranchesExceptFor
Branches to keep:
  master (current)
There are no branches to delete...
```
