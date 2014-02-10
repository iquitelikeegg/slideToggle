slideToggle
===========

A jQuery toggle switch! Me too!

slideToggle is a useful sliding toggle form element, which works with javascript and CSS.

slideToggle allows you to replace checkbox elements with slideToggle elements and provides the ability to override the default styles with custom styles and chain on callbacks with parameters. for powerful and elegant form functionality.

SlideToggle is all made in CSS and javascript, with no images and the switch actually slides scross rather than having the width shrinking behaviour like other commonly encountered toggle switches. 

SlideToggle can be integrated straight into any existing application.

To instantiate a slideToggle: 

1. Create a checkbox input which you wish to be replaced by the slider

2. Pass the slideToggle to a variable: eg. var example = new slideToggle(...);

	b. slideToggle slideToggle(str elementSelector, obj options, obj callback);

		elementSelector: The string jQuery-style selector for the checkbox you wish to replace
		options: MUST include the property "id" the slideToggle's ID will be in the form"slideToggle_**YOUR_CUSTOM_ID_STRING**". 
		Also str options.class - to add a class to the slideToggle. obj options.css - to add extra css properties. obj options.cbOptions - to provide parameters to your callback function in the form of an object. 
		callback: a standard javascript callback function - you can pass it parameters using the options parameter above. The callback will trigger on each toggle. 

3. Profit!

Notes:

The toggle switch works (like many others) by keeping your original checkbox input, and keeping it hidden - in this instance inside a wrapping <div> which groups the hidden checkbox and the visual element together. The hidden checkbox element, continues to store the value of the parameter - this way, slideToggle remains purely a visual plugin and you can use the original ID that you assigned (or another javascript form method) to fetch the value of the input.

If you have any questions then please ask! This is a rather rough item - and feel free to suggest improvements but if you do find it useful then great!
