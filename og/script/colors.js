'use strict';

/**
 * Web Development Toolbox
 * colors.js
 * 
 * Copyright 2020 Mic Ruopp. All rights reserved.
 */

/* 
 * Color Generation
 */

/**
 * @param {} options An optional type.
 * @return {}
 */
function randomColorString(options) {
	let type = options || null;
	let string = null;

	switch (type) {
		case 'hex':
			string = generateRandomHexString();
			break;
		case 'rgb':
		default:
			string = generateRandomRGBString();
	}

	return string;
}

/**
 * @return {}
 */
function generateRandomRGBString() {
	let color = generateRandomRGB();
	let string = 'rgb(' + color.red + ', ' + color.green + ', ' + color.blue + ')';
	return string;
}

/**
 * @return {}
 */
function generateRandomHexString() {
	let color = generateRandomRGB();
	let r = color.red.toString(16);
	let g = color.green.toString(16);
	let b = color.blue.toString(16);

	let rr = r.length == 2 ? r : '0' + r;
	let gg = g.length == 2 ? g : '0' + g;
	let bb = b.length == 2 ? b : '0' + b;
	let string = '#' + rr + gg + bb;

	return string;
}

/**
 * @return {}
 */
function generateRandomRGB() {
	/*
	 * RGB is the common unit, since this is how it must be rendered.
	 */

	function randomValue() { return Math.round(Math.random() * 255) }

	let r = randomValue();
	let g = randomValue();
	let b = randomValue();

	// return { red: r, green: g, blue: b };
	return new Color(r, g, b);
}






// https://www.w3.org/TR/AERT/#color-contrast
// The range for color brightness difference is 125. The range for color difference is 500.

// Color brightness is determined by the following formula:
// ((Red value X 299) + (Green value X 587) + (Blue value X 114)) / 1000
// Note: This algorithm is taken from a formula for converting RGB 
//   values to YIQ values. This brightness value gives a perceived brightness for a color.
function calculateBrightnessDifference(c1, c2) {
	let backgroundBrightness = ((c1.red * 299) + (c1.green * 587) + (c1.blue * 114)) / 1000;
	let fontBrightness       = ((c2.red * 299) + (c2.green * 587) + (c2.blue * 114)) / 1000;

	return Math.abs(backgroundBrightness - fontBrightness);
}

// Color difference is determined by the following formula:
// (maximum (Red value 1, Red value 2) - minimum (Red value 1, Red value 2)) 
//   + (maximum (Green value 1, Green value 2) - minimum (Green value 1, Green value 2)) 
//   + (maximum (Blue value 1, Blue value 2) - minimum (Blue value 1, Blue value 2))
function calculateColorDifference(c1, c2) {
	return (Math.max(c1.red, c2.red) - Math.min(c1.red, c2.red)) + (Math.max(c1.green, c2.green) - Math.min(c1.green, c2.green)) + (Math.max(c1.blue, c2.blue) - Math.min(c1.blue, c2.blue));
}








/**
 * Gamut.
 * Color space.
 * Color model.
 * Color.
 */

function Color(r, g, b) {
	// Defaults channel to 0
	this.red =   	r || 0;
	this.green = 	g || 0;
	this.blue =  	b || 0;
}

Color.prototype.toString = function() {
	let string = 'rgb(' + this.red + ', ' + this.green + ', ' + this.blue + ')';
	return string;
}

Color.prototype.toHexString = function() {
	let r = this.red.toString(16);
	let g = this.green.toString(16);
	let b = this.blue.toString(16);

	let rr = r.length == 2 ? r : '0' + r;
	let gg = g.length == 2 ? g : '0' + g;
	let bb = b.length == 2 ? b : '0' + b;

	let string = '#' + rr + gg + bb;
	return string;
}









































/// [Name]
/// colors.js
///

/// [Copyright]
/// Copyright 2019 Mic Ruopp.
///

/// [Description]
/// Colors is a set of tools used to measure and
/// manipulate colors.

/// [Notes]
/// This is still a work in progress. There is no
/// standard for how colors are handled or 
/// represented.
///
/// That is probably one of the first things to do.
///


/*

For types I could do a string-based approach.
It would be passed as a parameter.
	// Maybe pass a type (read: broken down into its pieces) as a parameter?


*/



/*
function calculateBrightnessDifference(c1, c2) {
	return Math.abs(c1.calcBrightness() - c2.calcBrightness())
}

function calculateColorDifference(c1, c2) {
	let rDiff = Math.abs(c1.rgba.red - c2.rgba.red)
	let gDiff = Math.abs(c1.rgba.green - c2.rgba.green)
	let bDiff = Math.abs(c1.rgba.blue - c2.rgba.blue)

	return rDiff + gDiff + bDiff
}
*/

function calculateBrightnessOfRGB({ red, green, blue }) {
	let brightness = (red * 299 + green * 587 + blue * 114) / 1000;
	return brightness;
}

// function colorIsLight() {}

function generateRandomColor() {
	let r = Math.random() * 255;
	let g = Math.random() * 255;
	let b = Math.random() * 255;

	let red = Math.floor(r);
	let green = Math.floor(g);
	let blue = Math.floor(b);

	return { red, green, blue };
}

function rgbToString({ red, green, blue }) {
	let string = "rgb(" + red + ", " + green + ", " + blue + ")";
	return string;
}

function rgbToHexString({ red, green, blue }) {

	let rr = red.toString(16);
	let gg = green.toString(16);
	let bb = blue.toString(16);

	if (rr.length == 1) {
		rr = '0' + rr;
	}

	if (gg.length == 1) {
		gg = '0' + gg;
	}

	if (bb.length == 1) {
		bb = '0' + bb;
	}

	let string = "#" + rr + gg + bb;
	return string;
	
}