var params = new URLSearchParams(window.location.search);
var defaultUrl = params.get('default') ? decodeURI(params.get('default')) : null;
var icalUrl = params.get('ical') ? decodeURI(params.get('ical')) : null;
var csvUrl = params.get('csv') ? decodeURI(params.get('csv')) : null;
var scrolling = params.get('scroll');

var iframe;

document.getElementById('default').value = defaultUrl;
document.getElementById('ical').value = icalUrl;
document.getElementById('csv').value = csvUrl;
document.getElementById('scroll').value = scrolling || 'no';

if(defaultUrl && (icalUrl || csvUrl)){
    // load the specific content
    document.body.classList.add('active');

    iframe = document.createElement('iframe');
    iframe.src = defaultUrl;
    iframe.scrolling = scrolling;
    document.body.appendChild(iframe);
}
