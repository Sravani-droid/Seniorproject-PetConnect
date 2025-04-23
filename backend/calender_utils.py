from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from datetime import datetime, timedelta

def create_event(token, summary, description, start_time, duration_minutes=30):
    creds = Credentials.from_authorized_user_info(token)
    service = build("calendar", "v3", credentials=creds)

    event = {
        "summary": summary,
        "description": description,
        "start": {
            "dateTime": start_time,
            "timeZone": "America/Chicago",
        },
        "end": {
            "dateTime": (datetime.fromisoformat(start_time) + timedelta(minutes=duration_minutes)).isoformat(),
            "timeZone": "America/Chicago",
        },
    }

    event = service.events().insert(calendarId="primary", body=event).execute()
    return event.get("htmlLink")
