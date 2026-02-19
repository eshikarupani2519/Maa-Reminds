// // require('dotenv').config();
// // require('./config/db'); // Ensure the database connection is established
// // const cron = require('node-cron');
// // const moment = require('moment'); // Make sure this is present and correct
// // const sendSMS = require('./utils/sendSMS');
// // const User = require('./models/User');
// // const mongoose = require('mongoose'); // Import mongoose to use the connection


// // cron.schedule('* * * * *', async () => {
// //     console.log('Running pill reminder check...');
// //     try {
// //         // Find users with pills and populate the pills subdocument
// //         const users = await User.find({});
// //         console.log(users.length, 'users found for reminder check.');

// //         const now = moment();
// //         const reminderBufferInMinutes = 5; // Send a reminder 5 minutes before the scheduled time

// //         for (const user of users) {
// //             for (const pill of user.pills) {

// //                 // Check if the pill is within the active date range
// //                 const isWithinDateRange = now.isBetween(moment(pill.startDate).startOf('day'), moment(pill.endDate).endOf('day'), null, '[]');
// //                 if (!isWithinDateRange) {
// //                     continue;
// //                 }

// //                 // Parse the pill timing (e.g., '04:25')
// //                 const [pillHour, pillMinute] = pill.timing.split(':').map(Number);
// //                 const pillTimeMoment = moment().set({ hour: pillHour, minute: pillMinute, second: 0, millisecond: 0 });

// //                 // Define the reminder window
// //                 const reminderWindowStart = moment(pillTimeMoment).subtract(reminderBufferInMinutes, 'minutes');
// //                 const reminderWindowEnd = moment(pillTimeMoment);

// //                 // Check if the current time is within the reminder window
// //                 const isTimeForReminder = now.isBetween(reminderWindowStart, reminderWindowEnd, null, '[]');

// //                 // Check if a reminder has already been sent today
// //                 const hasReminderBeenSentToday = pill.lastNotificationSentDate &&
// //                     moment(pill.lastNotificationSentDate).isSame(now, 'day');

// //                 if (isTimeForReminder && !hasReminderBeenSentToday) {
// //                     console.log(`Pill reminder for ${user.fullName}: ${pill.pillName} is approaching.`);

// //                     const smsBody = `💊 Reminder: Take your ${pill.pillName} ${pill.beforeAfterMeal} a meal at ${pill.timing}.`;

// //                     // Send the SMS
// //                     try {
// //                         console.log("in sms route");
// //                         // sendSMS(user.phone.toString(),smsBody); 
// //                         await sendSMS(
// //   user.phone.toString(),
// //   pill.pillName,
// //   pill.timing,
// //   pill.beforeAfterMeal
// // );


// //                         // Update the lastNotificationSentDate to prevent duplicate reminders
// //                         pill.lastNotificationSentDate = now.toDate();
// //                         await user.save();
// //                         console.log(`Reminder SMS sent and database updated for ${user.phone}`);
// //                         console.log("NOW:", now.format("HH:mm"));
// // console.log("PILL TIME:", pill.timing);
// // console.log("WINDOW START:", reminderWindowStart.format("HH:mm"));
// // console.log("WINDOW END:", reminderWindowEnd.format("HH:mm"));
// // console.log("isTimeForReminder:", isTimeForReminder);

// //                     } catch (error) {
// //                         console.error('Error sending SMS:', error);
// //                     }
// //                 }
// //             }
// //         }
// //     } catch (err) {
// //         console.error('Error in cron job:', err);
// //     }
// // });

// // console.log('Pill reminder scheduler started. It will run every minute.');

// require('dotenv').config();
// require('./config/db');

// const cron = require('node-cron');
// const moment = require('moment-timezone'); // IMPORTANT: timezone version
// const sendSMS = require('./utils/sendSMS');
// const User = require('./models/User');

// console.log('Pill reminder scheduler started. It will run every minute.');

