/*! Author: TORCOMM, Inc.
*/

$(document).ready(function() {

	$('div.bp').anmBoilerplate({msg: 'Custom Message'});

	// Delete Handlers
	$('a.delete').click(function(ev){
		
		$('div.bp').anmBoilerplate('anmdelete');
		ev.preventDefault();
	});
	
	// Delete Handlers and remove attached data
	$('a.destroy').click(function(ev){
		
		$('div.bp').anmBoilerplate('anmdestroy');
		ev.preventDefault();
	});

	// Reapply Handlers
	$('a.reinit').click(function(ev){
		
		$('div.bp').anmBoilerplate({msg: 'New Custom Message'});
		ev.preventDefault();
	});
});