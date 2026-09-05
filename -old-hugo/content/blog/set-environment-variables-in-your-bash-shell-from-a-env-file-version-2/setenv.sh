#!/usr/bin/env bash

# Show env vars
grep -v '^#' .env

# Export env vars
set -o allexport
source .env
set +o allexport
