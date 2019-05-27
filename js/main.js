const PUBLIC_GCAL_API_KEY = "AIzaSyC02W8pskb4c54YeTJ2y3QSsgOiMOIpY2M"; // running this on your own domain? you'll need your own key.
const GCAL_FETCH_HOURS_LIMIT = 24; // hours to look forward when fetching from Google Calendar
const FETCH_INTERVAL = 15 * 60 * 1000; // fetch updates every 15 minutes

var defaultUrl, 
    sheetId, 
    calendarId,
    scrolling, 
    scheduledEntries,
    nextTimeout,
    iframe;

init();
$(start);

function init(){
    let params = new URLSearchParams(window.location.search);
    defaultUrl = params.get('default') ? decodeURI(params.get('default')) : null;
    sheetId = params.get('sheet');
    calendarId = params.get('calendar');
    scrolling = params.get('scroll');

    document.getElementById('default').value = defaultUrl;
    document.getElementById('sheet').value = sheetId;
    document.getElementById('calendar').value = calendarId;
    document.getElementById('scroll').value = scrolling || 'no';

    if(!defaultUrl || (!sheetId && !calendarId)){
        document.body.classList.remove('active');
    }
}

function start(){
    if(defaultUrl && (sheetId || calendarId)){
        iframe = document.createElement('iframe');
        iframe.scrolling = scrolling;
        document.body.appendChild(iframe);

        fetchSchedule();
        setInterval(fetchSchedule, FETCH_INTERVAL);
    }    
}

function updateContent(){
    if(nextTimeout) clearTimeout(nextTimeout);
    const now = (new Date()).getTime();
    let currentEntry = {
        start: 0
    };
    let nextUpdateTime;
    for(let i = 0; i < scheduledEntries.length; i++){
        const entry = scheduledEntries[i];
        if(entry.start <= now && entry.start > currentEntry.start && (!entry.end || entry.end >= now)){
            currentEntry = entry;
            if(scheduledEntries[i + 1]){
                nextUpdateTime = scheduledEntries[i + 1].start;
            }
        }
    }
    if(currentEntry.end && currentEntry.end < nextUpdateTime){
        nextUpdateTime = currentEntry.end;
    }
    iframe.src = currentEntry.url || defaultUrl;
    if(nextUpdateTime){
        nextTimeout = setTimeout(updateContent, nextUpdateTime - now);
    }
}

function fetchSchedule(){
    const minEnd = new Date();
    let maxStart = new Date(); 
    maxStart.setHours(maxStart.getHours() + GCAL_FETCH_HOURS_LIMIT);
    const fetches = [];
    if(calendarId){
        fetches.push(getCalendar(minEnd, maxStart));
    }
    if(sheetId){
        fetches.push(getSheet(minEnd, maxStart));
    }
    Promise.all(fetches).then(function(entries){
        scheduledEntries = entries.flat().sort(function(a, b) {
            return a.start - b.start;
        });
        console.log(minEnd.getTime(), 'scheduled entries', scheduledEntries);
        updateContent();
    });
}

function getCalendar(minEnd, maxStart){
    const url = "https://www.googleapis.com/calendar/v3/calendars/" + calendarId 
        + "/events?key=" + PUBLIC_GCAL_API_KEY 
        + "&orderBy=startTime&singleEvents=true"
        + "&timeMin=" + minEnd.toISOString()
        + "&timeMax=" + maxStart.toISOString();
    return $.getJSON(url).then(function(data) {
        return data.items.map(function(entry){
           return {
               start: Date.parse(entry.start.dateTime || entry.start.date),
               end:  Date.parse(entry.end.dateTime || entry.end.date),
               url: entry.summary
           }
        });
    });
}

function getSheet(minEnd, maxStart){
    const url = "https://spreadsheets.google.com/feeds/list/" + sheetId + "/1/public/values?alt=json-in-script&callback=?";
    return $.getJSON(url).then(function(data) {
        return data.feed.entry.map(function(entry){
            return {
                start: Date.parse(entry['gsx$start']['$t']),
                url: ['gsx$url']['$t']
            };
        }).filter(function(entry){
            return entry.start <= maxStart.getTime()
        });
    });
}