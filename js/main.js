var params = new URLSearchParams(window.location.search);
var defaultUrl = params.get('default') ? decodeURI(params.get('default')) : null;
var sheetId = params.get('id');
var scrolling = params.get('scroll');

var iframe;

document.getElementById('default').value = defaultUrl;
document.getElementById('id').value = sheetId;
document.getElementById('scroll').value = scrolling || 'no';

if(!defaultUrl || !sheetId){
    document.body.classList.remove('active');
}

$(function(){
    if(defaultUrl && sheetId){
        iframe = document.createElement('iframe');
        iframe.scrolling = scrolling;

        var jsonUrl = "https://spreadsheets.google.com/feeds/list/" + sheetId + "/1/public/values?alt=json-in-script&callback=?";
        $.getJSON(jsonUrl, function(data) {
            var entries = data.feed.entry.map(function(entry){
                return {
                    start: Date.parse(entry['gsx$start']['$t']),
                    url: ['gsx$url']['$t']
                }
            });
            console.log(entries);
            iframe.src = defaultUrl;
            document.body.appendChild(iframe);
        });
    }    
});