---
title: "Convert HEIC images to JPG"
date: 2018-12-06T00:03:20-06:00
publishdate: 2018-12-06
draft: false
tags: ["imagemagick", "homebrew", "mac", "command-line"]
toc: false
show_comments: true
---

My wife needed to upload a couple hundred pictures, from her Mac, to an online service that makes photo albums. The service didn't accept images with the `.heic` extension, so she needed to convert them to `.jpg`. This would take _many hours_ to do one-by-one, so thankfully ImageMagick supports conversion of HEIC images. Here's how to do it. 

## Install Homebrew

First, install [Homebrew](https://brew.sh/), which is a popular package manager for Mac.

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

## Install ImageMagick

Next, install [ImageMagick](https://www.imagemagick.org/script/index.php) from Homebrew. The [`--with-libheif`](https://formulae.brew.sh/formula/imagemagick) option tells Homebrew to compile with HEIF support, which allows it to handle `.heic` images. 

```
brew install --with-libheif imagemagick
```

## Convert the images from HEIC to JPG

Finally, convert your images. This command will leave the original `.heic` image, then make a new `.jpg` image with the same name.

```
mogrify -format jpg *.heic
```

## Delete original HEIC images

Optionally, delete the original `.heic` images.

```
rm *.heic
```

## Make a simple GUI using Mac Automator

See [Convert HEIC images to JPG part 2: Mac Automator]({{< relref "convert-heic-images-to-jpg-part-2-mac-automator" >}}).
