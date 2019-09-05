#!/usr/bin/env bash

usage="Usage:
  $0 <version>"

if [[ -z $1 ]]; then
  echo "$usage"
  exit 1
fi

version=$1
tar=hugo_extended_${version}_Linux-64bit.tar.gz
url=https://github.com/gohugoio/hugo/releases/download/v${version}/${tar}

echo "Before upgrade:"
hugo version

pushd /tmp >/dev/null
rm -r ./*
wget -q $url
tar xf $tar
chmod +x hugo
cp hugo ~/bin
popd >/dev/null

echo "After upgrade:"
hugo version
