#!/bin/bash

export PATH=/opt/IBM/node-v6.7.0/bin:$PATH
export PROJECT_NAME="${CF_APP}"

echo "BUILD STATUS: $BUILD_STATUS"
echo "Sending email notification to: $RECIPIENT_ADDRESS"
node mailer.js
