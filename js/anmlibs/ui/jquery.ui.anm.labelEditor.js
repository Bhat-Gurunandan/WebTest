/*!
 * jQuery UI Widget-factory plugin boilerplate (for 1.8/9+)
 * Author: @addyosmani
 * Further changes: @peolanha
 * Licensed under the MIT license
 */

;(function ( $, window, document, undefined ) {

    // define your widget under a namespace of your choice
    //  with additional parameters e.g.
    // $.widget( "namespace.widgetname", (optional) - an
    // existing widget prototype to inherit from, an object
    // literal to become the widget's prototype ); 

    $.widget("ui.anm.labelEditor" , {

        //Options to be used as defaults
        options: {
			lName: 		'New Label',
			lColor:		'#ffffff',
			action:		'create',
			postURL:	'/createlabel',
			frmTmpl:	'#leditor',
			holder:		'#ledHolder'
        },

        //Setup widget (eg. element creation, apply theming
        // , bind events etc.)
        _create: function () {

			// _create will automatically run the first time
			// this widget is called. Put the initial widget
			// setup code here, then you can access the element
			// on which the widget was called via this.element.
			// The options defined above can be accessed
			// via this.options this.element.addStuff();
			
			this.element.bind('click.anm', _showform);
		},

		_init: function() {
			
			// _init is fired each time the widget is called
			// without any arguments
		},
		_form: null,
		_showForm: function(ev) {

			$form = $($(this.options.template).html())
				.find('.cpicker')
				.ColorPicker({
					flat: true,
					color: this.options.lColor,
					onChange: function(hsb, hex, rgb) {
						newcolor = hex;
					},
					onSubmit: function(hsb, hex, rgb) {
						$('input#lcolor').attr('value', hex);
					}
				})
			.end()
				.find('input#lname')
				.attr('value', this.options.lName)
			.end()
				.find('a#submit')
				.bind('click.anm', _submit)
			.end()
				.find('a#cancel')
				.bind('click.anm', _cancel);
			
			$(this.options.holder).append($form);
			ev.preventDefault();
		},
		
		_submit: function(ev) {
			
			var lname = $(this.options.holder)
					.find('input#name')
					.attr('value'),
				lcolor = $(this.options.holder)
					.find('input#color')
					.attr('value');
					
			alert(this.options.action + ':' + lname + ':' + lcolor);
			ev.preventDefault();
		},

		// Destroy an instantiated plugin and clean up
		// modifications the widget has made to the DOM
        destroy: function () {

			// this.element.removeStuff();
			// For UI 1.8, destroy must be invoked from the
			// base widget
			$.Widget.prototype.destroy.call(this);
			// For UI 1.9, define _destroy instead and don't
			// worry about
			// calling the base widget
        },

		// Respond to any changes the user makes to the
		// option method
		_setOption: function ( key, value ) {
			switch (key) {
			case "someValue":
			    //this.options.someValue = doSomethingWith( value );
			    break;
			default:
			    //this.options[ key ] = value;
			    break;
			}
			
			// For UI 1.8, _setOption must be manually invoked
			// from the base widget
			$.Widget.prototype._setOption.apply( this, arguments );
			// For UI 1.9 the _super method can be used instead
			// this._super( "_setOption", key, value );
		}
    });

})( jQuery, window, document );