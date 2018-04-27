var nodemailer = require("nodemailer");

var buildDisplayName = process.env.BUILD_DISPLAY_NAME
var gitBranch        = process.env.GIT_BRANCH
var gitCommit        = process.env.GIT_COMMIT
var pipelineId       = process.env.PIPELINE_ID
var senderAddress    = process.env.SENDER_ADDRESS
var recipientAddress = process.env.RECIPIENT_ADDRESS
var projectName      = process.env.PROJECT_NAME
var ibmUrl           = "https://console.bluemix.net/devops/pipelines/"

console.log(process.env)

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("smtps://" + process.env.EMAIL_ID + ":+encodeURIComponent('" + process.env.EMAIL_PWD + "') + "@smtp.gmail.com:465");

// setup e-mail data with unicode symbols
var mailOptions = {
    from: senderAddress, // sender address
    to: recipientAddress, // list of receivers
    subject: "[" + projectName + "] BUILD " + buildDisplayName + "(" + gitBranch + "-" + gitCommit + ")", // Subject line
    html: "<b>Project:" + projectName + "</b><br /><br /><b>Build " + buildDisplayName + ": PASSED</b><br /><br />LINK: " + ibmUrl + pipelineId + "?env_id=ibm:yp:us-south<br /><br />" // html body
}

// send mail with defined transport object
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    // if you don't want to use this transport object anymore, uncomment following line
    smtpTransport.close(); // shut down the connection pool, no more messages
});
