/*!
 * jQuery Example Plugin Boilerplate
 * Original author: TORCOMM, Inc.
 */

;(function ( $, window, document, undefined ) {

    // Create the defaults once
	var pluginName = 'anmBoilerplate',
		defaults = {
			msg	: 'Default Initialization Method',
		};

    // Constructor
    function Plugin(element, options) {

        this.options = $.extend( {}, defaults, options) ;
        this.element = element;
        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    };

	Plugin.prototype = {
    
		init: function() {
			
			var that = this
			$(this.element).on('click.' + pluginName, function(){
				alert(that.options.msg);
			});
			
			console.log('Init Called');
		}, 
	
		anmdelete: function(el, options) {
		
			$(el).off('click.' + pluginName);			
		},

		anmdestroy: function(el, options) {
		
			$(el).off('click.' + pluginName);
			$(el).removeData('plugin_' + pluginName);
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