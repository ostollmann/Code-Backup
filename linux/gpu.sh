#! /bin/bash

echo 'Getting GPU Info...'
echo '================== clock =================='
aticonfig --adapter=0 --od-getclocks
echo ''
echo '================== temp ==================='
aticonfig --adapter=0 --od-gettemperature
echo '==========================================='
