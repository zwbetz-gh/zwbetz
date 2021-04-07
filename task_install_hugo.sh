#!/usr/bin/env bash

usage="Usage:
  $0 <VERSION>"

if [[ -z $1 ]]; then
  echo "$usage"
  exit 1
fi

tmp_dir=/tmp/hugo
version=$1
tar=hugo_extended_${version}_Linux-64bit.tar.gz
url=https://github.com/gohugoio/hugo/releases/download/v${version}/${tar}

echo "Before:"
hugo version

mkdir -p $tmp_dir
pushd $tmp_dir >/dev/null

wget -q $url
tar xf $tar

chmod 755 hugo
cp hugo ~/bin

popd >/dev/null
rm -r $tmp_dir

echo "After:"
hugo version
