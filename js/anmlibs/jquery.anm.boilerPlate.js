/*!
 * jQuery Example Plugin Boilerplate
 * Original author: Torcomm Inc.
 */

;(function ( $, window, document, undefined ) {

    // Create the defaults once
	var pluginName = 'anmBoilerplate',
		defaults = {
			msg	: 'Default Initialization Method',
		};

    // Constructor
    function Plugin(element, options) {

		// Merge all defaults and options into 
        this.options = $.extend( {}, defaults, options) ;
		// Cache the context
        this.element = element;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

	Plugin.prototype = {
    
		init: function() {
			
			this.element.on('click.anmBoilerplate', function(){
				alert(this.options.msg);
			});
		}, 
	
		delete: function(el, options) {
		
			el.off('click.anmBoilerplate');			
		},

		destroy: function(el, options) {
		
			el.off('click.anmBoilerplate');
			el.removeData('plugin_' + pluginName);
		}
	};

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
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
		);
	};
})( jQuery, window, document );