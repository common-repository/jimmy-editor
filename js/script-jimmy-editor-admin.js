/**
 * script-jimmy-editor-admin.js in Jimmy Editor, a WordPress plugin
 * @package Jimmy Codeviewer
 * @author Kenta Ishii
 * License: GPLv2 or late
 */

(function($) {

	var g_sticker_flag = 0;
	// variable $target_area should be global
	var $target_area = {};
	if ($('#content').length === 1) {
	// Post Editor
		$target_area = $('#content');
	} else if ($('#newcontent').length === 1) {
	// Theme or Plugin Editor
		$target_area = $('#newcontent');
	}

	if ($target_area.length === 1) {
		// First and Second Arguments are X and Y percentages to Window of your Browser
		// Last Argument needs unique number except 0
		stopClickEvent();
		styleBox("40%", "40%", 1);
		searchBox("45%", "45%", 2);
		linesBox("50%", "50%", 3);
	}


	/**
	 * lines Box Construction
	 * Line and Character Number Detection and Search
	 */
	function linesBox(x_pos, y_pos, order_num) {
		// If moved already, retrieves its position
		if (window.sessionStorage.getItem("x-" + order_num)) {
			x_pos = window.sessionStorage.getItem("x-" + order_num);
		} else {
			// Convert the percentage of X positions to the pixel coordinate.
			var win_width = $(window).width();
			var x_pcent = parseInt(x_pos) / 100;
			x_pos = parseInt(win_width * x_pcent);
		}

		if (window.sessionStorage.getItem("y-" + order_num)) {
			y_pos = window.sessionStorage.getItem("y-" + order_num);
		} else {
			// Convert the percentage of Y positions to the pixel coordinate.
			var win_height = $(window).height();
			var y_pcent = parseInt(y_pos) / 100;
			y_pos = parseInt(win_height * y_pcent);
		}

		// Common
		$target_area.attr({
				"selectionStart": "0",
				"selectionEnd": "0"
				});

		$("<div>").appendTo($("body"))
			.attr({
				"id": "lines-box",
				"class": "the-boxes"
				}
			)
			.css({
				"cursor": "pointer",
				"visibility": "hidden",
				"display": "block",
				"opacity": "0.8",
				"position": "fixed",
				"margin": "0",
				"padding": "0",
				"left": x_pos + "px",
				"top": y_pos + "px",
				"z-index": "100000",
				"width": "6.0rem",
				"height": "auto",
				"text-align": "left",
				"background-color": "#0ff",
				"color": "#000",
				"transition": "top 0.2s, left 0.2s"
				}
			);

		$("<div>").appendTo($("#lines-box"))
			.attr({
				"id": "lines-sticker",
				"class": "the-stickers"
				}
			)
			.css({
				"display": "inline-block",
				"vertical-align": "top",
				"text-align": "center",
				"width": "6.0rem",
				"height": "1.5rem",
				"background-color": "#f0f",
				"transition": "background-color 0.5s"
				}
			)
			.click( function() {
					if (g_sticker_flag === parseInt(order_num)) {
						g_sticker_flag = 0;
						$(".the-stickers").css("background-color", "#f0f");
						$(".the-pins").css({
									"border-right": "1.0em solid transparent",
									"border-left": "1.0em solid transparent"
								});
						var xstore = parseInt($("#lines-box").css("left"));
 						window.sessionStorage.setItem("x-" + order_num, xstore);
						var ystore = parseInt($("#lines-box").css("top"));
 						window.sessionStorage.setItem("y-" + order_num, ystore);
						return false;
					} else {
						g_sticker_flag = parseInt(order_num);
						$(".the-stickers").css("background-color", "#f0f");
						$(".the-pins").css({
									"border-right": "1.0em solid transparent",
									"border-left": "1.0em solid transparent"
								});
						$(this).css("background-color", "#ff0");
						$(this).children("div")
								.css({
									"border-right": "1.0em solid #0ff",
									"border-left": "1.0em solid #0ff"
								});
						return false;
					}
				}
			)
			.bind('mousemove', function(e) {
							// prevent propagation to parent tags (body)
							// not to move sticker in this block
							return false;
						}
			)
			.bind('mouseenter', function(e) {
							$(this).css("background-color", "#ff0");
							return false;
						}
			)
			.bind('mouseleave', function(e) {
							$(this).css("background-color", "#f0f");
							return false;
						}
			);

		$("<div>").appendTo($("#lines-sticker"))
			.attr({
				"id": "lines-pin",
				"class": "the-pins"
				}
			)
			.css({
				"display": "inline-block",
				"vertical-align": "top",
				"width": "0",
				"height": "0",
				"margin": "0",
				"padding": "0",
				"border-top": "2.0em solid #0ff",
				"border-right": "1.0em solid transparent",
				"border-left": "1.0em solid transparent",
				"transition": "border-right 0.5s, border-left 0.5s"
				}
			)
			.click( function() {
					g_sticker_flag = 0;
					$(".the-stickers").css("background-color", "#f0f");
					$(".the-pins").css({
							"border-right": "1.0em solid transparent",
							"border-left": "1.0em solid transparent"
							});
					$("#lines-box").css("visibility", "hidden");
					$target_area[0].focus();
					return false;
				}
			);

		$("<div>").appendTo($("#lines-box"))
			.attr("id", "lines-text")
			.css({
				"display": "inline-block",
				"vertical-align": "top",
				"width": "6.0rem",
				"height": "auto",
				"line-height": "1.5rem",
				"text-align": "center",
				"font-size": "1.5rem",
				"white-space": "pre",
				"background-color": "#aff",
				"color": "#000"
				}
			)
			.click( function() {
					if(the_wrap === true) {
						$("#lines-wrap").css("display", "none");
						$target_area[0].focus();
						the_wrap = false;
					} else if(the_wrap === false) {
						$("#lines-wrap").css("display", "inline-block");
						the_wrap = true;
					}
					return false;
				}
			)
			.text("");

		var the_wrap = false;
		$("<div>").appendTo($("#lines-box"))
			.attr("id", "lines-wrap")
			.css({
				"display": "none",
				"vertical-align": "top",
				"width": "6.0rem",
				"height": "auto"
				}
			);
		// End of Common

		$("<div>").appendTo($("#lines-wrap"))
			.attr("id", "lines-button1")
			.css({
				"display": "inline-block",
				"vertical-align": "top",
				"line-height": "1.8rem",
				"text-align": "center",
				"font-size": "1.0rem",
				"font-weight": "bold",
				"width": "2.0rem",
				"height": "2.0rem",
				"background-color": "#ff0",
				"color": "#000",
				"transition": "background-color 0.5s"
				}
			)
			.bind('mouseenter', function(e) {
							$(this).css("background-color", "#0ff");
							return false;
						}
			)
			.bind('mouseleave', function(e) {
							$(this).css("background-color", "#ff0");
							return false;
						}
			)
			.text("Go");

		$("<input>").attr({
					"id": "lines-input",
					"type": "text",
					"placeholder": "L:C?"
					}
				)
				.css({
					"display": "inline-block",
					"vertical-align": "top",
					"font-size": "1.2rem",
					"font-weight": "bold",
					"margin": "0",
					"padding": "0",
					"width": "4.0rem",
					"height": "2.0rem",
					"background-color": "#fff",
					"color": "#000"
					}
				)
				.appendTo($("#lines-wrap"));

		$("<div>").appendTo($("#lines-wrap"))
			.attr("id", "lines-button2")
			.css({
				"display": "inline-block",
				"vertical-align": "top",
				"line-height": "1.8rem",
				"text-align": "center",
				"font-size": "1.0rem",
				"font-weight": "bold",
				"width": "3.0rem",
				"height": "2.0rem",
				"background-color": "#ff0",
				"color": "#000",
				"border-bottom": "1px solid #aaa",
				"transition": "background-color 0.5s"
				}
			)
			.bind('mouseenter', function(e) {
							$(this).css("background-color", "#0ff");
							return false;
						}
			)
			.bind('mouseleave', function(e) {
							$(this).css("background-color", "#ff0");
							return false;
						}
			)
			.text("Top");

		$("<div>").appendTo($("#lines-wrap"))
			.attr("id", "lines-button3")
			.css({
				"display": "inline-block",
				"vertical-align": "top",
				"line-height": "1.8rem",
				"text-align": "center",
				"font-size": "1.0rem",
				"font-weight": "bold",
				"width": "3.0rem",
				"height": "2.0rem",
				"background-color": "#ff0",
				"color": "#000",
				"border-bottom": "1px solid #aaa",
				"transition": "background-color 0.5s"
				}
			)
			.bind('mouseenter', function(e) {
							$(this).css("background-color", "#0ff");
							return false;
						}
			)
			.bind('mouseleave', function(e) {
							$(this).css("background-color", "#ff0");
							return false;
						}
			)
			.text("Last");

		$("<div>").appendTo($("#lines-wrap"))
			.attr("id", "lines-button4")
			.css({
				"display": "inline-block",
				"vertical-align": "top",
				"line-height": "1.8rem",
				"text-align": "center",
				"font-size": "1.0rem",
				"font-weight": "bold",
				"width": "3.0rem",
				"height": "2.0rem",
				"background-color": "#ff0",
				"color": "#000",
				"transition": "background-color 0.5s"
				}
			)
			.bind('mouseenter', function(e) {
							$(this).css("background-color", "#0ff");
							return false;
						}
			)
			.bind('mouseleave', function(e) {
							$(this).css("background-color", "#ff0");
							return false;
						}
			)
			.text("<-");

		$("<div>").appendTo($("#lines-wrap"))
			.attr("id", "lines-button5")
			.css({
				"display": "inline-block",
				"vertical-align": "top",
				"line-height": "1.8rem",
				"text-align": "center",
				"font-size": "1.0rem",
				"font-weight": "bold",
				"width": "3.0rem",
				"height": "2.0rem",
				"background-color": "#ff0",
				"color": "#000",
				"transition": "background-color 0.5s"
				}
			)
			.bind('mouseenter', function(e) {
							$(this).css("background-color", "#0ff");
							return false;
						}
			)
			.bind('mouseleave', function(e) {
							$(this).css("background-color", "#ff0");
							return false;
						}
			)
			.text("+>");

		$target_area.bind('click.jimmy-editor_lines_showbox', function(e) {
	
			var el = e.target;
			var sel_end = el.selectionEnd;
			var val = el.value;
	
			var cal = val.substr(0, sel_end).split("\n");
			var lines_n = cal.length;
			var num_n = cal[cal.length - 1].length;
	
			$("#lines-text").text("L: " + lines_n + "\r\n" + "C: " + num_n);
	
			$("#lines-box").css("visibility", "visible");

			return false;
		});

		$target_area.bind('keyup.jimmy-editor_lines_showbox', function(e) {
	
			$target_area.trigger('click.jimmy-editor_lines_showbox');

			return false;
		});

		$('#lines-button1').bind('click.jimmy-editor_lines_main', function(e) {
			var val_input = $('#lines-input').val();
			if (val_input == parseInt(val_input)) {
				var lines_n = parseInt(val_input) - 1;
				var num_n = 0;
			} else {
				val_input = val_input.split(":", 2);
				if (val_input[0] === "" || val_input[1] === "") {
					$target_area[0].focus();
					return false;
				} else {
					var lines_n = parseInt(val_input[0]);
					var num_n = parseInt(val_input[1]);
					if (isNaN(lines_n) || isNaN(num_n)) {
						$target_area[0].focus();
						return false;
					} else {
						lines_n--;
					}
				}
			}

			var val = $target_area[0].value;
			var cal = val.substr(0).split("\n");

			// If lines is overflowed length of text
			var ck_length = lines_n + 1;
			if (cal.length < ck_length) {
				$target_area[0].focus();
				return false;
			}
			// If number is overflowed length of line
			if (cal[lines_n].length < num_n) {
				num_n = cal[lines_n].length;
			}

			var dest = 0;
			for (var i=0; i < lines_n; i++) {
				dest += cal[i].length + 1;
			}

			dest += num_n;

			// Need to pre-select and refocus to scroll correctly in case of ranged selecting of the text
			$target_area[0].selectionStart = dest;
			$target_area[0].selectionEnd = dest;
			$(window).scrollTop(0);
			$('#lines-input').focus();
			$target_area[0].focus();

			// For Correct Scroll with Caret
			var front_v = val.slice(0, dest);
			var rear_v = val.slice(dest);
			$target_area[0].value = front_v + " " + rear_v;
			$target_area[0].value = front_v + rear_v;

			if (num_n === 0) {
				$target_area[0].selectionStart = dest;
				$target_area[0].selectionEnd = dest;
			} else {
				$target_area[0].selectionStart = dest -1;
				$target_area[0].selectionEnd = dest;
			}

			lines_n++;
	
			$("#lines-text").text("L: " + lines_n + "\r\n" + "C: " + num_n);

			return false;
		});

		$('#lines-input').bind('keydown.jimmy-editor_lines_main', function(e) {
			if (e.keyCode == 13) { // enter key
				e.preventDefault();
				$('#lines-button1').trigger('click.jimmy-editor_lines_main');
				return false;
			}
		});

		$('#lines-button2').bind('click.jimmy-editor_lines_top', function(e) {
			$target_area[0].selectionStart = 0;
			$target_area[0].selectionEnd = 0;

			// Need to refocus to correct siting particular in post editor
			$(window).scrollTop(0);
			$('#lines-input').focus();
			$target_area[0].focus();

			$("#lines-text").text("L: " + 1 + "\r\n" + "C: " + 0);

			return false;
		});

		$('#lines-button3').bind('click.jimmy-editor_lines_last', function(e) {
			var val = $target_area[0].value;	
			$target_area[0].selectionStart = val.length;
			$target_area[0].selectionEnd = val.length;

			// Need to refocus to correct siting particular in post editor
			$(window).scrollTop(0);
			$('#lines-input').focus();
			$target_area[0].focus();

			var cal = val.substr(0).split("\n");
			$("#lines-text").text("L: " + cal.length + "\r\n" + "C: " + cal[cal.length - 1].length);

			return false;
		});

		$('#lines-button4').bind('click.jimmy-editor_lines_addindent', function(e) {
			if( $target_area[0].selectionStart !== $target_area[0].selectionEnd ) {
				var val = $target_area[0].value;
				var sub_start = $target_area[0].selectionStart;
				var sub_end = $target_area[0].selectionEnd;
				var front_v = val.slice(0, sub_start);
				var target_v = val.slice(sub_start, sub_end);
				var rear_v = val.slice(sub_end);
				target_v = target_v.replace(/^(?:\t)(.+)/mg, '$1');

				// Need to pre-select and refocus to scroll correctly in case of ranged selecting of the text
				$target_area[0].selectionStart = sub_start;
				$target_area[0].selectionEnd = sub_start;
				$(window).scrollTop(0);
				$('#lines-input').focus();
				$target_area[0].focus();

				$target_area[0].value= front_v + target_v + rear_v;

				$target_area[0].selectionStart = sub_start;
				$target_area[0].selectionEnd = sub_start + target_v.length;

				$target_area.trigger('click.jimmy-editor_lines_showbox');
			}

			return false;
		});

		$('#lines-button5').bind('click.jimmy-editor_lines_addindent', function(e) {
			if( $target_area[0].selectionStart !== $target_area[0].selectionEnd ) {
				var val = $target_area[0].value;
				var sub_start = $target_area[0].selectionStart;
				var sub_end = $target_area[0].selectionEnd;
				var front_v = val.slice(0, sub_start);
				var target_v = val.slice(sub_start, sub_end);
				var rear_v = val.slice(sub_end);
				target_v = target_v.replace(/^(.+)/mg, '\t$1');

				// Need to pre-select and refocus to scroll correctly in case of ranged selecting of the text
				$target_area[0].selectionStart = sub_start;
				$target_area[0].selectionEnd = sub_start;
				$(window).scrollTop(0);
				$('#lines-input').focus();
				$target_area[0].focus();

				$target_area[0].value= front_v + target_v + rear_v;

				$target_area[0].selectionStart = sub_start;
				$target_area[0].selectionEnd = sub_start + target_v.length;

				$target_area.trigger('click.jimmy-editor_lines_showbox');
			}

			return false;
		});

		$('body').bind('mousemove.jimmy-editor_lines', function(e) {

			if (g_sticker_flag === parseInt(order_num)) {
				// Slide the menu 4px minus of X and Y from the (mouse|touch) pointer
				$("#lines-box").css({
						"left": e.clientX - 4 + "px",
						"top": e.clientY - 4 + "px"
						});

				return false;
			}
		});
	}


	/**
	 * Search Box Construction
	 * Search, Replace or Delete Word
	 */
	function searchBox(x_pos, y_pos, order_num) {
		// If moved already, retrieves its position
		if (window.sessionStorage.getItem("x-" + order_num)) {
			x_pos = window.sessionStorage.getItem("x-" + order_num);
		} else {
			// Convert the percentage of X positions to the pixel coordinate.
			var win_width = $(window).width();
			var x_pcent = parseInt(x_pos) / 100;
			x_pos = parseInt(win_width * x_pcent);
		}

		if (window.sessionStorage.getItem("y-" + order_num)) {
			y_pos = window.sessionStorage.getItem("y-" + order_num);
		} else {
			// Convert the percentage of Y positions to the pixel coordinate.
			var win_height = $(window).height();
			var y_pcent = parseInt(y_pos) / 100;
			y_pos = parseInt(win_height * y_pcent);
		}

		// Common
		$target_area.attr({
				"selectionStart": "0",
				"selectionEnd": "0"
				});

		$("<div>").appendTo($("body"))
			.attr({
				"id": "search-box",
				"class": "the-boxes"
				}
			)
			.css({
				"cursor": "pointer",
				"visibility": "hidden",
				"display": "block",
				"opacity": "0.8",
				"position": "fixed",
				"margin": "0",
				"padding": "0",
				"left": x_pos + "px",
				"top": y_pos + "px",
				"z-index": "100000",
				"width": "6.0rem",
				"height": "auto",
				"text-align": "left",
				"background-color": "#0ff",
				"color": "#000",
				"transition": "top 0.2s, left 0.2s"
				}
			);

		$("<div>").appendTo($("#search-box"))
			.attr({
				"id": "search-sticker",
				"class": "the-stickers"
				}
			)
			.css({
				"display": "inline-block",
				"vertical-align": "top",
				"text-align": "center",
				"width": "6.0rem",
				"height": "1.5rem",
				"background-color": "#f0f",
				"transition": "background-color 0.5s"
				}
			)
			.click( function() {
					if (g_sticker_flag === parseInt(order_num)) {
						g_sticker_flag = 0;
						$(".the-stickers").css("background-color", "#f0f");
						$(".the-pins").css({
									"border-right": "1.0em solid transparent",
									"border-left": "1.0em solid transparent"
								});
						var xstore = parseInt($("#search-box").css("left"));
 						window.sessionStorage.setItem("x-" + order_num, xstore);
						var ystore = parseInt($("#search-box").css("top"));
 						window.sessionStorage.setItem("y-" + order_num, ystore);
						return false;
					} else {
						g_sticker_flag = parseInt(order_num);
						$(".the-stickers").css("background-color", "#f0f");
						$(".the-pins").css({
									"border-right": "1.0em solid transparent",
									"border-left": "1.0em solid transparent"
								});
						$(this).css("background-color", "#ff0");
						$(this).children("div")
								.css({
									"border-right": "1.0em solid #0ff",
									"border-left": "1.0em solid #0ff"
								});
						return false;
					}
				}
			)
			.bind('mousemove', function(e) {
							// prevent propagation to parent tags (body)
							// not to move sticker in this block
							return false;
						}
			)
			.bind('mouseenter', function(e) {
							$(this).css("background-color", "#ff0");
							return false;
						}
			)
			.bind('mouseleave', function(e) {
							$(this).css("background-color", "#f0f");
							return false;
						}
			);

		$("<div>").appendTo($("#search-sticker"))
			.attr({
				"id": "search-pin",
				"class": "the-pins"
				}
			)
			.css({
				"display": "inline-block",
				"vertical-align": "top",
				"width": "0",
				"height": "0",
				"margin": "0",
				"padding": "0",
				"border-top": "2.0em solid #0ff",
				"border-right": "1.0em solid transparent",
				"border-left": "1.0em solid transparent",
				"transition": "border-right 0.5s, border-left 0.5s"
				}
			)
			.click( function() {
					g_sticker_flag = 0;
					$(".the-stickers").css("background-color", "#f0f");
					$(".the-pins").css({
							"border-right": "1.0em solid transparent",
							"border-left": "1.0em solid transparent"
							});
					$("#search-box").css("visibility", "hidden");
					$target_area[0].focus();
					return false;
				}
			);

		$("<div>").appendTo($("#search-box"))
			.attr("id", "search-text")
			.css({
				"display": "inline-block",
				"vertical-align": "top",
				"width": "6.0rem",
				"height": "auto",
				"line-height": "2.0rem",
				"text-align": "center",
				"font-size": "1.5rem",
				"white-space": "pre",
				"background-color": "#aff",
				"color": "#000"
				}
			)
			.click( function() {
					if(the_wrap === true) {
						$("#search-wrap").css("display", "none");
						$target_area[0].focus();
						the_wrap = false;
					} else if(the_wrap === false) {
						$("#search-wrap").css("display", "inline-block");
						the_wrap = true;
					}
					return false;
				}
			)
			.text("Search");

		var the_wrap = false;
		$("<div>").appendTo($("#search-box"))
			.attr("id", "search-wrap")
			.css({
				"display": "none",
				"vertical-align": "top",
				"width": "6.0rem",
				"height": "auto"
				}
			);
		// End of Common

		var the_select_flag = 0;
		$("<div>").appendTo($("#search-wrap"))
			.attr("id", "search-button1")
			.css({
				"display": "inline-block",
				"vertical-align": "top",
				"width": "6.0rem",
				"height": "auto",
				"line-height": "2.0rem",
				"text-align": "center",
				"font-size": "1.0rem",
				"white-space": "pre",
				"background-color": "#ff0",
				"color": "#f00"
				}
			)
			.click( function() {
					if (the_select_flag === 0) {
						the_select_flag = 1;
						$("#search-text").text("Replace");
					} else if (the_select_flag === 1) {
						the_select_flag = 0;
						$("#search-text").text("Search");
					}
				}
			)
			.bind('mouseenter', function(e) {
							$(this).css("background-color", "#0ff");
							return false;
						}
			)
			.bind('mouseleave', function(e) {
							$(this).css("background-color", "#ff0");
							return false;
						}
			).text("Select");

		$("<input>").attr({
					"id": "search-input1",
					"class": "search-input",
					"type": "text",
					"placeholder": "Search?"
					}
				)
				.css({
					"display": "inline-block",
					"vertical-align": "top",
					"font-size": "1.2rem",
					"font-weight": "bold",
					"margin": "0",
					"padding": "0",
					"width": "6.0rem",
					"height": "2.0rem",
					"background-color": "#fff",
					"color": "#000"
					}
				)
				.appendTo($("#search-wrap"));

		$("<input>").attr({
					"id": "search-input2",
					"class": "search-input",
					"type": "text",
					"placeholder": "Replace?"
					}
				)
				.css({
					"display": "inline-block",
					"vertical-align": "top",
					"font-size": "1.2rem",
					"font-weight": "bold",
					"margin": "0",
					"padding": "0",
					"width": "6.0rem",
					"height": "2.0rem",
					"background-color": "#fff",
					"color": "#000"
					}
				)
				.appendTo($("#search-wrap"));

		var the_i_flag = false;
		$("<div>").appendTo($("#search-wrap"))
			.attr("id", "search-button4")
			.css({
				"display": "inline-block",
				"vertical-align": "top",
				"line-height": "1.8rem",
				"text-align": "center",
				"font-size": "1.0rem",
				"font-weight": "bold",
				"width": "2.0rem",
				"height": "2.0rem",
				"background-color": "#ff0",
				"color": "#aaa",
				"border-bottom": "1px solid #aaa",
				"transition": "background-color 0.5s"
				}
			)
			.click( function() {
					if (the_i_flag === false) {
						the_i_flag = true;
						$(this).css("color", "#000");
					} else if (the_i_flag === true) {
						the_i_flag = false;
						$(this).css("color", "#aaa");
					}
				}
			)
			.bind('mouseenter', function(e) {
							$(this).css("background-color", "#0ff");
							return false;
						}
			)
			.bind('mouseleave', function(e) {
							$(this).css("background-color", "#ff0");
							return false;
						}
			)
			.text("i");

		var the_m_flag = false;
		$("<div>").appendTo($("#search-wrap"))
			.attr("id", "search-button5")
			.css({
				"display": "inline-block",
				"vertical-align": "top",
				"line-height": "1.8rem",
				"text-align": "center",
				"font-size": "1.0rem",
				"font-weight": "bold",
				"width": "2.0rem",
				"height": "2.0rem",
				"background-color": "#ff0",
				"color": "#aaa",
				"border-bottom": "1px solid #aaa",
				"transition": "background-color 0.5s"
				}
			)
			.click( function() {
					if (the_m_flag === false) {
						the_m_flag = true;
						$(this).css("color", "#000");
					} else if (the_m_flag === true) {
						the_m_flag = false;
						$(this).css("color", "#aaa");
					}
				}
			)
			.bind('mouseenter', function(e) {
							$(this).css("background-color", "#0ff");
							return false;
						}
			)
			.bind('mouseleave', function(e) {
							$(this).css("background-color", "#ff0");
							return false;
						}
			)
			.text("m");

		var the_g_flag = false;
		$("<div>").appendTo($("#search-wrap"))
			.attr("id", "search-button6")
			.css({
				"display": "inline-block",
				"vertical-align": "top",
				"line-height": "1.8rem",
				"text-align": "center",
				"font-size": "1.0rem",
				"font-weight": "bold",
				"width": "2.0rem",
				"height": "2.0rem",
				"background-color": "#ff0",
				"color": "#aaa",
				"border-bottom": "1px solid #aaa",
				"transition": "background-color 0.5s"
				}
			)
			.click( function() {
					if (the_g_flag === false) {
						the_g_flag = true;
						$(this).css("color", "#000");
					} else if (the_g_flag === true) {
						the_g_flag = false;
						$(this).css("color", "#aaa");
					}
				}
			)
			.bind('mouseenter', function(e) {
							$(this).css("background-color", "#0ff");
							return false;
						}
			)
			.bind('mouseleave', function(e) {
							$(this).css("background-color", "#ff0");
							return false;
						}
			)
			.text("g");


		$("<div>").appendTo($("#search-wrap"))
			.attr("id", "search-button2")
			.css({
				"display": "inline-block",
				"vertical-align": "top",
				"line-height": "1.8rem",
				"text-align": "center",
				"font-size": "1.0rem",
				"font-weight": "bold",
				"width": "3.0rem",
				"height": "2.0rem",
				"background-color": "#ff0",
				"color": "#000",
				"transition": "background-color 0.5s"
				}
			)
			.bind('mouseenter', function(e) {
							$(this).css("background-color", "#0ff");
							return false;
						}
			)
			.bind('mouseleave', function(e) {
							$(this).css("background-color", "#ff0");
							return false;
						}
			)
			.text("Go");

		var the_bt3_backcol_hover = "#ff0";
		$("<div>").appendTo($("#search-wrap"))
			.attr("id", "search-button3")
			.css({
				"display": "inline-block",
				"vertical-align": "top",
				"line-height": "1.8rem",
				"text-align": "center",
				"font-size": "1.0rem",
				"font-weight": "bold",
				"width": "3.0rem",
				"height": "2.0rem",
				"background-color": "#ff0",
				"color": "#aaa",
				"transition": "background-color 0.5s"
				}
			)
			.bind('mouseenter', function(e) {
							$(this).css("background-color", the_bt3_backcol_hover);
							return false;
						}
			)
			.bind('mouseleave', function(e) {
							$(this).css("background-color", "#ff0");
							return false;
						}
			)
			.text("Back");

		$target_area.bind('click.jimmy-editor_search_showbox', function(e) {
			the_nextstart = e.target.selectionStart;
			$("#search-box").css("visibility", "visible");
			// Clear Existing Array for back
			the_past.length = 0;
			the_bt3_backcol_hover = "#ff0";
			$("#search-button3").css("color", "#aaa");
			return false;	
		});

		// Variable the_nextstart uses for search/ replace
		var the_nextstart = 0;
		var the_val_search = "";
		var the_search_regex = {};
		var the_val_replace = "";
		var the_past = [];
		$('#search-button2').bind('click.jimmy-editor_search_main', function(e) {
			var temp_search = $('#search-input1').val();
			if (the_val_search !== temp_search) {
				the_val_search = temp_search;
				the_nextstart = $target_area[0].selectionStart;
			}
			var temp_replace = $('#search-input2').val();
			if (the_val_replace !== temp_replace) {
				the_val_replace = temp_replace;
				the_nextstart = $target_area[0].selectionStart;
			}

			// If Caret is moved after search/ replace
			if (the_nextstart !== $target_area[0].selectionEnd) {
				the_nextstart = $target_area[0].selectionStart;
			}

			if (the_val_search === "") {
				$target_area[0].focus();
				return false;
			}		

			var val = $target_area[0].value;
			var modi = "";
			if (the_m_flag === true) {
				modi = modi + "m";
			}
			if (the_i_flag === true) {
				modi = modi + "i";
			}
			if (the_g_flag === true) {
				modi = modi + "g";
			}
			// Make RegExp
			the_search_regex = new RegExp(the_val_search, modi);

			if (the_select_flag === 1) {
			// Replace
				if (the_g_flag === true) {
					var cal = val.search(the_search_regex);
					if (cal === -1) {
						$target_area[0].focus();
						return false;
					} else {
						// Need to pre-select and refocus to scroll correctly in case of ranged selecting of the text
						$target_area[0].selectionStart = 0;
						$target_area[0].selectionEnd = 0;
						$(window).scrollTop(0);
						$('#search-input1').focus();
						$target_area[0].focus();
						
						$target_area[0].value = val.replace(the_search_regex, the_val_replace);
						the_nextstart = $target_area[0].value.length;
						$target_area[0].selectionStart = 0;
						$target_area[0].selectionEnd = the_nextstart;

						// Make memory limit
						if (the_past.length > 117) {
							for (var i = 0; i < 3 ; i++) {
								the_past.shift();
							}
						}
						the_past.push(-1);
						the_past.push(val);
						the_past.push(0);
					}
				} else {
					// Check the last action
					if (the_past[the_past.length - 1] === -1) {
						the_nextstart = $target_area[0].selectionStart;
					}

					// The main lines to replace
					var cal = val.substr(the_nextstart).search(the_search_regex);
					if (cal === -1) {
						//Back to Start
						cal = val.substr(0).search(the_search_regex);
						the_nextstart = 0;
						if (cal === -1) {
							$target_area[0].focus();
							return false;
						}
					}
					cal += the_nextstart;

					// Make memory limit
					if (the_past.length > 117) {
						for (var i = 0; i < 3 ; i++) {
							the_past.shift();
						}
					}
					// Push previous select
					the_past.push($target_area[0].selectionStart);
					the_past.push($target_area[0].selectionEnd);
					var temp_int = -1;
					the_past.push(temp_int);

					// Need to pre-select and refocus to scroll correctly in case of ranged selecting of the text
					$target_area[0].selectionStart = cal;
					$target_area[0].selectionEnd = cal;
					$(window).scrollTop(0);
					$('#search-input1').focus();
					$target_area[0].focus();

					// Returns whole matched string on [0]
					var mat = val.substr(the_nextstart).match(the_search_regex);
					var slice_p = cal + mat[0].length;
					var front_v = val.slice(0, cal);
					var rear_v = val.slice(slice_p);
					// Replace Itself
					$target_area[0].value = front_v + val.substr(cal).replace(the_search_regex, the_val_replace);

					val = $target_area[0].value;
					var reverse_leng = rear_v.length * -1;
					var replace_act = val.slice(front_v.length, reverse_leng);

					the_nextstart = cal + replace_act.length;
					$target_area[0].selectionStart = cal;
					$target_area[0].selectionEnd = the_nextstart;
					
					// Make memory limit
					if (the_past.length > 117) {
						for (var i = 0; i < 3 ; i++) {
							the_past.shift();
						}
					}
					the_past.push(cal);
					the_past.push(mat[0]);
					the_past.push(replace_act);
				}

				the_bt3_backcol_hover = "#0ff";
				$("#search-button3").css("color", "#000");
			
			} else if (the_select_flag === 0) {
			// Search
				// The main lines to search
				var cal = val.substr(the_nextstart).search(the_search_regex);
				if (cal === -1) {
					//Back to Start
					cal = val.substr(0).search(the_search_regex);
					the_nextstart = 0;
					if (cal === -1) {
						$target_area[0].focus();
						return false;
					}
				}
				cal += the_nextstart;

				// Make memory limit
				if (the_past.length > 117) {
					for (var i = 0; i < 3 ; i++) {
						the_past.shift();
					}
				}
				// Push previous select
				the_past.push($target_area[0].selectionStart);
				the_past.push($target_area[0].selectionEnd);
				var temp_int = -1;
				the_past.push(temp_int);
				the_bt3_backcol_hover = "#0ff";
				$("#search-button3").css("color", "#000");

				// Need to pre-select and refocus to scroll correctly in case of ranged selecting of the text
				$target_area[0].selectionStart = cal;
				$target_area[0].selectionEnd = cal;
				$(window).scrollTop(0);
				$('#search-input1').focus();
				$target_area[0].focus();

				// For Correct Scroll with Caret
				var front_v = val.slice(0, cal);
				var rear_v = val.slice(cal);
				$target_area[0].value = front_v + " " + rear_v;
				$target_area[0].value = front_v + rear_v;

				// Returns whole matched string on [0]
				var mat = val.substr(the_nextstart).match(the_search_regex);
				the_nextstart = cal + mat[0].length;
				$target_area[0].selectionStart = cal;
				$target_area[0].selectionEnd = the_nextstart;

			}

			$target_area.trigger('click.jimmy-editor_lines_showbox');

			return false;
		});

		$('.search-input').bind('keydown.jimmy-editor_search_main', function(e) {
			if (e.keyCode == 13) { // enter key
				e.preventDefault();
				$('#search-button2').trigger('click.jimmy-editor_search_main');
				return false;
			}
		});

		// Undo
		$('#search-button3').bind('click.jimmy-editor_search_undo', function(e) {

			if (the_past.length === 0) {
				$target_area[0].focus();
				return false;
			}

			var back_replace = the_past.pop();
			var back_search = the_past.pop();
			var cal = the_past.pop();

			if (cal === -1) {
			// If it was all replace
				// Need to pre-select and refocus to scroll correctly in case of ranged selecting of the text
				$target_area[0].selectionStart = 0;
				$target_area[0].selectionEnd = 0;
				$(window).scrollTop(0);
				$('#search-input1').focus();
				$target_area[0].focus();

				$target_area[0].value = back_search;
				the_nextstart = 0;
				$target_area[0].selectionStart = the_nextstart;
				$target_area[0].selectionEnd = the_nextstart;

			} else {
				// Need to pre-select and refocus to scroll correctly in case of ranged selecting of the text
				$target_area[0].selectionStart = cal;
				$target_area[0].selectionEnd = cal;
				$(window).scrollTop(0);
				$('#search-input1').focus();
				$target_area[0].focus();

				if (back_replace !== -1) {
				// If it was replace
					var val = $target_area[0].value;
					var slice_p = cal + back_replace.length;
					var front_v = val.slice(0, cal);
					var rear_v = val.slice(slice_p);
					$target_area[0].value = front_v + back_search + rear_v;
					the_nextstart = cal + back_search.length;
					$target_area[0].selectionStart = cal;
					$target_area[0].selectionEnd = the_nextstart;
				} else {
				// If it was search
					the_nextstart = cal;
					$target_area[0].selectionStart = cal;
					$target_area[0].selectionEnd = back_search;
				}

			}

			if (the_past.length === 0) {
				the_bt3_backcol_hover = "#ff0";
				$("#search-button3").css("color", "#aaa");
			}

			$target_area.trigger('click.jimmy-editor_lines_showbox');

			return false;
		});

		$('body').bind('mousemove.jimmy-editor_search', function(e) {

			if (g_sticker_flag === parseInt(order_num)) {
				// Slide the menu 4px minus of X and Y from the (mouse|touch) pointer
				$("#search-box").css({
						"left": e.clientX - 4 + "px",
						"top": e.clientY - 4 + "px"
						});

				return false;
			}
		});
	}


	/**
	 * Style Box Construction
	 * font color, font sytle and background color
	 */
	function styleBox(x_pos, y_pos, order_num) {
		// If moved already, retrieves its position
		if (window.sessionStorage.getItem("x-" + order_num)) {
			x_pos = window.sessionStorage.getItem("x-" + order_num);
		} else {
			// Convert the percentage of X positions to the pixel coordinate.
			var win_width = $(window).width();
			var x_pcent = parseInt(x_pos) / 100;
			x_pos = parseInt(win_width * x_pcent);
		}

		if (window.sessionStorage.getItem("y-" + order_num)) {
			y_pos = window.sessionStorage.getItem("y-" + order_num);
		} else {
			// Convert the percentage of Y positions to the pixel coordinate.
			var win_height = $(window).height();
			var y_pcent = parseInt(y_pos) / 100;
			y_pos = parseInt(win_height * y_pcent);
		}

		// Style retrieve
		if (window.sessionStorage.getItem("col-" + order_num)) {
			$target_area.css("color", window.sessionStorage.getItem("col-" + order_num));
		}
		if (window.sessionStorage.getItem("size-" + order_num)) {
			$target_area.css("font-size", window.sessionStorage.getItem("size-" + order_num));
		}
		if (window.sessionStorage.getItem("weight-" + order_num)) {
			$target_area.css("font-weight", window.sessionStorage.getItem("weight-" + order_num));
		}
		if (window.sessionStorage.getItem("backcol-" + order_num)) {
			$target_area.css("background-color", window.sessionStorage.getItem("backcol-" + order_num));
		}

		// Common
		$target_area.attr({
				"selectionStart": "0",
				"selectionEnd": "0"
				});

		$("<div>").appendTo($("body"))
			.attr({
				"id": "style-box",
				"class": "the-boxes"
				}
			)
			.css({
				"cursor": "pointer",
				"visibility": "hidden",
				"display": "block",
				"opacity": "0.8",
				"position": "fixed",
				"margin": "0",
				"padding": "0",
				"left": x_pos + "px",
				"top": y_pos + "px",
				"z-index": "100000",
				"width": "6.0rem",
				"height": "auto",
				"text-align": "left",
				"background-color": "#0ff",
				"color": "#000",
				"transition": "top 0.2s, left 0.2s"
				}
			);

		$("<div>").appendTo($("#style-box"))
			.attr({
				"id": "style-sticker",
				"class": "the-stickers"
				}
			)
			.css({
				"display": "inline-block",
				"vertical-align": "top",
				"text-align": "center",
				"width": "6.0rem",
				"height": "1.5rem",
				"background-color": "#f0f",
				"transition": "background-color 0.5s"
				}
			)
			.click( function() {
					if (g_sticker_flag === parseInt(order_num)) {
						g_sticker_flag = 0;
						$(".the-stickers").css("background-color", "#f0f");
						$(".the-pins").css({
									"border-right": "1.0em solid transparent",
									"border-left": "1.0em solid transparent"
								});
						var xstore = parseInt($("#style-box").css("left"));
 						window.sessionStorage.setItem("x-" + order_num, xstore);
						var ystore = parseInt($("#style-box").css("top"));
 						window.sessionStorage.setItem("y-" + order_num, ystore);
						return false;
					} else {
						g_sticker_flag = parseInt(order_num);
						$(".the-stickers").css("background-color", "#f0f");
						$(".the-pins").css({
									"border-right": "1.0em solid transparent",
									"border-left": "1.0em solid transparent"
								});
						$(this).css("background-color", "#ff0");
						$(this).children("div")
								.css({
									"border-right": "1.0em solid #0ff",
									"border-left": "1.0em solid #0ff"
								});
						return false;
					}
				}
			)
			.bind('mousemove', function(e) {
							// prevent propagation to parent tags (body)
							// not to move sticker in this block
							return false;
						}
			)
			.bind('mouseenter', function(e) {
							$(this).css("background-color", "#ff0");
							return false;
						}
			)
			.bind('mouseleave', function(e) {
							$(this).css("background-color", "#f0f");
							return false;
						}
			);

		$("<div>").appendTo($("#style-sticker"))
			.attr({
				"id": "style-pin",
				"class": "the-pins"
				}
			)
			.css({
				"display": "inline-block",
				"vertical-align": "top",
				"width": "0",
				"height": "0",
				"margin": "0",
				"padding": "0",
				"border-top": "2.0em solid #0ff",
				"border-right": "1.0em solid transparent",
				"border-left": "1.0em solid transparent",
				"transition": "border-right 0.5s, border-left 0.5s"
				}
			)
			.click( function() {
					g_sticker_flag = 0;
					$(".the-stickers").css("background-color", "#f0f");
					$(".the-pins").css({
							"border-right": "1.0em solid transparent",
							"border-left": "1.0em solid transparent"
							});
					$("#style-box").css("visibility", "hidden");
					$target_area[0].focus();
					return false;
				}
			);

		$("<div>").appendTo($("#style-box"))
			.attr("id", "style-text")
			.css({
				"display": "inline-block",
				"vertical-align": "top",
				"width": "6.0rem",
				"height": "auto",
				"line-height": "1.0rem",
				"text-align": "center",
				"font-size": "1.0rem",
				"white-space": "pre",
				"background-color": "#aff",
				"color": "#000"
				}
			)
			.click( function() {
					if(the_wrap === true) {
						$("#style-wrap").css("display", "none");
						$target_area[0].focus();
						the_wrap = false;
					} else if(the_wrap === false) {
						$("#style-wrap").css("display", "inline-block");
						the_wrap = true;
					}
					return false;
				}
			)
			.text("Font Color" + "\r\n" + "Size:Weight" + "\r\n" + "Back Color");
		
		var the_wrap = false;
		$("<div>").appendTo($("#style-box"))
			.attr("id", "style-wrap")
			.css({
				"display": "none",
				"vertical-align": "top",
				"width": "6.0rem",
				"height": "auto"
				}
			);
		// End of Common

		var font_color = $target_area.css("color");
		$("<input>").attr({
					"id": "style-input1",
					"class": "style-input",
					"type": "text",
					"placeholder": font_color
					}
				)
				.css({
					"display": "inline-block",
					"vertical-align": "top",
					"font-size": "0.7rem",
					"font-weight": "bold",
					"margin": "0",
					"padding": "0",
					"width": "6.0rem",
					"height": "2.0rem",
					"background-color": "#fff",
					"color": "#000"
					}
				)
				.appendTo($("#style-wrap"));

		var font_params = $target_area.css("font-size") + ":" + $target_area.css("font-weight");
		$("<input>").attr({
					"id": "style-input2",
					"class": "style-input",
					"type": "text",
					"placeholder": font_params
					}
				)
				.css({
					"display": "inline-block",
					"vertical-align": "top",
					"font-size": "0.7rem",
					"font-weight": "bold",
					"margin": "0",
					"padding": "0",
					"width": "6.0rem",
					"height": "2.0rem",
					"background-color": "#fff",
					"color": "#000"
					}
				)
				.appendTo($("#style-wrap"));

		var back_color = $target_area.css("background-color");
		$("<input>").attr({
					"id": "style-input3",
					"class": "style-input",
					"type": "text",
					"placeholder": back_color
					}
				)
				.css({
					"display": "inline-block",
					"vertical-align": "top",
					"font-size": "0.7rem",
					"font-weight": "bold",
					"margin": "0",
					"padding": "0",
					"width": "6.0rem",
					"height": "2.0rem",
					"background-color": "#fff",
					"color": "#000"
					}
				)
				.appendTo($("#style-wrap"));


		$("<div>").appendTo($("#style-wrap"))
			.attr("id", "style-button1")
			.css({
				"display": "inline-block",
				"vertical-align": "top",
				"line-height": "1.8rem",
				"text-align": "center",
				"font-size": "1.0rem",
				"font-weight": "bold",
				"width": "6.0rem",
				"height": "2.0rem",
				"background-color": "#ff0",
				"color": "#000",
				"transition": "background-color 0.5s"
				}
			)
			.bind('mouseenter', function(e) {
							$(this).css("background-color", "#0ff");
							return false;
						}
			)
			.bind('mouseleave', function(e) {
							$(this).css("background-color", "#ff0");
							return false;
						}
			)
			.text("Change");

		$target_area.bind('click.jimmy-editor_style_showbox', function(e) {
			$("#style-box").css("visibility", "visible");
			return false;	
		});

		$('#style-button1').bind('click.jimmy-editor_style_main', function(e) {
			if ($('#style-input1').val() !== "" ) {
				var font_color = $('#style-input1').val();
			} else {
				var font_color = $target_area.css("color");
			}

			var parm = $('#style-input2').val();
			parm = parm.split(":", 2);
			if (parm[0] !== "" ) {
				var font_size = parm[0];
			} else {
				var font_size = $target_area.css("font-size");
			}

			if (parm[1] !== "" ) {
				var font_weight = parm[1];
			} else {
				var font_weight = $target_area.css("font-weight");
			}

			if ($('#style-input3').val() !== "" ) {
				var back_color = $('#style-input3').val();
			} else {
				var back_color = $target_area.css("background-color");
			}

			$target_area.css({
					"color": font_color,
					"font-size": font_size,
					"font-weight": font_weight,
					"background-color": back_color
					}
				)

 			window.sessionStorage.setItem("col-" + order_num, $target_area.css("color"));
 			window.sessionStorage.setItem("size-" + order_num, $target_area.css("font-size"));
 			window.sessionStorage.setItem("weight-" + order_num, $target_area.css("font-weight"));
 			window.sessionStorage.setItem("backcol-" + order_num, $target_area.css("background-color"));

			$('#style-input1').attr('placeholder', $target_area.css("color"));
			$('#style-input2').attr('placeholder', $target_area.css("font-size") + ":" + $target_area.css("font-weight"));
			$('#style-input3').attr('placeholder', $target_area.css("background-color"));

			$target_area[0].focus();

			return false;
		});

    		$('.style-input').bind('keydown.jimmy-editor_style_main', function(e) {
			if (e.keyCode == 13) { // enter key
				e.preventDefault();
				$('#style-button1').trigger('click.jimmy-editor_style_main');
				return false;
			}
		});

		$('body').bind('mousemove.jimmy-editor_style', function(e) {

			if (g_sticker_flag === parseInt(order_num)) {
				// Slide the menu 4px minus of X and Y from the (mouse|touch) pointer
				$("#style-box").css({
						"left": e.clientX - 4 + "px",
						"top": e.clientY - 4 + "px"
						});

				return false;
			}
		});
	}


	/**
	 * Stop Click Event when "Sticker Box" moving is on active
	 */
	function stopClickEvent() {
		$('*').bind('click.jimmy-editor_stopclick', function(e) {
			if (g_sticker_flag === 0) {
				return true;
			}
			// return false means stopPropagation() and preventDefault()
			e.preventDefault();
		});

		// Stop "click" is not perfect. Add "mousedown" and "mouseup"
		$('*').bind('mousedown.jimmy-editor_stopclick', function(e) {
			if (g_sticker_flag === 0) {
				return true;
			}

			e.preventDefault();
		});

		$('*').bind('mouseup.jimmy-editor_stopclick', function(e) {
			if (g_sticker_flag === 0) {
				return true;
			}

			e.preventDefault();
		});
	}

	return true;

})(jQuery);
