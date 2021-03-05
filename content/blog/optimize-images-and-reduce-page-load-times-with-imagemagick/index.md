---
title: "Optimize images and reduce page load times with ImageMagick"
date: 2018-08-19T11:44:14-05:00
publishdate: 2018-08-19
draft: false
aliases:
  - /2018/08/optimize-images-and-reduce-page-load-times-with-imagemagick/
toc: false
show_comments: true
---

**Update:** I now use Hugo's [Image Processing](https://gohugo.io/content-management/image-processing/) feature for image optimization.  

---

Images often account for the majority of page size, so by making them smaller, you reduce page load times. Enter [ImageMagick](https://www.imagemagick.org/script/index.php). This many-featured, open-source software is a solid tool for doing just that. 

According to the [google developers documentation](https://developers.google.com/speed/docs/insights/OptimizeImages) on optimizing images, compressing JPEGs removes visual details of the image, but the compression ratio can be 10x larger than GIF or PNG. So if it makes sense in your case, convert images to JPEG. 

Then there's this idea of [serving scaled images](https://gtmetrix.com/serve-scaled-images.html). In a nutshell, you want to resize your images to support the largest device that would view them (say, a desktop), but no larger. In my case, the page content's max width 800ish px, so images larger than that don't have much benefit. 

For a single image, I'd typically run the below to convert it from PNG to JPEG, resize it (the aspect ratio is preserved by default), and reduce its quality:

```
magick mogrify -format jpg <img>.png
magick mogrify -resize <size> <img>.jpg
magick mogrify -strip -quality <quality> <img>.jpg
```

But what if I need to work on multiple images before posting them? Running the above for each individual image would be time consuming. Thankfully, ImageMagick makes this easy with `*`:

```
magick mogrify -format jpg *.png
magick mogrify -resize <size> *.jpg
magick mogrify -strip -quality <quality> *.jpg
```

I've also scripted this so that I don't have to run multiple commands. The Windows and Mac versions of the script are below. They take one argument: an absolute path to a folder of images. Variables `size` and `quality` should be set to your liking. 

Examples of `size` values:

* `800x` -- only specify the width
* `800x500` -- specify width and height
* `50%` -- specify a percentage

For `quality`, it's a number between `1` and `100`. 

To learn more, see the ImageMagick [mogrify docs](https://imagemagick.org/script/mogrify.php). 

## Windows

```
@echo off

set size=800x
set quality=85

if "%1" == "" (
    echo Please specify an absolute path
    exit /b 
) 

pushd %1
magick mogrify -format jpg *.png
magick mogrify -resize %size% *.jpg
magick mogrify -strip -quality %quality% *.jpg
popd
```

An example usage:

```
img-optimize.cmd C:\Users\winuser\Desktop\Pics
```

## Mac

```
#!/bin/bash

size=800x
quality=85

if [[ -z $1 ]]; then
    echo Please specify an absolute path
    exit 1
fi

pushd $1
magick mogrify -format jpg *.png
magick mogrify -resize $size *.jpg
magick mogrify -strip -quality $quality *.jpg
popd
```

An example usage:

```
./img-optimize.sh /Users/macuser/Desktop/Pics
```

## Results

A previous post, [Townes' 6 (ish) month photos]({{< relref "townes-6-ish-months-photos" >}}) was originally 9 mb. After running the photos through ImageMagick, the post is right around 4 mb, and there is no visible difference.  

Every kb counts, especially on slow connections.
