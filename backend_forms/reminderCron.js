// require('dotenv').config();
// require('./config/db');

// const cron = require('node-cron');
// const moment = require('moment-timezone'); // timezone aware
// const sendSMS = require('./utils/sendSMS');
// const User = require('./models/User');

// console.log('Reminder scheduler started. It will run every minute.');

// cron.schedule('* * * * *', async () => {
//     console.log('\nRunning reminder check...');

//     try {
//         const users = await User.find({});
//         console.log(users.length, 'users found for reminder check.');

//         const now = moment().tz("Asia/Kolkata");

//         const pillBufferMinutes = 5;        // 5 min before pills
//         const appointmentBufferDays = 1;    // 1 day before appointments

//         for (const user of users) {

//             // ---- PILL REMINDERS ----
//             for (const pill of user.pills) {
//                 const isWithinDateRange = now.isBetween(
//                     moment(pill.startDate).startOf('day'),
//                     moment(pill.endDate).endOf('day'),
//                     null,
//                     '[]'
//                 );
//                 if (!isWithinDateRange) continue;

//                 const [pillHour, pillMinute] = pill.timing.split(':').map(Number);
//                 const pillTimeMoment = moment().tz("Asia/Kolkata").set({
//                     hour: pillHour,
//                     minute: pillMinute,
//                     second: 0,
//                     millisecond: 0
//                 });

//                 const reminderWindowStart = pillTimeMoment.clone().subtract(pillBufferMinutes, 'minutes');
//                 const reminderWindowEnd = pillTimeMoment;
//                 const isTimeForReminder = now.isBetween(reminderWindowStart, reminderWindowEnd, null, '[]');

//                 const hasReminderBeenSentToday =
//                     pill.lastNotificationSentDate &&
//                     moment(pill.lastNotificationSentDate).isSame(now, 'day');

//                 if (isTimeForReminder && !hasReminderBeenSentToday) {
//                     // const msgBody={
//                     //     pillName: pill.pillName,
//                     //     timing: pill.timing,
//                     //     beforeAfterMeal: pill.beforeAfterMeal

//                     // }

//                     const msgBody =
//                             `Reminder: Take your ${pill.pillName}
//                             Time: ${pill.timing}
//                             ${pill.beforeAfterMeal} Meal`;
//                     console.log("msg body in remindercron",msgBody);
//                     try {
//                         await sendSMS(
//                             user.phone.toString(),
//                             msgBody
//                         );
//                         pill.responseStatus = "pending";
//                         pill.lastReminderSent = now.toDate();

//                         await user.save();
//                             // pill.beforeAfterMeal
//                             console.log(`✅ Pill reminder sent`);
                        
//                         console.log(` Pill reminder sent to ${user.phone} for ${pill.pillName}`);
//                         console.log(pill.timing);
//                         console.log(pill.beforeAfterMeal);
//                         pill.lastNotificationSentDate = now.toDate();
//                         await user.save();
//                         console.log(`Pill reminder sent to ${user.phone}`);
//                     } catch (error) {
//                         console.error("Error sending pill SMS:", error);
//                     }
//                 }
//             }

//             // ---- APPOINTMENT REMINDERS ----
//             for (const appt of user.appointments) {
//                 if (!appt.dateTime) continue; // skip if no date/time

//                 const apptMoment = moment(appt.dateTime).tz("Asia/Kolkata");
//                 const reminderTime = apptMoment.clone().subtract(appointmentBufferDays, 'days');

//                 // 1-minute window for sending reminder
//                 const isTimeForReminder = now.isBetween(reminderTime, reminderTime.clone().add(1, 'minutes'));

//                 if (isTimeForReminder && !appt.lastNotificationSentDate) {
//                     const message = ` Reminder: You have an appointment '${appt.title || 'Appointment'}' scheduled at ${apptMoment.format('YYYY-MM-DD HH:mm')}.`;
//                     try {
//                         await sendSMS(
//                             user.phone.toString(),
//                             appt.title || 'Appointment',
//                             apptMoment.format('HH:mm'),
//                             '' // no meal info for appointments
//                         );
//                         appt.lastNotificationSentDate = now.toDate();
//                         await user.save();
//                         console.log(` Appointment reminder sent to ${user.phone}`);
//                     } catch (err) {
//                         console.error(' Error sending appointment SMS:', err);
//                     }
//                 }
//             }

//         }

//     } catch (err) {
//         console.error(' Error in cron job:', err);
//     }
// });

require('dotenv').config();
require('./config/db');

