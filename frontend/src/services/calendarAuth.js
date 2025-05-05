const CLIENT_ID = "191876397340-utstac6rfsros92b4a3uvlhrs09f2s1g.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

let tokenClient;

export function initGapi() {
  tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: (tokenResponse) => {
      localStorage.setItem("access_token", tokenResponse.access_token);
    },
  });
}

export function signInWithGoogle() {
  return new Promise((resolve, reject) => {
    if (tokenClient) {
      tokenClient.callback = (resp) => {
        if (resp && resp.access_token) {
          localStorage.setItem("access_token", resp.access_token);
          resolve(resp.access_token);
        } else {
          reject("Failed to get access token");
        }
      };
      tokenClient.requestAccessToken();
    } else {
      reject("Google client not initialized.");
    }
  });
}

export async function createCalendarEvent(event) {
  const accessToken = localStorage.getItem("access_token");

  const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      summary: event.title,
      description: event.description,
      start: {
        dateTime: event.start,
        timeZone: "America/Chicago",
      },
      end: {
        dateTime: event.end,
        timeZone: "America/Chicago",
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create calendar event");
  }

  return response.json();
}