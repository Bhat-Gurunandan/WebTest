/*!
 * jQuery Context Menu (Rt-Clk) Plugin
 * Original author: TORCOMM, Inc.
 */

;(function ( $, window, document, undefined ) {

    // Create the defaults once
	var pluginName = 'anmContextDelegatable',
		defaults = {
			inSpeed	: 150,
			outSpeed: 75
		};

    // Constructor
    function Plugin(element, options, callback) {

        this.options = $.extend( {}, defaults, options) ;
		if( this.options.inSpeed == 0 ) this.options.inSpeed = -1;
		if( this.options.outSpeed == 0 ) this.options.outSpeed = -1;
		
        this.element = element;
        this._defaults = defaults;
        this._name = pluginName;

        this.init(callback);
    };

	// Add commands
	Plugin.prototype = {
    
		init: function(callback) {
			
			var $plugin = this,
				$elem = $(this.element),
				$opts = $plugin.options,
				$target = $opts.target,
				offset = $elem.offset(),
				$menu = $('#' + $opts.menu);
				
			$menu.addClass('contextMenu');
			$elem.on('mousedown.' + pluginName, $target, function(evt){
				
				var $this = $(this);
				if (evt.button == 2) { // Right Click!
					
					// Disable browser context menu (requires both selectors to work in IE/Safari + FF/Chrome)
					$this
						.add($('ul.contextMenu'))
						.bind('contextmenu', function() {
							return false;
						});
	
					$this.one('mouseup.' + pluginName, function(evt){
						
						var $this = $(this),
							d = {},
							x = null,
							y = null;
	
						$('.contextMenu').hide();
						
						// Detect mouse position
						if( self.innerHeight ) {

							d.pageXOffset = self.pageXOffset;
							d.pageYOffset = self.pageYOffset;
							d.innerHeight = self.innerHeight;
							d.innerWidth = self.innerWidth;
						}
						else if(document.documentElement && document.documentElement.clientHeight ) {

							d.pageXOffset = document.documentElement.scrollLeft;
							d.pageYOffset = document.documentElement.scrollTop;
							d.innerHeight = document.documentElement.clientHeight;
							d.innerWidth = document.documentElement.clientWidth;
						}
						else if( document.body ) {

							d.pageXOffset = document.body.scrollLeft;
							d.pageYOffset = document.body.scrollTop;
							d.innerHeight = document.body.clientHeight;
							d.innerWidth = document.body.clientWidth;
						}
						x = (evt.pageX) ? evt.pageX : evt.clientX + d.scrollLeft;
						y = (evt.pageY) ? evt.pageY : evt.clientY + d.scrollTop;
						
						// Show the menu
						$menu
							.css({ top: y, left: x })
							.fadeIn($opts.inSpeed);
							
						// Hover events
						$menu
							.find('a')
							.mouseover(function() {
								$menu.find('li.hover').removeClass('hover');
								$(this).parent().addClass('hover');
							})
							.mouseout(function() {
								$menu
									.find('li.hover')
									.removeClass('hover');
							});
						
						// Activate Keyboard Navigation on menu
						$(document).keypress(function(e) {

							switch( e.keyCode ) {

								case 38: // up
									if( $menu.find('li.hover').length == 0 ) {

										$menu.find('li:last').addClass('hover');
									}
									else {

										$menu.find('li.hover').removeClass('hover').prevAll('li:not(.disabled)').eq(0).addClass('hover');
										if( $menu.find('li.hover').length == 0 ) $menu.find('li:last').addClass('hover');
									}
									break;

								case 40: // down
									if( $menu.find('li.hover').length == 0 ) {

										$menu.find('li:first').addClass('hover');
									}
									else {

										$menu.find('li.hover').removeClass('hover').nextAll('li:not(.disabled)').eq(0).addClass('hover');
										if( $menu.find('li.hover').length == 0 ) $menu.find('li:first').addClass('hover');
									}
									break;

								case 13: // enter
									$menu.find('li.hover a').trigger('click');
									break;

								case 27: // esc
									$(document).trigger('click');
									break
							}
							e.preventDefault();
						});
						
						// When items are selected
						$menu
							.find('a')
							.unbind('click');
						$menu
							.find('li:not(.disabled) a')
							.click( function(evt) {
								$(document)
									.unbind('click')
									.unbind('keypress');

								$('.contextMenu').hide();
		
								// Callback
								if( callback && typeof callback === 'function')
									callback($(this).attr('href').substr(1), $this, {x: x - offset.left, y: y - offset.top, docX: x, docY: y});
								
								evt.preventDefault();
							});
							
						// Hide bindings
						setTimeout(function() { // Delay for Mozilla

							$(document).click(function(evt) {

								$(document)
									.unbind('click')
									.unbind('keypress');

								$menu.fadeOut($opts.outSpeed);
								evt.preventDefault();
								evt.stopImmediatePropagation();
							});
						}, 0);
					});
				}
			});
			console.log(pluginName + ': Init Called');
		}
	};

    // Wrapper to prevent multiple instantiations
	$.fn[pluginName] = function (options, callback) {

		return this.each(function () {
		
			if ( typeof options === 'object' || ! options ) {

				if (!$.data(this, 'plugin_' + pluginName)) {
					$.data(this, 
						'plugin_' + pluginName,
						new Plugin(this, options, callback)
					);
				}
			}
			else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {

				var instance = $.data(this, 'plugin_' + pluginName);
				if (instance instanceof Plugin && typeof instance[options] === 'function') {
					instance[options].apply( instance, Array.prototype.slice.call( arguments, 1 ) );
				}
			}				
			else {

				$.error( 'Command ' +  options + ' does not exist on jQuery.' + pluginName);
			}    
		});
	};
})( jQuery, window, document );