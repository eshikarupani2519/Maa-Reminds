require('dotenv').config();
const cron = require('node-cron');
const moment = require('moment'); // Make sure this is present and correct
const sendSMS = require('./utils/sendSMS');
const User = require('./models/User');
const mongoose = require('mongoose'); // Import mongoose to use the connection

// Note: We are assuming mongoose.connect() is called in server.js,
// and the models are available.

// Schedule the task to run every minute
// The cron job will look for pills that are due within the next 5 minutes
cron.schedule('* * * * *', async () => {
    console.log('Running pill reminder check...');
    try {
        // Find users with pills and populate the pills subdocument
        const users = await User.find({});

        const now = moment();
        const reminderBufferInMinutes = 5; // Send a reminder 5 minutes before the scheduled time

        for (const user of users) {
            for (const pill of user.pills) {

                // Check if the pill is within the active date range
                const isWithinDateRange = now.isBetween(moment(pill.startDate).startOf('day'), moment(pill.endDate).endOf('day'), null, '[]');
                if (!isWithinDateRange) {
                    continue;
                }

                // Parse the pill timing (e.g., '04:25')
                const [pillHour, pillMinute] = pill.timing.split(':').map(Number);
                const pillTimeMoment = moment().set({ hour: pillHour, minute: pillMinute, second: 0, millisecond: 0 });

                // Define the reminder window
                const reminderWindowStart = moment(pillTimeMoment).subtract(reminderBufferInMinutes, 'minutes');
                const reminderWindowEnd = moment(pillTimeMoment);

                // Check if the current time is within the reminder window
                const isTimeForReminder = now.isBetween(reminderWindowStart, reminderWindowEnd, null, '[]');

                // Check if a reminder has already been sent today
                const hasReminderBeenSentToday = pill.lastNotificationSentDate &&
                    moment(pill.lastNotificationSentDate).isSame(now, 'day');

                if (isTimeForReminder && !hasReminderBeenSentToday) {
                    console.log(`Pill reminder for ${user.fullName}: ${pill.pillName} is approaching.`);

                    const smsBody = `💊 Reminder: Take your ${pill.pillName} ${pill.beforeAfterMeal} a meal at ${pill.timing}.`;

                    // Send the SMS
                    try {
                        await sendSMS(user.phone.toString(), pill.pillName, pill.timing, pill.beforeAfterMeal);

                        // Update the lastNotificationSentDate to prevent duplicate reminders
                        pill.lastNotificationSentDate = now.toDate();
                        await user.save();
                        console.log(`Reminder SMS sent and database updated for ${user.phone}`);
                    } catch (error) {
                        console.error('Error sending SMS:', error);
                    }
                }
            }
        }
    } catch (err) {
        console.error('Error in cron job:', err);
    }
});

console.log('Pill reminder scheduler started. It will run every minute.');