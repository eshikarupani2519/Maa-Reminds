
// // require('dotenv').config();
// // const twilio = require('twilio');

// // const accountSid = process.env.TWILIO_ACCOUNT_SID;
// // const authToken = process.env.TWILIO_AUTH_TOKEN;
// // const client = twilio(accountSid, authToken);


// // async function sendSMS(to, pillName, timing, beforeAfterMeal) {
// //   try {
// //     const message = await client.messages
// //       .create({
// //         body: `💊 Reminder: Take your ${pillName} at ${timing} (${beforeAfterMeal} meal)`,
// //         from: `+12765979099`,
// //         to: `+91${to}`
// //       });
// //     return console.log('SMS sent:', message.sid);
// //   } catch (err) {
// //     return console.error('SMS error:', err);
// //   }
// // }

// // module.exports = sendSMS;
// require('dotenv').config();
// const twilio = require('twilio');

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;

// const client = twilio(accountSid, authToken);

// async function sendSMS(to, pillName, timing, beforeAfterMeal) {
//     try {
//         const message = await client.messages.create({
//             body: `💊 Reminder: Take your ${pillName} at ${timing} (${beforeAfterMeal} meal)`,
//             from: '+12765979099', // your Twilio number
//             to: `+91${to}` // change country code if needed
//         });

//         console.log("SMS sent:", message.sid);
//     } catch (err) {
//         console.error("SMS error:", err.message);
//         throw err;
//     }
// }

// module.exports = sendSMS;

require('dotenv').config();
const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function sendSMS(to, messageBody) {
  console.log("ABOUT TO SEND SMS");
  try {
    const message = await client.messages.create({
      body: messageBody,
      from: '+12765979099',
      to: `+91${to}`
    });
    console.log("in sendsms function");
    console.log(messageBody);
    console.log(to);

    console.log("SMS sent:", message.sid);
    console.log("Status:", message.status);
    return message;

  } catch (err) {
    console.error("SMS error:", err.message);
    throw err;
  }
}

module.exports = sendSMS;