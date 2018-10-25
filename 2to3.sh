#!/bin/bash

RED=$'\e[0;31m'
GREEN=$'\e[1;32m'
YELLOW=$'\e[1;33m'
WHITE=$'\e[0m'

# Used to count the number of successful conversions

SUCCESS=0
UNSUCCESS=0

PYTHONFILES=$(find . -name "*.py" -type f)

# Converts all python files

for i in $PYTHONFILES
do
  if 2to3 -w $i > /dev/null 2>&1; then
    echo $GREEN ✓ $i Converted $WHITE
    (( SUCCESS=SUCCESS+1 ))
  else
    echo $RED ❌ $i Could not be Converted $WHITE
    echo ''
    echo $YELLOW Output: $WHITE
    2to3 -w $i
    echo ''
    (( UNSUCCESS=UNSUCCESS+1 ))
  fi
done

# Outputs how successful the conversions were

echo ''
if [ "${SUCCESS}" -gt 0 ] && [ "${UNSUCCESS}" != 0 ]; then
  echo $GREEN $SUCCESS Successful Conversions $WHITE
  echo $RED $UNSUCCESS Unsucessful Conversions $WHITE
fi
if [ "${SUCCESS}" == 0 ]; then
  echo $RED No Successful Conversions $WHITE
fi
if [ "${UNSUCCESS}" == 0 ]; then
  echo $GREEN All Conversions Successful $WHITE
fi
echo ''