var params = new URLSearchParams(window.location.search);
var defaultUrl = params.get('default') ? decodeURI(params.get('default')) : null;
var sheetId = params.get('id');
var scrolling = params.get('scroll');

var iframe;

document.getElementById('default').value = defaultUrl;
document.getElementById('id').value = sheetId;
document.getElementById('scroll').value = scrolling || 'no';

if(defaultUrl && sheetId){
    // load the specific content
    document.body.classList.add('active');
s
    iframe = document.createElement('iframe');
    iframe.src = defaultUrl;
    iframe.scrolling = scrolling;
    document.body.appendChild(iframe);
}
