---
title: "Convert HEIC Images to JPG"
date: 2018-12-06T00:03:20-06:00
publishdate: 2018-12-06
draft: false
toc: true
---

My wife needed to upload a couple hundred pictures, from her Mac, to an online service that makes photo albums. The service didn't accept images with the `.heic` extension, so she needed to convert them to `.jpg`. This would take _many hours_ to do one-by-one, so thankfully ImageMagick supports conversion of HEIC images. Here's how to do it.

## Install Homebrew

First, install [Homebrew](https://brew.sh/), which is a popular package manager for Mac (and Linux).

## Install ImageMagick

Next, install [ImageMagick](https://www.imagemagick.org/script/index.php) from Homebrew.

```
brew install imagemagick
```

## Convert the Images From HEIC to JPG

Finally, convert your images. This command will leave the original `.heic` image, then make a new `.jpg` image with the same name.

```
mogrify -format jpg *.heic
```

## Delete Original HEIC Images

Optionally, delete the original `.heic` images.

```
rm *.heic
```

## Make a Simple GUI Using Mac Automator

See [Convert HEIC images to JPG part 2: Mac Automator]({{< relref "convert-heic-images-to-jpg-part-2-mac-automator" >}}).

## Related

- [Convert a PDF File to PNG or JPG With Imagemagick on Mac]({{< relref "convert-a-pdf-file-to-png-or-jpg-with-imagemagick-on-mac" >}})
- [Combine Images Using ImageMagick]({{< relref "combine-images-using-imagemagick" >}})
