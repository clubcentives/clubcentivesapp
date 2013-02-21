function getSeconds () 
{
	var d = new Date();
	return d.getTime();         	
}

var url = 'https://clubcentives.com/mobile';
var starttime = getSeconds();
var mintime = 5000;

$(function() {
                      	
	$.ajax({
		url: url,
		dataType: 'text',
		async: false,
		success: function(html) {
			var elapsed = getSeconds() - starttime;
			window.setTimeout(function(){
				document.open();
			    document.write(html);
			    document.close();
			}, elapsed > mintime ? 0 : mintime - elapsed);            	
		},
		error: function(request, text) {
			$('#app').html('<div>Could not connect to the CLUBCentives server. Please ensure that your phone has Internet connectivity.</div>');
		}
	});
	
});
