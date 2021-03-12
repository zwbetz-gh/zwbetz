---
title: "Script to Install Latest Hugo Release on Linux and Mac"
date: 2018-10-19T13:36:39-05:00
publishdate: 2018-10-19
draft: false
aliases:
  - /script-to-install-latest-hugo-release-on-ubuntu-and-mac/
toc: false
---

Running this script will install the latest (non-extended) hugo release. It was originally written for Linux. To make it work for Mac, find/replace occurrences of `Linux` with `macOS`.

Since this script writes to `/usr/local/bin/`, it will likely need to be run with `sudo`. For example:

```
sudo ./install-latest-hugo-release.sh
```

At the time of this writing, `0.49.2` was the latest hugo release.

## Script

```
#!/bin/bash

pushd /tmp/

curl -s https://api.github.com/repos/gohugoio/hugo/releases/latest \
| grep "browser_download_url.*hugo_[^extended].*_Linux-64bit\.tar\.gz" \
| cut -d ":" -f 2,3 \
| tr -d \" \
| wget -qi -

tarball="$(find . -name "*Linux-64bit.tar.gz")"
tar -xzf $tarball

chmod +x hugo

mv hugo /usr/local/bin/

popd

location="$(which hugo)"
echo "Hugo binary location: $location"

version="$(hugo version)"
echo "Hugo binary version: $version"
```

## Explained

Change to the system's temporary directory so that all files are downloaded here:

```
pushd /tmp/
```

Use `curl` to get a JSON response of the latest hugo releases. The `-s` option makes the request quietly:

```
curl -s https://api.github.com/repos/gohugoio/hugo/releases/latest
```

The response will look something like:

```
...
{
    "url": "https://api.github.com/repos/gohugoio/hugo/releases/assets/9091965",
    "id": 9091965,
    "node_id": "MDEyOlJlbGVhc2VBc3NldDkwOTE5NjU=",
    "name": "hugo_0.49.2_Linux-64bit.tar.gz",
    "label": "",
    "uploader": {
    "login": "bep",
    "id": 394382,
    "node_id": "MDQ6VXNlcjM5NDM4Mg==",
    "avatar_url": "https://avatars1.githubusercontent.com/u/394382?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/bep",
    "html_url": "https://github.com/bep",
    "followers_url": "https://api.github.com/users/bep/followers",
    "following_url": "https://api.github.com/users/bep/following{/other_user}",
    "gists_url": "https://api.github.com/users/bep/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/bep/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/bep/subscriptions",
    "organizations_url": "https://api.github.com/users/bep/orgs",
    "repos_url": "https://api.github.com/users/bep/repos",
    "events_url": "https://api.github.com/users/bep/events{/privacy}",
    "received_events_url": "https://api.github.com/users/bep/received_events",
    "type": "User",
    "site_admin": false
    },
    "content_type": "application/gzip",
    "state": "uploaded",
    "size": 7651283,
    "download_count": 3760,
    "created_at": "2018-10-11T09:49:57Z",
    "updated_at": "2018-10-11T09:49:58Z",
    "browser_download_url": "https://github.com/gohugoio/hugo/releases/download/v0.49.2/hugo_0.49.2_Linux-64bit.tar.gz"
},
...
```

Use `grep` to find the line we want. The `[^extended]` in the regex pattern will ensure that the non-extended version is found:

```
grep "browser_download_url.*hugo_[^extended].*_Linux-64bit\.tar\.gz"
```

The found line will look like:

```
"browser_download_url": "https://github.com/gohugoio/hugo/releases/download/v0.49.2/hugo_0.49.2_Linux-64bit.tar.gz"
```

Use `cut` to delimit the string by `:`, then return the 2nd and 3rd fields:

```
cut -d ":" -f 2,3
```

So now the string looks like:

```
"https://github.com/gohugoio/hugo/releases/download/v0.49.2/hugo_0.49.2_Linux-64bit.tar.gz"
```

Use `tr` to delete occurrences of `"`:

```
tr -d \"
```

So now the string looks like:

```
https://github.com/gohugoio/hugo/releases/download/v0.49.2/hugo_0.49.2_Linux-64bit.tar.gz
```

At this point, the URL string has had all irrelevant characters removed, and is then passed to `wget`. The `-q` option downloads the binary quiety, and the `-i -` option reads the URL from standard input:

```
wget -qi -
```

Use `find` to find the name of the downloaded tarball, then assign it to a variable:

```
tarball="$(find . -name "*Linux-64bit.tar.gz")"
```

Use `tar` to unzip the tarball. The `-x` option extracts the files. The `-z` option is needed since the tarball was ran through gzip when it was created. The `-f` option reads the file to be unzipped as argument:

```
tar -xzf $tarball
```

Give the hugo binary executable permissions:

```
chmod +x hugo
```

Move the hugo binary from `/tmp/` to `/usr/local/bin/`, which is already on your `PATH`:

```
mv hugo /usr/local/bin/
```

Change back to the directory that the script was initially run from:

```
popd
```

Use `which` to get the hugo binary location, assign it to a variable, then `echo` it:

```
location="$(which hugo)"
echo "Hugo binary location: $location"
```

Use `hugo version` to get the hugo binary version, assign it to a variable, then `echo` it:

```
version="$(hugo version)"
echo "Hugo binary version: $version"
```

---

My initial inspiration for this script was [this gist](https://gist.github.com/steinwaywhw/a4cd19cda655b8249d908261a62687f8).
