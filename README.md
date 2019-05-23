# Schedule Content
Schedule the display of a set of URLs via Google Sheets.

## Settings

- **Default URL** will be used when no other content is schedule for this time. Required.
- **iCal URL** a public URL to a calendar (e.g. Google Calendar). Event titles must be the desired URLs.
- **CSV URL** public CSV URL. It should have two columns: "Start", and "URL" with headers included. "Start" must be a parseable datetime format. If both iCal and CSV URLs are specified, iCal will be used.
- **Allow Scrolling?** determines whether scrollbars may be displayed on the scheduled content.

## Notes

iCal and CSV URLs will be polled every 10 minutes to check for updates.