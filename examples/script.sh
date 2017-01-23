#!/bin/bash

RANDOM_SEED=1

function random_status_string() {
  RANDOM=$((RANDOM_SEED++))
  r=$((RANDOM%3))
  if [ $r -eq 0 ]; then
    RAND_STATUS="OK"
  elif [ $r -eq 1 ]; then
    RAND_STATUS="WARNING"
  else
    RAND_STATUS="CRITICAL"
  fi
  echo $RAND_STATUS
}

function random_number() {
  RANDOM=$((RANDOM_SEED++))
  limit=$1
  echo $((RANDOM%limit))
}

cat << JSON 
{
  "procRate" : {
    "description": "Event processing rate",
    "value": $(random_number 1500),
    "low-warning": 100,
    "low-critical": 20,
    "high-warning": 400,
     "high-critical": 1000
  },
  "CPU": {
    "description": "CPU",
    "value": $(random_number 100),
    "high-warning": 60,
    "high-critical": 85
  },
  "HC" : {
    "description": "Health check",
    "status": "$(random_status_string)"
  },
  "HC2" : {
    "description": "Health check 2",
    "status": "$(random_status_string)"
    },
  "HC3" : {
    "description": "Health check 3",
    "status": "$(random_status_string)"
  },
  "HC4" : {
    "description": "Health check 4",
    "status": "$(random_status_string)"
  },
  "HC5" : {
    "description": "Health check 5",
    "status": "$(random_status_string)"
  },
  "HC6" : {
    "description": "Health check 6",
    "status": "$(random_status_string)"
  },
  "HC7" : {
    "description": "Health check 7",
    "status": "$(random_status_string)"
  },
  "IHC" : {
    "description": "Integrated Health check",
    "value": $(random_number 18),
    "high-warning": 12,
    "high-critical": 15
  }
}
JSON
