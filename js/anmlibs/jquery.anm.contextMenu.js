/*!
 * jQuery Example Plugin Boilerplate
 * Original author: TORCOMM, Inc.
 */

;(function ( $, window, document, undefined ) {

    // Create the defaults once
	var pluginName = 'anmContextMenu',
		defaults = {
			inSpeed	: 150,
			outSpeed: 75
		};

    // Constructor
    function Plugin(element, options) {

        this.options = $.extend( {}, defaults, options) ;
		if( this.options.inSpeed == 0 ) this.options.inSpeed = -1;
		if( this.options.outSpeed == 0 ) this.options.outSpeed = -1;
		
        this.element = element;
        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    };

	Plugin.prototype = {
    
		init: function() {
			
			var $plugin = this,
				$elem = $(this.element),
				$opts = $plugin.options;
			
							// Disable browser context menu (requires both selectors to work in IE/Safari + FF/Chrome)
			$elem
				.add($('ul.contextMenu'))
				.bind('contextmenu', function() {
					return false;
				});
	
			$elem.on('mousedown.' + pluginName, function(evt){
				
				var $this = $(this);
				if (evt.button == 2) { // Right Click!
					
					$this.on('mouseup.' + pluginName, function(evt){
						
						var $this = $(this),
							d = {},
							x = null,
							y = null,
							$menu = $('#' + $opts.menu);
	
						$this.off('mouseup.' + pluginName);
						$('contextMenu').hide();
						
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
						
						// Disable clicks everywhere and show the menu
						$(document).unbind('click');
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
									if( $(menu).find('li.hover').size() == 0 ) {

										$(menu).find('li:last').addClass('hover');
									}
									else {

										$(menu).find('li.hover').removeClass('hover').prevAll('li:not(.disabled)').eq(0).addClass('hover');
										if( $(menu).find('li.hover').size() == 0 ) $(menu).find('li:last').addClass('hover');
									}
									break;

								case 40: // down
									if( $(menu).find('li.hover').size() == 0 ) {

										$(menu).find('li:first').addClass('hover');
									}
									else {

										$(menu).find('li.hover').removeClass('hover').nextAll('li:not(.disabled)').eq(0).addClass('hover');
										if( $(menu).find('li.hover').size() == 0 ) $(menu).find('li:first').addClass('hover');
									}
									break;

								case 13: // enter
									$(menu).find('li.hover A').trigger('click');
									break;

								case 27: // esc
									$(document).trigger('click');
									break
							}
						});
						
						// When items are selected
						$menu
							.find('a')
							.unbind('click');

						$menu
							.find('li:not(.disabled) a')
							.click( function() {
								$(document)
									.unbind('click')
									.unbind('keypress');

								$(".contextMenu").hide();
		
								// Callback
								if(callback)
									callback($(this).attr('href').substr(1), $(srcElement), {x: x - offset.left, y: y - offset.top, docX: x, docY: y});
								
								return false;
							});
							
						// Hide bindings
						setTimeout( function() { // Delay for Mozilla

							$(document).click( function() {

								$(document)
									.unbind('click')
									.unbind('keypress');

								$(menu).fadeOut(o.outSpeed);
								return false;
							});
						}, 0);
					});
				}
				
				
			});
			
			console.log('Init Called');
		}, 
	
		disableContextMenuItems: function(el, options) {
		
			console.log(el);
			console.log(options);			
		},

		enableContextMenuItems: function(el, options) {
		
			console.log(el);
			console.log(options);			
		},
		
		disableContextMenu: function(el, options) {
		
			console.log(el);
			console.log(options);			
		},

		enableContextMenu: function(el, options) {
		
			console.log(el);
			console.log(options);			
		},
		
		destroyContextMenu: function(el, options) {
		
			console.log(el);
			console.log(options);			
		} 
	};

    // Wrapper to prevent multiple instantiations
	$.fn[pluginName] = function (options) {

		return this.each(function () {
		
			if ( typeof options === 'object' || ! options ) {

				if (!$.data(this, 'plugin_' + pluginName)) {
					$.data(this, 
						'plugin_' + pluginName,
						new Plugin(this, options)
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