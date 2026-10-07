#!/bin/bash
for it in "$@"; do IFS=: read ty sk n <<<"$it"; NODE_PATH=$(npm root -g) timeout 200 node lt5w.js $ty $sk ${n:-16} >/dev/null 2>&1 &
 while [ $(jobs -r | wc -l) -ge 4 ]; do sleep 1; done; done; wait
