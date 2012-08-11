/*!
 * jQuery label editor for XCloud Web Applications
 * Original author: @ajpiano
 */

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global
    // variable in ECMAScript 3 and is mutable (i.e. it can
    // be changed by someone else). undefined isn't really
    // being passed in so we can ensure that its value is
    // truly undefined. In ES5, undefined can no longer be
    // modified.

    // window and document are passed through as local
    // variables rather than as globals, because this (slightly)
    // quickens the resolution process and can be more
    // efficiently minified (especially when both are
    // regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = 'labelMDEditor',
        defaults = {
            holder: 'anmLabelMDEditorHolder',
            labelName: 'No name supplied',
            labelColor: '#ffffff'
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {
        
        init : function () {

			// Place initialization logic here
			// You already have access to the DOM element and
			// the options via the instance, e.g. this.element
			// and this.options
			// you can add more functions like the one below and 
			// call them like so: this.yourotherfunction(this.element, this.options).
			
			$(this.element)
				.bind(
					'click.anm',
					this.options,
					_showEditor
				);			
        }
    };

	function _showEditor(ev) {

		$(this)
			.after($('.newlabeltemplate').html());

		var cpicker = $(this)
			.find('.cpicker')
			.ColorPicker({
				flat: true,
				color: ev.data.labelColor,
				onChange: function(hsb, hex, rgb) {
					newcolor = hex;
				},
				onSubmit: function(hsb, hex, rgb) {
					$('input#incolor').attr('value', hex);
				}
			});
			
		$(this)
			.find('a.submitbutton')
			.bind(
				'click.anm',
				ev.data,
				_submit
			);
			
		$(this)
			.find('a.cancelbutton')
			.bind(
				'click.anm',
				_cancel
			);
			
		return false;
	}
	
	function _submit(ev) {
		
		alert(ev.data.labelName + ':' + ev.data.labelColor);
		return false;
	}
	
	function _cancel() {
		
		var formm = $(this)
			.parents('form')
			.first()
			.remove();
		
		return false;
	}

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations and allowing any
    // public function (ie. a function whose name doesn't start
    // with an underscore) to be called via the jQuery plugin,
    // e.g. $(element).defaultPluginName('functionName', arg1, arg2)
    $.fn[pluginName] = function ( options ) {
        var args = arguments;
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            return this.each(function () {
                var instance = $.data(this, 'plugin_' + pluginName);
                if (instance instanceof Plugin && typeof instance[options] === 'function') {
                    instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }
            });
        }
    }

})( jQuery, window, document );
