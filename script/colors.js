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