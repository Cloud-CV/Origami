#!/bin/bash

RED=$'\e[0;31m'
GREEN=$'\e[1;32m'
BLUE=$'\e[0;33m'
YELLOW=$'\e[1;33m'
WHITE=$'\e[0m'

# Used to count the number of successful conversions

SUCCESS=0
UNSUCCESS=0

PYTHONFILES=$(find . -name "*.py" -type f)

echo ''
read -p "$(echo -e $YELLOW"Do you want to convert all Python Files [y/n] "$WHITE)" CONVERTINPUT

if [ "${CONVERTINPUT,,}" = "y" ] || [ "${CONVERTINPUT,,}" = "yes" ]
then
  # Converts all python files
  for i in $PYTHONFILES
  do
    if 2to3 -w $i > /dev/null 2>&1; # No Output
    then
      echo $GREEN ✓ $i "Converted" $WHITE
      (( SUCCESS=SUCCESS+1 ))
    else
      echo $RED ❌ $i "Could not be Converted" $WHITE
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
    echo $GREEN $SUCCESS "Successful Conversions" $WHITE
    echo $RED $UNSUCCESS "Unsucessful Conversions" $WHITE
  fi
  if [ "${SUCCESS}" == 0 ]; then
    echo $RED "No Successful Conversions" $WHITE
  fi
  if [ "${UNSUCCESS}" == 0 ]; then
    echo $GREEN "All Conversions Successful" $WHITE
  fi
  echo ''

elif [ "${CONVERTINPUT,,}" = "n" ] || [ "${CONVERTINPUT,,}" = "no" ]
then
  echo "No Files Converted"
else
  echo "Invalid Input"
  echo "No Files Converted"
fi

BACKUPFILES=$(find . -name "*.py.bak" -type f)
DELETEDFILES=0

read -p "$(echo -e $YELLOW"Do you want to delete any Backup Files? [y/n] "$WHITE)" DELETEINPUT

if [ "${DELETEINPUT,,}" = "y" ] || [ "${DELETEINPUT,,}" = "yes" ]
then
  for i in $BACKUPFILES
  do
    echo  $BLUE "Deleting" $i $WHITE
    rm -rf $i # Deletes Backup Files
    (( DELETEDFILES=DELETEDFILES+1 ))
  done
elif [ "${DELETEINPUT,,}" = "n" ] || [ "${DELETEINPUT,,}" = "no" ]
then
  echo $BLUE "Backup Files Saved" $WHITE
else
  echo $RED "Invalid Input" $WHITE
fi

echo $GREEN $DELETEDFILES "Deleted" $WHITE # Outputs how many files were deleted
echo ''