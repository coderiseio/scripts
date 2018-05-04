#!/bin/bash

set -ex

DEPLOY_RESULT="Success"
BUILD_RESULT=$(cat result.txt)
echo "$BUILD_RESULT"

if [ "$BUILD_RESULT" == "Success" ]
then
  cf push "${CF_APP}" -c "NODE_ENV=$BUILD_COMMAND" || {  DEPLOY_RESULT="Failed"; }
fi

if [ "$BUILD_RESULT" == "Success" ]
then
  export "BUILD_STATUS=$DEPLOY_RESULT"
  cd scripts && ./deploy-sendmail.sh
fi
