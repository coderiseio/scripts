#!/bin/bash

export PATH=/opt/IBM/node-v6.7.0/bin:$PATH

echo "BUILD STATUS: $BUILD_STATUS"
echo "Sending email notifications to: $RECIPIENT_ADDRESS"
npm install nodemailer
node mailer.js
