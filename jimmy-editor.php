<?php
/*
Plugin Name: Jimmy Editor
Plugin URI: http://electronics.jimmykenmerchant.com/jimmy-editor/
Description: Post Editor Patch and More
Author: Kenta Ishii
Author URI: http://electronics.jimmykenmerchant.com
Version: 1.0.4
Text Domain: jimmy-editor
Domain Path: /languages
License: GPL2 or Later
*/

/**
 * Add Script and Style to admin
 */
function jimmy_editor_admin() {
	wp_enqueue_style( 'jimmy-editor-admin-style',  plugins_url( 'style-jimmy-editor-admin.css', __FILE__ ), array(), '1.0' );
	wp_enqueue_script( 'jimmy-editor-admin-script-patch',  plugins_url( 'js/post-editor-patch.min.js', __FILE__ ), array(), '1.0', true );
	wp_enqueue_script( 'jimmy-editor-admin-script',  plugins_url( 'js/script-jimmy-editor-admin.min.js', __FILE__ ), array(), '1.0', true );
	return true;
}
add_action( 'admin_enqueue_scripts', 'jimmy_editor_admin' );


/**
 * Change Default Mode of Post Editor to "Text" mode
 */
function jimmy_editor_posteditor_default() {
	//return "tinymce";
	return "html";
}
add_filter( 'wp_default_editor', 'jimmy_editor_posteditor_default' );
