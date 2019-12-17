if ( window.addEventListener ) { // W3C DOM 지원 브라우저 
window.addEventListener("load", checkBrowser, false);
} else if ( window.attachEvent ) { // W3C DO M 지원 브라우저 외(ex:MSDOM 지원 브라우저 IE)
window.attachEvent("onload", checkBrowser);
} else {
window.onload = checkBrowser;
}

function checkBrowser() {
  const userAgent = navigator.userAgent.toLowerCase(); 
  const isChrome = userAgent.indexOf('chrome');
  const isEdge = userAgent.indexOf('edge');
  if (isChrome < 0 || isEdge > -1) {
    document.getElementById('root').classList.add('none');
    document.getElementById('error').classList.remove('none');
  } else {
    document.getElementById('error').classList.add('none');
  }
};