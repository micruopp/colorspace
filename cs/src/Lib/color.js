(() => {
  console.log('hello from `Lib/color.js`');
  console.log("this works. that's funny");
})();


/**
 * Gamut.
 * Color space.
 * Color model.
 * Color.
 */

/**
  * I've debated between storing values defacto RGB and always converting to 
  * other colorspaces, or always storing all value sets. The latter requires 
  * all to be calculated on change. 
  * This sounds heavy in the context I'm trying to use this, which has led me
  * to defaulting to rgb. That works for most things and is the default, 
  * anyways.
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

Color.prototype.toRGB = () => {};
Color.prototype.toHex = () => {};
Color.prototype.toHSL = () => {};
Color.prototype.toHWB = () => {};

// For converting to strings
// returns 'rgb(1,2,3)'
// or 'hwb(125, 50, 25)'
Color.prototype.to = () => {};
// For converting to data types
// returns { r: 1, g: 2, b: 3 }
// or { h: 125, w: 50, b: 25 }
Color.prototype.get = () => {};


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

function generateRandomRGBString() {
	let color = generateRandomRGB();
  return `rgb(${color.red}, ${color.green}, ${color.blue})`;
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
//   values to YIQ values. 
// This brightness value gives a perceived brightness for a color.
function calculateBrightnessDifference(c1, c2) {
	let backgroundBrightness = ((c1.red * 299) + (c1.green * 587) + (c1.blue * 114)) / 1000;
	let fontBrightness       = ((c2.red * 299) + (c2.green * 587) + (c2.blue * 114)) / 1000;

	return Math.abs(backgroundBrightness - fontBrightness);
}

// Color difference is determined by the following formula:
// (maximum (Red value 1, Red value 2) - minimum (Red value 1, Red value 2)) 
//   + (maximum (Green value 1, Green value 2) - minimum (Green value 1, Green value 2)) 
//   + (maximum (Blue value 1, Blue value 2) - minimum (Blue value 1, Blue value 2))
// So, it's the sum of the absolutes of the differences.
function calculateColorDifference(c1, c2) {
	return (Math.max(c1.red, c2.red) - Math.min(c1.red, c2.red)) + (Math.max(c1.green, c2.green) - Math.min(c1.green, c2.green)) + (Math.max(c1.blue, c2.blue) - Math.min(c1.blue, c2.blue));
}

