const dotenv = require('dotenv').config();
const twilioSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;


const twilioClient = require('twilio')(twilioSid, authToken);

function sendMessage(message) {
    twilioClient.messages.create({
        to: process.env.MY_PHONE_NUMBER,
        from: process.env.TWILIO_PHONE_NUMBER,
        body: message
    }).then((message) => console.log("Twilio Message SID:" + message.sid));

}

const rp = require('request-promise');
const cheerio = require('cheerio');
var stringSimilarity = require('string-similarity');
const fs = require('fs');

const options = {
    uri: process.env.WEBSITE,
    transform: function (body) {
        return cheerio.load(body);
    }
};

rp(options)
    .then(($) => {
        let fetchedPage = $.html();

        console.log("File exists: " + fs.existsSync(process.env.WEB_MARKUP_PATH));
        if (fs.existsSync(process.env.WEB_MARKUP_PATH)) {

            var fileContent = fs.readFileSync(process.env.WEB_MARKUP_PATH, 'utf8');

            let similarity = stringSimilarity.compareTwoStrings(fileContent.toLowerCase(), fetchedPage.toLowerCase());

            if (similarity != 1) {
                console.log("There has been updates on the website")
                let smsmessage = `Something changed on ` + process.env.WEBSITE;
                sendMessage(smsmessage);
            }
        }

        fs.writeFile(process.env.WEB_MARKUP_PATH, $.html(), (err) => {
            if (err) throw err;
        })
        console.log('File saved');
    })
    .catch((err) => {
        console.log(err);
    });