const cron = require('node-cron');
const moment = require('moment-timezone');
const sendSMS = require('./utils/sendSMS');
const User = require('./models/User');

console.log('Reminder scheduler started. Running every minute.');

cron.schedule('* * * * *', async () => {
  console.log('\nRunning reminder check...');

  try {
    const users = await User.find({});
    const now = moment().tz('Asia/Kolkata');
    const pillBufferMinutes = 5;

    for (const user of users) {

      /* ────────────────────────────────────────
         PILL REMINDERS
      ──────────────────────────────────────── */
      for (const pill of user.pills) {

        // 1. Auto-move expired pills → medicineHistory
        const pillEndDay = moment(pill.endDate).endOf('day');
        if (now.isAfter(pillEndDay)) {
          user.medicineHistory.push(pill.toObject());
          user.pills = user.pills.filter(
            p => p._id.toString() !== pill._id.toString()
          );
          await user.save();
          console.log(`📦 Pill "${pill.pillName}" moved to history for ${user.phone}`);
          continue; // skip reminder for expired pill
        }

        // 2. Check if within active date range
        const isWithinDateRange = now.isBetween(
          moment(pill.startDate).startOf('day'),
          moment(pill.endDate).endOf('day'),
          null,
          '[]'
        );
        if (!isWithinDateRange) continue;

        // 3. Parse timing (supports "HH:mm" or "HH:mm:ss")
        const [pillHour, pillMinute] = pill.timing.split(':').map(Number);
        const pillTimeMoment = moment().tz('Asia/Kolkata').set({
          hour: pillHour,
          minute: pillMinute,
          second: 0,
          millisecond: 0
        });

        const reminderWindowStart = pillTimeMoment.clone().subtract(pillBufferMinutes, 'minutes');
        const isTimeForReminder = now.isBetween(reminderWindowStart, pillTimeMoment, null, '[]');

        const hasReminderBeenSentToday =
          pill.lastNotificationSentDate &&
          moment(pill.lastNotificationSentDate).isSame(now, 'day');

        if (isTimeForReminder && !hasReminderBeenSentToday) {
          const msgBody = `Reminder: Take your ${pill.pillName}\nTime: ${pill.timing}\n${pill.beforeAfterMeal} Meal`;

          try {
            await sendSMS(user.phone.toString(), msgBody);
            pill.responseStatus = 'pending';
            pill.lastNotificationSentDate = now.toDate();
            await user.save();
            console.log(`✅ Pill reminder sent to ${user.phone} for ${pill.pillName}`);
          } catch (error) {
            console.error('Error sending pill SMS:', error);
          }
        }
      }

      /* ────────────────────────────────────────
         APPOINTMENT REMINDERS + AUTO-HISTORY MOVE
      ──────────────────────────────────────── */
      const activeAppointments = [];
      let appointmentsMoved = false;

      for (const appt of user.appointments) {
        if (!appt.date || !appt.time) {
          activeAppointments.push(appt);
          continue;
        }

        // Merge date + time properly
        const [hours, minutes] = appt.time.split(':').map(Number);
        const apptMoment = moment(appt.date).tz('Asia/Kolkata').set({
          hour: hours,
          minute: minutes,
          second: 0,
          millisecond: 0
        });

        // 1. Auto-move past appointments → appointmentHistory
        if (apptMoment.isBefore(now)) {
          user.appointmentHistory.push(appt.toObject());
          appointmentsMoved = true;
          console.log(`📅 Appointment "${appt.doctorName}" moved to history for ${user.phone}`);
          continue;
        }

        activeAppointments.push(appt);

        // 2. Send 1-day-before reminder
        const oneDayBefore = apptMoment.clone().subtract(1, 'day');
        const reminderWindowEnd = oneDayBefore.clone().add(1, 'minute');
        const isTimeForApptReminder = now.isBetween(oneDayBefore, reminderWindowEnd, null, '[]');

        if (isTimeForApptReminder && !appt.lastNotificationSentDate) {
          const msg = `Reminder: You have an appointment with Dr. ${appt.doctorName} tomorrow at ${appt.time}.\n${appt.notes ? 'Notes: ' + appt.notes : ''}`;

          try {
            await sendSMS(user.phone.toString(), msg);
            appt.lastNotificationSentDate = now.toDate();
            console.log(`✅ Appointment reminder sent to ${user.phone}`);
          } catch (err) {
            console.error('Error sending appointment SMS:', err);
          }
        }
      }

      if (appointmentsMoved) {
        user.appointments = activeAppointments;
        await user.save();
      }

    } // end users loop

  } catch (err) {
    console.error('Error in cron job:', err);
  }
});
