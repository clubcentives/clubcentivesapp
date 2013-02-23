/*********************************************************************************
  Application code
**********************************************************************************/
var minsplasscreenseconds = 5;
var gotourl = 'https://clubcentives.com/mobile';
var starttime = 0;
var alreadycalled = false;

function getSeconds() 
{
	var d = new Date();
	return d.getTime();   
}

$(window).bind('load', function() 
{

	// log when the page started to load
	starttime = getSeconds();
	
	// begin the preload
	$('#app').append('<iframe style="display:none" src="preload.html"></iframe>');
});


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
	
	$.ajax({
		url: gotourl,
		dataType: 'text',
		async: false,
		success: function(html) {
			var elapsed = getSeconds() - starttime;
			window.setTimeout(function(){
				document.open();
			    document.write(html);
			    document.close();
			}, elapsed > (minsplasscreenseconds*1000) ? 0 : (minsplasscreenseconds*1000) - elapsed);            	
		},
		error: function(request, text) {
			$('#app').html('<div>Could not connect to the CLUBCentives server. Please ensure that your phone has Internet connectivity.</div>');
		}
	});
};