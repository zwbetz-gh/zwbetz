---
title: "Combine Images Using ImageMagick"
date: 2019-09-09T21:24:28-05:00
toc: false
---

I often combine screenshots for documentation purposes. ImageMagick is great for this. Given a dir of images:

<!--more-->

```bash
# Make output dir
mkdir -p output

# Combine multiple images vertically
magick convert -append *.png output/combined-vertical.png

# Combine multiple images horizontally
magick convert +append *.png output/combined-horizontal.png
```

## Related

- [Convert HEIC Images to JPG]({{< relref "convert-heic-images-to-jpg" >}})
- [Convert a PDF File to PNG or JPG With Imagemagick on Mac]({{< relref "convert-a-pdf-file-to-png-or-jpg-with-imagemagick-on-mac" >}})
