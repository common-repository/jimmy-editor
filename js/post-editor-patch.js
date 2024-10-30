/**
 * post-editor-patch.js in Jimmy Editor, a WordPress plugin
 * Source from wp-admin/js/common.js line No.516 (WordPress 4.7.3)
 * @package Jimmy Codeviewer
 * @author Kenta Ishii
 * License: GPLv2 or late
 */

/**
 * common.js is loaded by wp-admin/load-scripts.php on admin contents.
 * Post Editor loads common.js, even though tab indent has not been functioned.
 */

( function( $ ) {

var $document = $( document );

$document.ready( function() {
	// tab in textareas
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Original
	//$('#newcontent').bind('keydown.wpevent_InsertTab', function(e) {
//==========================================
	//$('#content,#newcontent').bind('keydown.wpevent_InsertTab', function(e) {
	$('#content').bind('keydown.wpevent_InsertTab', function(e) {
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> jimmyken
		var el = e.target, selStart, selEnd, val, scroll, sel;

		if ( e.keyCode == 27 ) { // escape key
			// when pressing Escape: Opera 12 and 27 blur form fields, IE 8 clears them
			e.preventDefault();
			$(el).data('tab-out', true);
			return;
		}

		if ( e.keyCode != 9 || e.ctrlKey || e.altKey || e.shiftKey ) // tab key
			return;

		if ( $(el).data('tab-out') ) {
			$(el).data('tab-out', false);
			return;
		}

		selStart = el.selectionStart;
		selEnd = el.selectionEnd;
		val = el.value;

		if ( document.selection ) {
			el.focus();
			sel = document.selection.createRange();
			sel.text = '\t';
		} else if ( selStart >= 0 ) {
			scroll = this.scrollTop;
			el.value = val.substring(0, selStart).concat('\t', val.substring(selEnd) );
			el.selectionStart = el.selectionEnd = selStart + 1;
			this.scrollTop = scroll;
		}

		if ( e.stopPropagation )
			e.stopPropagation();
		if ( e.preventDefault )
			e.preventDefault();
	});
});

})( jQuery );
