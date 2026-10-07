#!/bin/bash
cd /home/user/epiccoffebattle && python3 -m http.server 8765 >/dev/null 2>&1 & SP=$!
sleep 1; cd /tmp/claude-0/-home-user-epiccoffebattle/b216fc92-96f7-51b7-b764-c788ff1bde6f/scratchpad/; "$@"; R=$?; kill $SP; exit $R
