# Scheduled Content
Schedule the display of a set of URLs via a public Google Sheet.

## Settings

- **Default URL** will be used when no other content is schedule for this time. Required.
- **Google Calendar ID** the ID of the publicly shared Google Calendar.
- **Google Sheet ID** the ID of the publicly published Google Sheet.
- **Scrollable?** determines whether scrollbars may be displayed on the scheduled content.

## Use

### Google Calendar

1. Create a new Google Calendar and set the visiblity settings to "See all event details" on "Make avaible to the public": [https://support.google.com/calendar/answer/37082?hl=en](https://support.google.com/calendar/answer/37082?hl=en)
2. Create events using the desired URL as the event title. e.g. [https://calendar.google.com/calendar/embed?src=cook.company_mlqfhsl5mo9na67sf3vno0fjt8%40group.calendar.google.com&ctz=America%2FChicago](https://calendar.google.com/calendar/embed?src=cook.company_mlqfhsl5mo9na67sf3vno0fjt8%40group.calendar.google.com&ctz=America%2FChicago)
3. Copy the ID of the Google Calendar. In the example above it is `cook.company_mlqfhsl5mo9na67sf3vno0fjt8%40group.calendar.google.com`
4. Fill out this form with the appropriate values.
5. Use the generated URL as the content of your kiosk or display.

### Google Sheets

1. Creat a Google Sheet with "start" and "url" columns. e.g. [https://docs.google.com/spreadsheets/d/17eiV1NY78hISTCsygjlXGPw9G6v75yTB5vB0IzRvmjA/edit?usp=sharing](https://docs.google.com/spreadsheets/d/17eiV1NY78hISTCsygjlXGPw9G6v75yTB5vB0IzRvmjA/edit?usp=sharing)
2. Publicly publish the Google Sheet: [https://support.google.com/docs/answer/183965?co=GENIE.Platform%3DDesktop&hl=en](https://support.google.com/docs/answer/183965?co=GENIE.Platform%3DDesktop&hl=en)
3. Copy the ID of the Google Sheet. In the example above it is `17eiV1NY78hISTCsygjlXGPw9G6v75yTB5vB0IzRvmjA`
4. Fill out this form with the appropriate values.
5. Use the generated URL as the content of your kiosk or display.

## Notes

1. You may use both Google Calendar and Google Sheets simultaneously. Schedules will be merged.
2. Your data sources will be polled every 15 minutes to check for updates. 
3. If you are using Google Calendar and hosting this application on your own domain you will need to generate a new pubic Google Calendar API key and modify the value in `main.js`.