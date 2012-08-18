/* Author:

*/

$(document).ready(function(){
	
//	$('.alerter').labelEditor();
	
	var handling = false;
	$('#hotspot').mousedown(function(evt) {

		if (handling) return;
		
		var $this = $(this);
		
		if (evt.button == 2) {
			
			$this.mouseup(function(evt) {
				
				
				var $this = $(this);
				$this.unbind('mouseup');
				console.log('Right-Click handler Here');
			});
		}
		else {

			$this.click(function(evt){
				
				
				var $this = $(this),
					double = false;
					$this.unbind('click');

				$this.dblclick(function(evt){
					
					var $this = $(this);
					double = true;
					console.log('Dbl-Click handler here');
				});

				setTimeout(function(){
					
					$this.unbind('dblclick');
					if (!double) {
						console.log('Single-Click handler here');
					}
				}, 200);
			});			
		}
	});
})







