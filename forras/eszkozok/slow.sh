#!/bin/bash
for it in "$@"; do IFS=: read ty sk n <<<"$it"; NODE_PATH=$(npm root -g) timeout 150 node lt3.js $ty $sk ${n:-8} >/dev/null 2>&1 &
 while [ $(jobs -r | wc -l) -ge 4 ]; do sleep 1; done; done; wait
