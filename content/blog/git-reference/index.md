---
title: "Git Reference"
date: 2021-03-31T15:59:19-05:00
toc: false
---

A living doc.

<!--more-->

<table class="usa-table">
<thead>

<tr>
<th>Task</th>
<th>Syntax</th>
</tr>

</thead>
<tbody>

<tr>
<td>Init new repo</td>
<td><code>git init</code></td>
</tr>

<tr>
<td>Configure local user name</td>
<td><code>git config --local user.name &quot;&lt;USER_NAME&gt;&quot;</code></td>
</tr>

<tr>
<td>Configure local user email</td>
<td><code>git config --local user.email &quot;&lt;USER_EMAIL&gt;&quot;</code></td>
</tr>

<tr>
<td>List local configuration</td>
<td><code>git config --local --list</code></td>
</tr>

<tr>
<td>Create new branch</td>
<td><code>git checkout -b &lt;BRANCH&gt;</code></td>
</tr>

<tr>
<td>Create remote branch from local branch</td>
<td><code>git push --set-upstream origin &lt;BRANCH&gt;</code></td>
</tr>

<tr>
<td>Checkout existing branch</td>
<td><code>git checkout &lt;BRANCH&gt;</code></td>
</tr>

<tr>
<td>Delete local branch</td>
<td><code>git branch -D &lt;BRANCH&gt;</code></td>
</tr>

<tr>
<td>Delete all local branches except for current banch</td>
<td><code>git branch | grep -v '^*' | xargs git branch -D</code></td>
</tr>

<tr>
<td>Delete remote branch</td>
<td><code>git push --delete --force origin &lt;BRANCH&gt;</code></td>
</tr>

<tr>
<td>List local branches</td>
<td><code>git branch</code></td>
</tr>

<tr>
<td>List remote branches</td>
<td><code>git branch -r</code></td>
</tr>

<tr>
<td>Show status</td>
<td><code>git status</code></td>
</tr>

<tr>
<td>Show diff</td>
<td><code>git diff</code></td>
</tr>

<tr>
<td>Stage all changes</td>
<td><code>git add .</code></td>
</tr>

<tr>
<td>Commit staged changes</td>
<td><code>git commit -m &quot;&lt;MESSAGE&gt;&quot;</code></td>
</tr>

<tr>
<td>Push local branch to remote branch</td>
<td><code>git push</code></td>
</tr>

<tr>
<td>Merge remote branch into local branch</td>
<td><code>git pull origin &lt;BRANCH&gt;</code></td>
</tr>

<tr>
<td>Show commit log</td>
<td><code>git log</code></td>
</tr>

<tr>
<td>Show pretty commit log</td>
<td><code>git log --oneline</code></td>
</tr>

<tr>
<td>Unstage all changes</td>
<td><code>git reset</code></td>
</tr>

<tr>
<td>Undo all modified files</td>
<td><code>git checkout .</code></td>
</tr>

<tr>
<td>Delete untracked files</td>
<td><code>git clean -f -d</code></td>
</tr>

<tr>
<td>Interactively rebase last <code>n</code> commits</td>
<td><code>git rebase -i HEAD~n</code></td>
</tr>

<tr>
<td>Cleanup local repo</td>
<td><code>git gc</code></td>
</tr>

<tr>
<td>Recognize case-only filename changes</td>
<td><code>git mv -f &lt;OLD_FILE_PATH&gt; &lt;NEW_FILE_PATH&gt;</code></td>
</tr>

<tr>
<td>Ignore a file that was already committed</td>
<td><code>git rm -r --cached . && git add .</code></td>
</tr>

</tbody>
</table>
