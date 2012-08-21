/*! Author: TORCOMM, Inc.
*/

$(document).ready(function() {

	var options = {
		menu:	'ctxtMenu',
		target: 'div.ctxt'
	};
	
	$('div.container').anmContextDelegatable(options, function(action, el, pos) {
		alert(
			'Action: ' + action + '\n\n' +
			'Element ID: ' + $(el).attr('id') + '\n\n' +
			'X: ' + pos.x + ' Y: ' + pos.y + ' (relative to element)\n\n' +
			'X: ' + pos.docX + ' Y: ' + pos.docY + ' (relative to document)'
		);
	});
	
	$('div.ctxt').click(function(){
		
		$(this).toggleClass('ctxtred');
	})
});