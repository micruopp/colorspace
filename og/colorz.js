
/**
 * 
 * NOTES:
 *  - the suggestions on my touch bar are able to be entered in the input...
 */



/**
 * Onload function for colorz.html
 */
$(function() {

	let apex      = $('#box-container')
	let input     = $('#color-field-input')
	// let container = $('#color-field-container')
	let container = $('#box-color-input')

	let light = 'light'
	let dark  = 'dark'

	apex.addClass(dark)
	apex.css('background-color', '#ffffff')

	isValidHexValue(input.val())
	validHex = /[0-9a-fA-F]/

	input.keydown(function(e) {
		if (e.key.length == 1 && validHex.test(e.key)) {
			return true
		} else if (e.key == 'Backspace' || e.key == 'ArrowLeft' || e.key == 'ArrowRight') {
			return true 
		} else {
			return false
		}
	})

	input.keyup(function(e) {
		let inputHex = $(this).val()
		let background = apex.css('background-color').match(/\d+/g)

		let bgRed   = parseInt(background[0]).toString(16)
		let bgGreen = parseInt(background[1]).toString(16)
		let bgBlue  = parseInt(background[2]).toString(16)

		let backgroundHex
		if (bgRed.length == 1 && bgGreen.length == 1 && bgBlue.length == 1) {
			backgroundHex = bgRed + bgRed + bgGreen + bgGreen + bgBlue + bgBlue
		} else {
			backgroundHex = bgRed + bgGreen + bgBlue
		}

		// if inputHex != backgroundHex && inputHex is of length 3 or 6
		if (inputHex != backgroundHex && inputHex.length == 6) {
			console.log("Different color")
			setPreviewTo($(this).val())
		}
	})

	let bottomBorder = 'bottom-border'
	input.focus(function() {
		container.addClass(bottomBorder)

		$(this).one('mouseup', function() {
			$(this).select()
			return false
		})
		.select()
	})

	input.focusout(function() {
		container.removeClass(bottomBorder)
		// Replace incomplete hex with background color
	})
})



/**
 * 
 */
function isValidHexValue(input) {
	// if length == 3 || 6
	// if all chars are 0-f

	// or, you know, just use a regex like a sane programmer
	// this can be done in the html, with "maxlength" and "pattern" attributes

	// I suppose i still need to check length, depending on what happens
	//   when you try to set the background color with an invalid rgb value
}

/**
 *
 */
function setPreviewTo(colorRaw) {
	let preview = $('#box-container')

	// if (colorRaw.length == 3 || colorRaw.length == 6) {
	if (colorRaw.length == 6) {

		// this should have a switch input based on type of color
		//  hex, rgba, etc.

		if (colorRaw == '') {
			// TO-DO: this 'if' should probably be handled higher up
			preview.css('background-color', '#FFFFFF')
		} else {
			preview.css('background-color', '#' + colorRaw)
			setFontColor(colorRaw)
		}	

	}
}

/** 
 * Checks whether the overlaying font should have
 *   the 'light' or 'dark' class applied to it
 *
 * https://www.w3.org/TR/AERT/#color-contrast
 * The range for color brightness difference is 125. The range for color difference is 500.
 *
 *
 * @param {rgba} backgroundColor
 */
function setFontColor(backgroundColor) {
	let apex = $('#box-container')
	let bgColor = colorFromHex(backgroundColor)

	// Black computes to 0, white to 255
	let brightThreshold = 125

	// Contrast classes
	let light = 'light'
	let dark  = 'dark'

	let brightness = calculateBrightness(bgColor)
	if (brightness > brightThreshold) {
		// Whatever this should be applied to needs 'inherit';
		//   namely, font colors, borders, etc.
		// The exception is icons / images that need to be customized
		apex.addClass(dark).removeClass(light)

	} else {
		apex.addClass(light).removeClass(dark)
	}
}

function calculateBrightness(color) {
	return ((color.red * 299) + (color.green * 587) + (color.blue * 114)) / 1000
}

function calculateBrightnessDifference(c1, c2) {
	// Color brightness is determined by the following formula:
	// ((Red value X 299) + (Green value X 587) + (Blue value X 114)) / 1000
	// Note: This algorithm is taken from a formula for converting RGB 
	//   values to YIQ values. This brightness value gives a perceived brightness for a color.

	backgroundBrightness = ((c1.red * 299) + (c1.green * 587) + (c1.blue * 114)) / 1000
	fontBrightness       = ((c2.red * 299) + (c2.green * 587) + (c2.blue * 114)) / 1000

	return Math.abs(backgroundBrightness - fontBrightness)
}

function calculateColorDifference(c1, c2) {
	// Color difference is determined by the following formula:
	// (maximum (Red value 1, Red value 2) - minimum (Red value 1, Red value 2)) 
	//   + (maximum (Green value 1, Green value 2) - minimum (Green value 1, Green value 2)) 
	//   + (maximum (Blue value 1, Blue value 2) - minimum (Blue value 1, Blue value 2))

	return (Math.max(c1.red, c2.red) - Math.min(c1.red, c2.red)) + (Math.max(c1.green, c2.green) - Math.min(c1.green, c2.green)) + (Math.max(c1.blue, c2.blue) - Math.min(c1.blue, c2.blue))
}

/**
 *
 * sourced from: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 */
function colorFromHex(rawHex) {
	var hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(rawHex),
		red,
		green,
		blue,
		alpha

	if (hex) {
		red   = parseInt(hex[1], 16)
		green = parseInt(hex[2], 16)
		blue  = parseInt(hex[3], 16)
		alpha = 1.0
	}
	
	return new Color(red, green, blue, alpha)
}

function Color(red, green, blue, alpha) {
	this.red   = red
	this.green = green
	this.blue  = blue
	this.alpha = alpha

	this.brightness = 0
}

Color.prototype.toRgb = function() {

}

Color.prototype.toRgba = function() {

}

Color.prototype.toHex = function() {
	// .toString(16)
}