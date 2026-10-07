#!/bin/bash
for it in "$@"; do IFS=: read ty sk tm <<<"$it"; (NODE_PATH=$(npm root -g) timeout 120 node eatk2.js $ty $sk $tm >/dev/null 2>&1; fs=""; for t in ${tm//,/ }; do fs="$fs hs/Z_${ty}_${sk}_$t.png"; done; montage $fs -tile 4x -geometry 560x380+1+1 hs/zrow_${ty}_${sk}.png) &
 while [ $(jobs -r | wc -l) -ge 4 ]; do sleep 1; done; done; wait
