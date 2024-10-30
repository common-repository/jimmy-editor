=== Jimmy Editor ===
Contributors: kenjmk7r9merchant
Plugin Name: Jimmy Editor
Plugin URI: http://electronics.jimmykenmerchant.com/jimmy-editor/
Tags: editor, admin, administrator, customize, post, theme, plugin
Author: Kenta Ishii
Author URI: http://electronics.jimmykenmerchant.com
Requires at least: 4.7
Tested up to: 4.9
Stable tag: 1.0.4
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

== Description ==
Regular Expression Search and Replace on WordPress Editor. Plus, it's a suggestion that you can have freedom of making Web Browser Based Applications (Web Apps). Movable Graphical Interfaces in Web browsers, I called it as "Sticker Box", makes your plot for Web Apps to be layout free and improve its usability. In this plugin, "Sticker Box" is used as a bunch of editor tools, "Lines Box", "Search Box" and "Style Box". This tools gives you how well "Sticker Box" works in Web browsers.

= Instruction =

Jimmy Editor is a plugin for patching default editors of WordPress. The beginning of this plugin was from my thought, "how can I use the tab key to insert a indent on Post Editor ("Text" mode) as well as Plugin and Theme Editor?" This is resolved by "post-editor-patch.js", because this issue is derived from ID naming for "textarea" tag. In addition, I tried to make some editorial functions: "Line number detection", "search, replace and delete of the word in the text" and "style changer for the text area" are considered. Plus, I also considered some movable interface for these functions on Web browsers. I named my movable interface to "Sticker Box". It's not only like the window system on your PC, but able to work on your tablet or phone. I can say that my movable interface is making compatibility between mouse pointers and touching devices, because my movable interface is using universal trigger, "mousemove" which used to occur on many touching panels on mobile devices, but not all, to make compatibility with traditional mouse system on PC.

Web Browser Based Applications (Web Apps) has a good key to the future because its compatibility has better than Computer Based Applications (Native Apps). If You make one Web App, your Web App works on every browser in every platform. But it's ideal — many developers are trying this, then finding some issues — and browsers are growing their performances. In fact, it's a heavy loader, a big owner of memory in your computer. Because computers are having big memory and good speed these days, it's time to open the door to the future of Web Apps. I'm now trying to make ideal Web App!

= Copyright =

The Jimmy Editor, A WordPress Plugin, Copyright 2017 Kenta Ishii
Jimmy Editor is distributed under the terms of the GNU GPL

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

== Screenshots ==
1. Displaying Lines and Columns on Lines Box with folded "Sticker Box".
2. Using of Search Box with Regular Expression, "/load.*/i".
3. Using of inserting tab indents to selected lines on Lines Box.

== Installation ==

From "Plugins" of your admin page, just search and install "Jimmy Editor". Make sure to activate "Jimmy Editor" in "Installed Plugins", a "Plugins" sub menu.

You can download and test the latest version of this plugin from GitHub public repository. <https://github.com/JimmyKenMerchant/jimmy-editor/>

In my experience, wp_enqueue_script where deps as array('jquery') was wrong for adding scripts of jQuery on both the normal page and the admin page. By typing "true" on the last argument of wp_enqueue_script, the script will be on the footer. This may be good for your scripts of jQuery because jQuery usually handles HTML DOM (Document Object Model) which needs to be loaded.

== Frequently Asked Questions ==

= Tutorial =

I. Brief

Touch or click Magenta Label on "Sticker Box", then you touch another point or move your mouse. You can see the movable menu, "Sticker Box". Stick it where you want, by touching or clicking Magenta Label again. You can hide "Sticker Box" by touching or clicking Cyan Triangle. You can reshow "Sticker Box" by touch or click your text area. Light Cyan Label is its text, and if you touch or click it, "Sticker Box" will show Function. White Label is a input area where you can write parameters of functions on "Sticker Box". Yellow Label is a button to command Function.


II. Lines Box

Touch or click your text area, then you can know where the caret in your text is placed on. Type the line number and/or the character number on White Label and touch or click "Go" or press Enter so that your caret moves where you want, e.g., typing "20:6" means your caret moves to the 20th line and the 6th character of the line. Typing "3" means the caret moves to the 3rd line and its beginning.

Touch or click "Top" to take your caret to the top of your text area.

Touch or click "Last" to take your caret to the bottom of your text area.

Select the range of the text, then touch or click "+>" to insert tab indent.

