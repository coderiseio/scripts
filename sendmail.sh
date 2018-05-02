#!/bin/bash

echo "BUILD STATUS: $BUILD_STATUS"
echo "Sending email notifications to: $RECIPIENT_ADDRESS"
npm install nodemailer
node mailer.js
