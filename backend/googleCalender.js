const { google } = require("googleapis");
const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const calendar = google.calendar("v3");

async function createCalendarEvent(auth, eventDetails) {
  const calendarClient = google.calendar({ version: "v3", auth });

  const event = {
    summary: eventDetails.summary,
    description: eventDetails.description,
    start: { dateTime: eventDetails.start, timeZone: "America/Chicago" },
    end: { dateTime: eventDetails.end, timeZone: "America/Chicago" },
  };

  const response = await calendarClient.events.insert({
    calendarId: "primary",
    resource: event,
  });

  return response.data;
}

module.exports = { createCalendarEvent };