Select the range of the text, then touch or click "<-" to reduce tab indent.


III. Search Box

Change Command by touching or clicking "Select" which toggles "Search" and "Replace".

On "Search": Type your target word on the "Search?" White Label.

On "Replace": Type your target word on the "Search?" White Label, your demand word on the "Replace?". If you want to delete a word, make sure not to type any word on the "Replace?".

Because your target word is based on Regular Expression, in several cases, you need to write the word with the rule of Regular Expression, e.g., if you want search "*", write it with escape character such as "\*", and if you want search two spaces, write "\s\s". Also see below described for Regular Expression. Back reference can be used.

Then touch or click "Go" or press Enter.

If "Back" is active, you can undo these commands. "Back" is only up to 40 times because of saving memory loading. Replacing and Deleting reduce the limit of storing memory for "Back". If you click or touch your text area, "Back" is deactivated and cleaned past activities.

This Search Box is searching the word by JavaScript's Regular Expression. Type your search word by the rule of Regular Expression without delimiters, and select "m" (multi-lines modifier for use "^", "$" on each lines), "i" (ignore cases), and/or "g" (global).


IV. Style Box

Each current status is indicated on White Label. The top is font color, the middle is font size and font weight, the bottom is background color.

On Top and Bottom: Type color code by Hexadecimal style (e.g. "#89abcd") or just as displayed [e.g. "rgb(123,213,132)"] to change font and background color.

On Middle: Type font size and font weight. Connect these by one colon, e.g, "14px:bold" means font size will be 14px and font weight will be bold (typically shows "700" numerically as a result). Typing "14px" means font size will be 14px and font weight will not be changed. Typing ":400" means font size will not be changed and font weight will be 400.

Then touch or click "Change" or press Enter.


V. Position and Style Saving

Positions of Boxes and the style changed by Style Box will be saved. But these have limitation. If you close your browser or current window, saved positions will be erased.


VI. Stop Default Click Events when "Sticker Box" Moving is on Active

When any Box has been moving by clicking Magenta Label, and Cyan Triangle has been changed to Square, default click events will be stopped for usability of moving "Sticker Box", particularly on touching devices to stop opening links to other pages. If you want retrieve default click events, click Cyan Square of any "Sticker Box" to change to Triangle.

= Compatibility =

I. Web Browsers
Worked on Chrome, Opera and Firefox. On Edge (38.14393.0.0), Search Box has not been worked, and on Internet Explorer 11, scrolling has not been synchronized with functions of Lines Box and Search Box. Other browsers have not been tested.


II. OSs and Devices
I tested this plugin on Linux PC, Windows 10 PC, and Android Mobile Device. In these, this plugin works. But the "mousemove" event for moving "Sticker Box" may not be embedded in any mobile device. You may meet an issue of moving "Sticker Box".

= What will you do here in the future? =

I'm thinking of colorful editor in this plugin. This would be embedded to default editor. Absolutely, it would be depend on a renowned HTML5 "contenteditable" attribute to "div" and tag replacing technique of jQuery. If you have some curious, please note it in the support forum of this plugin.

== Upgrade Notice ==
= 1.0.4 =
Please upgrade because of fixing bugs and having new futures: Confirmed Compatibility with WordPress Version 4.9.

== Changelog ==

This Changelog is including results of compatibility tests. These tests assume latest versions of Web Browsers as of the date written in each log, if additional version information doesn't been added to each name.

= 1.0.4 =
* Confirmed Compatibility with WordPress Version 4.9
* WordPress 4.9 modified editors of plugins and themes. If you want Jimmy Editor in editors of both, check "Disable syntax highlighting when editing code" on Profile.
: April 26, 2018

= 1.0.3 =
* Confirmed Compatibility with WordPress Version 4.8
: June 10, 2017

= 1.0.2 =
* Modified Search Box to make Regular Expression become enable to use back reference and to use "g" mode modifier
* Added tab indent functions to Lines Box
* Confirmed pre-selecting (no ranged) is needed to scroll correctly on Lines Box and Search Box, in case of ranged selecting of the text with the function.
: April 24, 2017

= 1.0.1 =
* Fixed Bug that when you want to replace some word which includes the target word; particularly, replacing stops
* Added minimized files of JavaScript
: April 17, 2017

= 1.0 =
* Release in WordPress.org
: April 17, 2017

= 0.9.9.3 Beta =
* Added indication of the line number and the character number when the keyup event
* Set the default mode of Post Editor to "Text" mode
: April 10, 2017