// cron.schedule('* * * * *', async () => {
//     console.log('\nRunning pill reminder check...');

//     try {
//         const users = await User.find({});
//         console.log(users.length, 'users found for reminder check.');

        
//         const now = moment().tz("Asia/Kolkata");

//         const reminderBufferInMinutes = 5;
//         const appointmentBufferDays = 1; 

//         for (const user of users) {
//             for (const pill of user.pills) {

//                 // 1️⃣ Check date range
//                 const isWithinDateRange = now.isBetween(
//                     moment(pill.startDate).startOf('day'),
//                     moment(pill.endDate).endOf('day'),
//                     null,
//                     '[]'
//                 );

//                 if (!isWithinDateRange) {
//                     console.log("Skipped - Not in date range");
//                     continue;
//                 }

//                 // 2️⃣ Parse pill timing
//                 const [pillHour, pillMinute] = pill.timing.split(':').map(Number);

//                 const pillTimeMoment = moment().tz("Asia/Kolkata").set({
//                     hour: pillHour,
//                     minute: pillMinute,
//                     second: 0,
//                     millisecond: 0
//                 });

//                 // 3️⃣ Define reminder window
//                 const reminderWindowStart = moment(pillTimeMoment)
//                     .subtract(reminderBufferInMinutes, 'minutes');

//                 const reminderWindowEnd = moment(pillTimeMoment);

//                 // 4️⃣ Check if within time window
//                 const isTimeForReminder = now.isBetween(
//                     reminderWindowStart,
//                     reminderWindowEnd,
//                     null,
//                     '[]'
//                 );

//                 // 5️⃣ Check if already sent today
//                 const hasReminderBeenSentToday =
//                     pill.lastNotificationSentDate &&
//                     moment(pill.lastNotificationSentDate).isSame(now, 'day');

//                 // 🔎 DEBUG LOGS (ALWAYS RUN)
//                 // console.log("----- DEBUG -----");
//                 // console.log("NOW:", now.format("YYYY-MM-DD HH:mm:ss"));
//                 // console.log("PILL TIME:", pill.timing);
//                 // console.log("WINDOW START:", reminderWindowStart.format("HH:mm"));
//                 // console.log("WINDOW END:", reminderWindowEnd.format("HH:mm"));
//                 // console.log("isTimeForReminder:", isTimeForReminder);
//                 // console.log("hasReminderBeenSentToday:", hasReminderBeenSentToday);
//                 // console.log("------------------");

//                 // 6️⃣ Send reminder
//                 if (isTimeForReminder && !hasReminderBeenSentToday) {
//                     console.log(`Sending reminder to ${user.phone}`);

//                     try {
//                         await sendSMS(
//                             user.phone.toString(),
//                             pill.pillName,
//                             pill.timing,
//                             pill.beforeAfterMeal
//                         );

//                         pill.lastNotificationSentDate = now.toDate();
//                         await user.save();

//                         console.log("✅ SMS sent and DB updated successfully");
//                     } catch (error) {
//                         console.error("❌ Error sending SMS:", error);
//                     }
//                 }

//          for (const appt of user.appointments) {
//                 if (!appt.dateTime) continue; // skip if no date/time
//                 const apptMoment = moment(appt.dateTime).tz("Asia/Kolkata");
//                 const reminderTime = apptMoment.clone().subtract(appointmentBufferDays, 'days');
//                 const isTimeForReminder = now.isBetween(reminderTime, reminderTime.clone().add(1, 'minutes')); // 1-min window

//                 // Check if reminder already sent
//                 if (isTimeForReminder && !appt.lastNotificationSentDate) {
//                     const message = `📅 Reminder: You have an appointment '${appt.title}' scheduled at ${apptMoment.format('YYYY-MM-DD HH:mm')}.`;
//                     try {
//                         await sendSMS(user.phone.toString(), appt.title || 'Appointment', apptMoment.format('HH:mm'), ''); // no meal info
//                         appt.lastNotificationSentDate = now.toDate();
//                         await user.save();
//                         console.log(`✅ Appointment reminder sent to ${user.phone}`);
//                     } catch (err) {
//                         console.error('❌ Error sending appointment SMS:', err);
//                     }
//                 }
//             }

