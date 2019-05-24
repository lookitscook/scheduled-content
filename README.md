# Scheduled Content
Schedule the display of a set of URLs via a public Google Sheet.

## Settings

- **Default URL** will be used when no other content is schedule for this time. Required.
- **Google Sheet ID** the ID of the publicly published Google Sheet.
- **Scrollable?** determines whether scrollbars may be displayed on the scheduled content.

## Use

1. Creat a Google Sheet with "start" and "url" columns. e.g. [https://docs.google.com/spreadsheets/d/17eiV1NY78hISTCsygjlXGPw9G6v75yTB5vB0IzRvmjA/edit?usp=sharing](https://docs.google.com/spreadsheets/d/17eiV1NY78hISTCsygjlXGPw9G6v75yTB5vB0IzRvmjA/edit?usp=sharing)
2. Publicly publish the Google Sheet: [https://support.google.com/docs/answer/183965?co=GENIE.Platform%3DDesktop&hl=en](https://support.google.com/docs/answer/183965?co=GENIE.Platform%3DDesktop&hl=en)
3. Copy the ID of the Google Sheet. In the example above it is `17eiV1NY78hISTCsygjlXGPw9G6v75yTB5vB0IzRvmjA`
4. Fill out this form with the appropriate values.
5. Use the generated URL as the content of your kiosk or display.

## Notes

Google Sheet will be polled every 10 minutes to check for updates.