= 0.9.9.2 Beta =
* Reviewed comments | Modified post-editor-patch.js
: April 9, 2017

= 0.9.9.1 Beta =
* Changed method for detection of "textarea" tag to fit other scripts | Modified README.txt
: April 8, 2017

= 0.9.9 Beta =
* Last Check for Release in WordPress.org
* In IE (Internet Explorer 11) and Firefox, window scrolling has high fidelity, e.g. on Post Editor, push "Last" in Lines Box several times, then you can watch temporary scrolling to the top of the page and going back to the last of "textarea" tag. Besides, Chrome, Opera and Edge don't have this temporary scrolling. In my code, before refocusing to "textarea", I added window scrolling to the top (e.g. script-jimmy-editor-admin.js line No.387). Therefore, IE and Firefox have right answer. But in my opinion, functionally, Chrome, Opera and Edge are right because such a temporary scrolling is ugly. I think this difference derived from the difference of graphic improvement (such as hardware usage) in browsers. Chrome, Opera and Edge use graphic hardware in addition to CPU for rendering graphic more actively. IE and Firefox (the successor of Netscape Navigator) use graphic hardware as GPU Acceleration, but these are an option. Probably, this difference don't come from usage of graphic hardware directly. But to adapt graphic hardware to themselves, Chrome, Opera and Edge seem to write codes around graphic more newly than IE and Firefox. Personally, I like IE and Firefox because these are truly giants of Internet from Pre-Millenium. But I have to suggest them to rewrite their codes around graphic better than now. Particularly, Firefox is a front runner of Internet. I should want Firefox to run towards the graphic front of Internet.
: April 6, 2017

= 0.9.8 Beta =
* Improved initial X Y positions of each Box | Modified Usability on Touching Device
* Last Trial for Release in WordPress.org
* (*Already Resolved by adding to reset window Y scroll in this version*) Firefox, IE and Edge's issue to hide top level of "textarea" tag when "Top" in Lines Box seems to scroll to the top of the "textarea", not the top of "form" tag (Parent of "textarea") in default, unlike Chrome and Opera. If wanting to fix this problem, make the function to jump to the top of "form" tag manually when "Top" and "Go" to low numbered lines.
* Edge (version 38.14393.0.0)'s issue to stop searching and not to be able to search the next word in Search Box randomly seems tricky because in IE (Internet Explorer 11), searching is well done except scrolling. Edge is a de facto later version of IE. Plus, if you double click "Go" button, searching go ahead to the next word. The reason of this issue seems a pointing problem, resetting cursor positions and pointing the end of the text area, after focusing other elements (e.g. put cursor on any point in the text area then start search, it starts from the end of the text area then hits the first searched word of the text area). IE clears this problem. To avoid this issue, it is needed to make function to save previous cursor positions manually before focusing other elements. But I decided to stay this issue because of correctness in IE, a de facto earlier version of Edge. I'm going to report this issue to Microsoft for the improvement of Edge.
: April 5, 2017

= 0.9.7 Beta =
* Changed the type of the pointing cursor for each Box | Modified README.txt
: April 4, 2017

= 0.9.6 Beta =
* Added Functions (such as Back to Start) for Search Box
: April 3, 2017

= 0.9.5 Beta =
* Added Modifier for Regular Expression in Search Box | Reviewed Text Domain
: April 1, 2017

= 0.9.4 Beta =
* Added Position and Style Saving
: March 21, 2017

= 0.9.3 Beta =
* Modified Regular Expression Searching in Search Box
: March 21, 2017

= 0.9.2 Beta =
* Trial on Browsers | Added Folding Function
* On Firefox (Android) Worked.
* On Chrome (PC), Opera (PC), Chrome (Android) and Opera (Android) Worked by adding refocusing the text area and dummy editing of text.
* On IE (Internet Explorer 11), scrolling has not been synchronized with functions of Lines Box and Search Box.
* On Edge (version 38.14393.0.0), an issue of scrolling similar to Firefox (PC version 52.0.1) exists, plus Search Box has not been worked. Lines Box and Style Box have been worked on Edge.
: March 21, 2017

= 0.9.1 Beta =
* Added Font | Background-color Style Changer
* On Firefox (PC version 52.0.1) Worked. But on Post Editor, scrolling has an issue, e.g., when clicking "Top", not showing the top level of the text area.
: March 19, 2017

= 0.9 Beta =
* Beta Release: March 17, 2017