//         }
        
//     } catch (err) {
//         console.error('❌ Error in cron job:', err);
//     }
// });
require('dotenv').config();
require('./config/db');

const cron = require('node-cron');
const moment = require('moment-timezone'); // timezone aware
const sendSMS = require('./utils/sendSMS');
const User = require('./models/User');

console.log('Reminder scheduler started. It will run every minute.');

cron.schedule('* * * * *', async () => {
    console.log('\nRunning reminder check...');

    try {
        const users = await User.find({});
        console.log(users.length, 'users found for reminder check.');

        const now = moment().tz("Asia/Kolkata");

        const pillBufferMinutes = 5;        // 5 min before pills
        const appointmentBufferDays = 1;    // 1 day before appointments

        for (const user of users) {

            // ---- PILL REMINDERS ----
            for (const pill of user.pills) {
                const isWithinDateRange = now.isBetween(
                    moment(pill.startDate).startOf('day'),
                    moment(pill.endDate).endOf('day'),
                    null,
                    '[]'
                );
                if (!isWithinDateRange) continue;

                const [pillHour, pillMinute] = pill.timing.split(':').map(Number);
                const pillTimeMoment = moment().tz("Asia/Kolkata").set({
                    hour: pillHour,
                    minute: pillMinute,
                    second: 0,
                    millisecond: 0
                });

                const reminderWindowStart = pillTimeMoment.clone().subtract(pillBufferMinutes, 'minutes');
                const reminderWindowEnd = pillTimeMoment;
                const isTimeForReminder = now.isBetween(reminderWindowStart, reminderWindowEnd, null, '[]');

                const hasReminderBeenSentToday =
                    pill.lastNotificationSentDate &&
                    moment(pill.lastNotificationSentDate).isSame(now, 'day');

                if (isTimeForReminder && !hasReminderBeenSentToday) {
                    try {
                        await sendSMS(
                            user.phone.toString(),
                            pill.pillName,
                            pill.timing,
                            pill.beforeAfterMeal
                        );
                        pill.lastNotificationSentDate = now.toDate();
                        await user.save();
                        console.log(`✅ Pill reminder sent to ${user.phone}`);
                    } catch (error) {
                        console.error("❌ Error sending pill SMS:", error);
                    }
                }
            }

            // ---- APPOINTMENT REMINDERS ----
            for (const appt of user.appointments) {
                if (!appt.dateTime) continue; // skip if no date/time

                const apptMoment = moment(appt.dateTime).tz("Asia/Kolkata");
                const reminderTime = apptMoment.clone().subtract(appointmentBufferDays, 'days');

                // 1-minute window for sending reminder
                const isTimeForReminder = now.isBetween(reminderTime, reminderTime.clone().add(1, 'minutes'));

                if (isTimeForReminder && !appt.lastNotificationSentDate) {
                    const message = `📅 Reminder: You have an appointment '${appt.title || 'Appointment'}' scheduled at ${apptMoment.format('YYYY-MM-DD HH:mm')}.`;
                    try {
                        await sendSMS(
                            user.phone.toString(),
                            appt.title || 'Appointment',
                            apptMoment.format('HH:mm'),
                            '' // no meal info for appointments
                        );
                        appt.lastNotificationSentDate = now.toDate();
                        await user.save();
                        console.log(`✅ Appointment reminder sent to ${user.phone}`);
                    } catch (err) {
                        console.error('❌ Error sending appointment SMS:', err);
                    }
                }
            }

        }

    } catch (err) {
        console.error('❌ Error in cron job:', err);
    }
});
