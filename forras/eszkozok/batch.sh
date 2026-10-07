#!/bin/bash
# usage: batch.sh out_prefix "type:sk:t1,t2,t3" ...
P=$1;shift
for it in "$@"; do IFS=: read ty sk tm <<<"$it"; (NODE_PATH=$(npm root -g) timeout 120 node eatk.js $ty $sk $tm >/dev/null 2>&1; fs=""; for t in ${tm//,/ }; do fs="$fs hs/e_${ty}_${sk}_$t.png"; done; montage $fs -tile 3x -geometry 430x242+1+1 hs/row_${ty}_${sk}.png) & 
 while [ $(jobs -r | wc -l) -ge 5 ]; do sleep 1; done; done; wait
