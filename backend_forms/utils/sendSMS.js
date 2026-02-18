
require('dotenv').config();
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);


function sendSMS(to, pillName, timing, beforeAfterMeal) {
  client.messages
    .create({
      body: `💊 Reminder: Take your ${pillName} at ${timing} (${beforeAfterMeal} meal)`,
      from: `+16202548366`, 
      to:` +91${to}  `      
    })
    .then(message => console.log('SMS sent:', message.sid))
    .catch(err => console.error('SMS error:', err));
}

module.exports = sendSMS;