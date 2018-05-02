var nodemailer = require("nodemailer");

var buildDisplayName = process.env.BUILD_DISPLAY_NAME
var gitBranch        = process.env.GIT_BRANCH
var gitCommit        = process.env.GIT_COMMIT
var gitUrl           = process.env.GIT_URLS
var pipelineId       = process.env.PIPELINE_ID
var senderAddress    = "equibit.builds@gmail.com"
var recipientAddress = process.env.RECIPIENT_ADDRESS
var projectName      = process.env.PROJECT_NAME
var buildStatus      = process.env.BUILD_STATUS
var ibmUrl           = "https://console.bluemix.net/devops/pipelines/"

console.log(process.env)

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("smtps://equibit.builds%40gmail.com:"+encodeURIComponent("" + process.env.EMAIL_PWD + "") + "@smtp.gmail.com:465");

// setup e-mail data with unicode symbols
var mailOptions = {
    from: senderAddress, // sender address
    to: recipientAddress, // list of receivers
    subject: "[ Build " + buildStatus  + "] on " + projectName + " " + buildDisplayName + " (" + gitBranch + ")", // Subject line
    html: "<b>Project: </b>" + projectName + "<br /><br /><b>Build: </b>" + buildDisplayName + "<br /><br /><b>Status: </b>" + buildStatus + "<br /><br /><b>Branch: </b>" + gitBranch + "<br /><br /><b>Commit: </b>"+ gitCommit +"<br/><br /><b>Repository: </b>"+ gitUrl +"<br/><br /><br /><b>For more detailed information, please use this link: </b>" + ibmUrl + pipelineId + "?env_id=ibm:yp:us-south<br /><br /><br />" // html body
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
