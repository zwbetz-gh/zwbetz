---
title: "Convert a PDF file to PNG or JPG With Imagemagick on Mac"
date: 2020-02-10T21:30:43-06:00
tags: [command-line, mac, imagemagick, pdf, png, jpg]
toc: false
show_comments: false
---

I needed to convert some large PDF files into images for my wife. All of the free online converters had a file size limit of around 25 MB... but the files I was working with were a few hundred MB. Once again, Imagemagick comes to the rescue. Here's how to do it:

## Setup

1. Install [Homebrew](https://brew.sh/)
1. Install [Imagemagick](https://imagemagick.org/index.php)

        brew install imagemagick

1. Install [Ghostscript](https://www.ghostscript.com/), which allows Imagemagick to convert from PDFs

        brew install ghostscript

## Convert

```bash
# PDF to PNG
magick file.pdf file.png

# PDF to JPG
magick file.pdf file.jpg
```
