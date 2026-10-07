#!/bin/bash
for id in "$@"; do NODE_PATH=$(npm root -g) timeout 200 node sumshot.js $id 600,1000,1400,1800,2200,2600,3000,3400,3800,4200,4600,5200 >/dev/null 2>&1 &
done; wait
for id in "$@"; do montage $(ls hs/s_${id}_*.png | sort -t_ -k3 -n) -tile 4x -geometry 430x242+1+1 sv_$id.jpg; done
