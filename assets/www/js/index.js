/*********************************************************************************
  Application code
**********************************************************************************/
var dopreload = true;
var minsplasscreenseconds = 2;
var maxsplasscreenseconds = 10;
var gotourl = 'https://clubcentives.com/mobile';
var alreadycalled = false;
var starttime = 0;

/*******************************
 Queue the preload to happen
********************************/
$(function(){

  // log our start time
  starttime = (new Date()).getTime();

  if (dopreload) {
  
	// dynamically create an iframe to preload the javascript files, css files, and images that we'll use on the first actual page of our app  
	var d = document;
	var iframe = $('#app')[0].appendChild(d.createElement('iframe'));
	iframe.style.cssText = "display:none";
	
	// receive the a loading message from the iframe even though it's cross-domain using the new html5 window.postMessage functionality
	var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
	var eventer = window[eventMethod];
	var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
	eventer(messageEvent, function(e) {
		preloadComplete(); // while e.data contains the message, we don't care about specifics
	}, false);
  
	// tell the iframe to load the preload page, which will actually do the preloading on our behalf without causing the loading page to block (not display) while the preloading happens
	window.setTimeout(function(){  
	 var doc = iframe.contentWindow.document;
	 //var html = '<body onload="window.location=\'preload.html\'"></body>';
	 var html = '<body onload="window.location=\''+gotourl+'\'"></body>';
	 doc.open();
	 doc.write(html);
	 doc.close();
	}, 500);
	
	// just in case we never hear back from the iframe that loading has completed, move on to our application start page after the max number of seconds has been completed
	window.setTimeout(preloadComplete, maxsplasscreenseconds*1000); 
  }
  else {
  	starttime = starttime+(minsplasscreenseconds*1000);
	preloadComplete();	 
  }
});

/**********************************************************************************************************
 Move on to the main page now that the preload is complete (or after a certain max # of seconds has passed)
**********************************************************************************************************/
function preloadComplete()
{	
	// don't proceed if we've been told not to
    if (window.location.href.indexOf('noconnect') > 0) {
    	return true;
    }
    
    // make sure that this function is only called once
    if (alreadycalled) {
		return true;
	}
	alreadycalled = true;	
	
	// move on to the next page... load it via ajax instead of via window.location so that we can show a friendly error message just in case we couldn't retrieve the page
	$.ajax({
		url: gotourl,
		dataType: 'text',
		async: false,
		timeout:8000,
		success: function(html) {
			var elapsed = (new Date()).getTime() - starttime;
			window.setTimeout(function(){
				document.open();
			    document.write(html);
			    document.close();
			}, elapsed > (minsplasscreenseconds*1000) ? 0 : (minsplasscreenseconds*1000) - elapsed);            	
		},
		error: function(request, text) {
			$('#app').html('<div>Unable not connect to the CLUBCentives server. Please ensure that your phone has Internet connectivity.</div>');
		}
	});
};