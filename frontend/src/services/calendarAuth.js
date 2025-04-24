const CLIENT_ID = "693342524373-6mem1ididado33qq7npstrucdsgqm41l.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

export function initGapi() {
  return new Promise((resolve) => {
    window.gapi.load("client:auth2", async () => {
      await window.gapi.client.init({
        clientId: CLIENT_ID,
        scope: SCOPES,
      });
      resolve();
    });
  });
}

export async function signInWithGoogle() {
  const authInstance = window.gapi.auth2.getAuthInstance();
  const user = await authInstance.signIn();
  return user.getBasicProfile();
}

export async function createCalendarEvent(event) {
  return window.gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: {
      summary: event.title,
      description: event.description,
      start: { dateTime: event.start, timeZone: "America/New_York" },
      end: { dateTime: event.end, timeZone: "America/New_York" },
    },
  }).execute();
}