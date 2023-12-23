'use strict';

/*
 * TODO: Header, Copyright
 */

window.onload = main;



// Constants

let SPACE_ID = "space";

let RED_PANEL_ID = "red-panel";
let GREEN_PANEL_ID = "green-panel";
let BLUE_PANEL_ID = "blue-panel";

let RED_INPUT_ID = "red-input";
let GREEN_INPUT_ID = "green-input";
let BLUE_INPUT_ID = "blue-input";

let PANEL_CLASS = ".panel.box";
let INPUT_CLASS = ".input";

let RGB_MIN = 0;
let RGB_MAX = 255;


// Settings

// TODO: Convert these to booleans
let scrollInversion = 1; // 1 or -1
let touchInertia = 0; // 0 or 1

function main() {
	// _main();

	app();
}

function app() {

	// Initially only in RGB colorspace.
	// The idea (hence the name) is to be able to convert between
	// 		colorspaces.

	// Query objects

	let space = document.getElementById(SPACE_ID);

	let panels = document.querySelectorAll(PANEL_CLASS);
	let inputs = document.querySelectorAll(INPUT_CLASS);

	let redInput = document.getElementById(RED_INPUT_ID);
	let greenInput = document.getElementById(GREEN_INPUT_ID);
	let blueInput = document.getElementById(BLUE_INPUT_ID);

	let redPanel = document.getElementById(RED_PANEL_ID);
	let greenPanel = document.getElementById(GREEN_PANEL_ID);
	let bluePanel = document.getElementById(BLUE_PANEL_ID);

	// Color properties

	let colorspace = 'rgb';

	
	let color = generateRandomRGB();			// Background color
	
	let lightColor = new Color(0, 0, 0);		// Secondary colors for light 
	let darkColor = new Color(255, 255, 255);	// and dark themes

	// Set up Event listeners

	window.addEventListener('keydown', handleKeyPress);

	for (let panel of panels) {
		panel.addEventListener('wheel', handlePanelScroll);


		let lastTouch = null;

		/*

		function COLTouch() {
			this.timestamp
			this.x
			this.y
			this.touch // Meta object
		}

		*/
		panel.addEventListener('touchstart', function(e) {
			let thisTouch = e.touches[0];
			lastTouch = thisTouch;
		});

		panel.addEventListener('touchmove', function(e) {
			e.preventDefault();

			let thisTouch = e.touches[0];

			let lx = lastTouch.clientX;
			let ly = lastTouch.clientY;

			let tx = thisTouch.clientX;
			let ty = thisTouch.clientY;

			// Refactor below code
			let dv = ty - ly;
			let comp = null;

			// The component should be set on start,
			// 	otherwise the wrong value can be changed if
			//	the mouse is moved during the scroll event.
			switch (this.id) {
				case 'red-panel':
					comp = 'red';
					break;
				case 'green-panel':
					comp = 'green';
					break;
				case 'blue-panel':
					comp = 'blue';
					break;
				default:
					console.log("Unknown panel.");
			}

			setInputValue(comp, dv);
			updateColor();
			updateView();


			lastTouch = thisTouch;
		});

		panel.addEventListener('touchend', function(e) {
			lastTouch = null;
			// TODO: Add intertia. This should be a togglable setting.
		});
	}

	// 

	for (let input of inputs) {
		// input.addEventListener('scroll', )
		console.log();
	}

	// Gesture Handlers

	function handleKeyPress(e) {
		if (e.keyCode == 32) {
			color = generateRandomRGB();
			// This needs to update inputs from color
			// Scrolling updates color from inputs
			updateInputs();
			updateView();
		}
	}

	function handlePanelScroll(e) {
		e.preventDefault();

		let delta = e.deltaY;
		let sensitivity = 0.8;

		let dv = Math.round(delta * sensitivity);
		let comp = null;

		switch (this.id) {
			case 'red-panel':
				comp = 'red';
				break;
			case 'green-panel':
				comp = 'green';
				break;
			case 'blue-panel':
				comp = 'blue';
				break;
			default:
				console.log("Unknown panel.");
		}

		setInputValue(comp, dv);
		updateColor();
		updateView();
	}






	function calculateIntertia(points) {

	}

	function calculateVelocity() {
		// When saving touches, the timestamp needs to be included as well.
		// I'll need to make a struct for this.
	}



	// function 

	function setInputValue(comp, dv) {
		let input = null;
		switch (comp) {
			case 'red':
				input = redInput;
				break;
			case 'green':
				input = greenInput;
				break;
			case 'blue':
				input = blueInput;
				break;
			default:
				console.log("Unknown component.");
		}

		if (input) {
			let val = parseInt(input.value);
			let val_prime = val + (scrollInversion * dv);

			if (val_prime < RGB_MIN) {
				val_prime = RGB_MIN;
			}
			if (val_prime > RGB_MAX) {
				val_prime = RGB_MAX;
			}

			input.value = val_prime;
		}
	}

	function updateBackground() {
		function setBackgroundColor() {
			space.style.backgroundColor = color;
		}

		function setFontColor() {
			// space.style.color = 
			let lightBrightnessDifference = calculateBrightnessDifference(lightColor, color);
			let lightColorDifference = calculateColorDifference(lightColor, color);

			if (lightBrightnessDifference > 125 && lightColorDifference > 250) {
				// root.style.color = rgbToString(lightFontColor);
				space.style.color = lightColor.toString();
			} else {
				// root.style.color = rgbToString(darkFontColor);
				space.style.color = darkColor.toString();
			}
		}

		function setPanelOpacities() {
			redPanel.style.opacity = redInput.value / 255;
			greenPanel.style.opacity = greenInput.value / 255;
			bluePanel.style.opacity = blueInput.value / 255;
		}

		setBackgroundColor();
		// setPanelOpacities();
		setFontColor();
	}

	function updateColor() {
		// Get value of inputs
		let r = redInput.value;
		let g = greenInput.value;
		let b = blueInput.value;

		color = new Color(r, g, b);
	}

	function updateInputs() {
		redInput.value = color.red;
		greenInput.value = color.green;
		blueInput.value = color.blue;
	}

	function updateView() {
		// updateColor();
		updateBackground();
	}

	updateInputs();
	updateView();
}























/// - Main

function _main() {

	let __root = document.querySelector('body');
	let root = document.querySelector('#colorspace');

	let inputs = {
		r: document.querySelector('#red-input'),
		g: document.querySelector('#green-input'),
		b: document.querySelector('#blue-input')
	};

	function getRed() {
		return inputs.r.value;
	}

	function getGreen() {
		return inputs.g.value;
	}

	function getBlue() {
		return inputs.b.value;
	}

	function setRed(value) {
		inputs.r.value = value;
	}

	function setGreen(value) {
		inputs.g.value = value;
	}

	function setBlue(value) {
		inputs.b.value = value;
	}


	function updateValueFor(color, dv) {
		var input = null;

		switch (color) {
			case 'r':
				input = inputs.r;
				break;
			case 'g':
				input = inputs.g;
				break;
			case 'b':
				input = inputs.b;
				break;
			default:
				console.log("[ERROR updateValueFor]: Unknown input.");
		}

		// TODO: Check ...
		//   if (input != null) ...

		let base = parseInt(input.value);
		let value = base + dv;
		
		if (value > 255) {
			value = 255;
		} else if (value < 0) {
			value = 0;
		}

		input.value = value;

		updateDisplay();
	}

	function updateRed(dv) {
		updateValueFor('r', dv);
	}

	function updateGreen(dv) {
		updateValueFor('g', dv);
	}

	function updateBlue(dv) {
		updateValueFor('b', dv);
	}


	// https://www.w3.org/TR/AERT/#color-contrast
	// The range for color brightness difference is 125. The range for color difference is 500.

	// Color brightness is determined by the following formula:
	// ((Red value X 299) + (Green value X 587) + (Blue value X 114)) / 1000
	// Note: This algorithm is taken from a formula for converting RGB 
	//   values to YIQ values. This brightness value gives a perceived brightness for a color.
	function calculateBrightnessDifference(c1, c2) {
		backgroundBrightness = ((c1.red * 299) + (c1.green * 587) + (c1.blue * 114)) / 1000;
		fontBrightness       = ((c2.red * 299) + (c2.green * 587) + (c2.blue * 114)) / 1000;

		return Math.abs(backgroundBrightness - fontBrightness);
	}

	// Color difference is determined by the following formula:
	// (maximum (Red value 1, Red value 2) - minimum (Red value 1, Red value 2)) 
	//   + (maximum (Green value 1, Green value 2) - minimum (Green value 1, Green value 2)) 
	//   + (maximum (Blue value 1, Blue value 2) - minimum (Blue value 1, Blue value 2))
	function calculateColorDifference(c1, c2) {
		return (Math.max(c1.red, c2.red) - Math.min(c1.red, c2.red)) + (Math.max(c1.green, c2.green) - Math.min(c1.green, c2.green)) + (Math.max(c1.blue, c2.blue) - Math.min(c1.blue, c2.blue));
	}

	function rgbToString(color) {
		return "rgb(" + color.red + ", " + color.green + ", " + color.blue + ")";
	} 

	function updateDisplay() {

		let red = getRed();
		let green = getGreen();
		let blue = getBlue();

		let color = {
			red: red,
			green: green,
			blue: blue
		};

		updateBackgroundColorTo(color);

		updateFontColorFor(color);

		updateArrowTransparencyFor(color);

	}

	function updateBackgroundColorTo(color) {

		// Update the background color with the current input

		let colorString = rgbToString(color);
		// root.style.backgroundColor = colorString;
		__root.style.backgroundColor = colorString;

	}

	function updateFontColorFor(color) {

		// let sum = parseInt(color.red) + parseInt(color.green) + parseInt(color.blue);
		// let avgValue = Math.round(sum / 3)
		// let fontColorValue = 255 - avgValue;
		// let fontColor = {
		// 	red: fontColorValue,
		// 	green: fontColorValue,
		// 	blue: fontColorValue
		// };

		// root.style.color = rgbToString(fontColor);

		// Determine to have 'light' or 'dark' font

		let lightFontColor = {
			red: 0,
			green: 0,
			blue: 0
		};

		let darkFontColor = {
			red: 255,
			green: 255,
			blue: 255
		};

		let lightBrightnessDifference = calculateBrightnessDifference(lightFontColor, color);
		let lightColorDifference = calculateColorDifference(lightFontColor, color);

		if (lightBrightnessDifference > 125 /*&& lightColorDifference > 500*/) {
			// root.style.color = rgbToString(lightFontColor);
			__root.style.color = rgbToString(lightFontColor);
		} else {
			// root.style.color = rgbToString(darkFontColor);
			__root.style.color = rgbToString(darkFontColor);
		}

	}

	let redArrowUp = document.querySelector('#red-up-arrow');
	let redArrowDown = document.querySelector('#red-down-arrow');
	let greenArrowUp = document.querySelector('#green-up-arrow');
	let greenArrowDown = document.querySelector('#green-down-arrow');
	let blueArrowUp = document.querySelector('#blue-up-arrow');
	let blueArrowDown = document.querySelector('#blue-down-arrow');

	function updateArrowTransparencyFor(color) {

		enabledOpacity = 1.0;
		disabledOpacity = 0.2;

		if (color.red >= 255) {
			redArrowUp.style.opacity = disabledOpacity;
		} else {
			redArrowUp.style.opacity = enabledOpacity;
		}

		if (color.red <= 0) {
			redArrowDown.style.opacity = disabledOpacity;
		} else {
			redArrowDown.style.opacity = enabledOpacity;
		}

		if (color.green >= 255) {
			greenArrowUp.style.opacity = disabledOpacity;
		} else {
			greenArrowUp.style.opacity = enabledOpacity;
		}

		if (color.green <= 0) {
			greenArrowDown.style.opacity = disabledOpacity;
		} else {
			greenArrowDown.style.opacity = enabledOpacity;
		}

		if (color.blue >= 255) {
			blueArrowUp.style.opacity = disabledOpacity;
		} else {
			blueArrowUp.style.opacity = enabledOpacity;
		}

		if (color.blue <= 0) {
			blueArrowDown.style.opacity = disabledOpacity;
		} else {
			blueArrowDown.style.opacity = enabledOpacity;
		}

	}


	


	// On launch ...

	window.addEventListener('keydown', function(e) {
		if (e.keyCode == 32) {
			updateDisplay();
		}
	});

	let panels = document.querySelectorAll('.panel.box');
	let lastTouchLocation = null;
	for (let panel of panels) {
		panel.addEventListener('wheel', function(e) {
			e.preventDefault();

			let delta = e.deltaY;
			let sensitivity = 0.8;

			let dv = Math.round(delta * sensitivity);
			
			switch (this.id) {
				case 'red-panel':
					updateRed(dv);
					break;
				case 'green-panel':
					updateGreen(dv);
					break;
				case 'blue-panel':
					updateBlue(dv);
					break;
				default:
					console.log("Unknown panel.");
			}

		});

		panel.addEventListener('touchstart', function(e) {
			console.log("Start");
			// e.preventDefault();
			// lastTouchLocation = {

			// }
		});

		panel.addEventListener('touchmove', function(e) {
			console.log("Move");

			// e.preventDefault();

			// if (touches)
			// e.preventDefault();

			// let x = 
			// let y = 

			// let delta = ;
			// let sensitivity = 0.8;

			// let dv = Math.round(delta * sensitivity);
			
			// switch (this.id) {
			// 	case 'red-panel':
			// 		updateRed(dv);
			// 		break;
			// 	case 'green-panel':
			// 		updateGreen(dv);
			// 		break;
			// 	case 'blue-panel':
			// 		updateBlue(dv);
			// 		break;
			// 	default:
			// 		console.log("Unknown panel.");
			// }
		});

		panel.addEventListener('touchend', function(e) {
			console.log("End");
		});

	}

	
	let arrows = document.querySelectorAll('.arrow');
	for (let arrow of arrows) {
		arrow.addEventListener('mousedown', function(e) {	
			arrowAction(this);
		});
	}

	function arrowAction(arrow) {
		let id = arrow.id;
		let component = arrow.getAttribute('data-comp');

		let query = 'input' + '#' + component + '-input';
		let input = document.querySelector(query);
		
		var dv = 0;
		if (id.includes('-up-')) {
			// Up arrow clicked
			dv = 1;
		} else {
			// Down arrow clicked
			dv = -1;
		}

		updateValueFor(component.charAt(0), dv);
	}

	// Randomize inputs

	let r = Math.random() * 255;
	let g = Math.random() * 255;
	let b = Math.random() * 255;

	let red = Math.floor(r);
	let green = Math.floor(g);
	let blue = Math.floor(b);

	setRed(red);
	setGreen(green);
	setBlue(blue);

	updateDisplay();

}













/*
function main() {

	let options = {
		name: "Colorspace",
	};
	let app = new Application(options);

	window.addEventListener('keydown', function(e) {
		let code = e.keyCode;
		app.randomizeColor();
	});
}

function Application(__opts) {

	let self = this;
	let wind = window;

	let options = __opts || {};

	this.name = options["name"] || "Untitled";

	this.log("Hello.");

}

Application.prototype.log = function(output) {
	console.log("[Space " + this.name + "]: " + output);
};

Application.prototype.display = function(output) {
	let element = document.querySelector('#output');
	element.innerHTML = output;
};

Application.prototype.randomizeColor = function() {
	let color = generateRandomColor();

	let colorString = rgbToString(color);
	let hexString = rgbToHexString(color);
	// this.log(colorString + " = " + hexString);

	let raw = 
		"<h2>" + colorString + "</h2>\n" +
		"<h2>" + hexString + "</h2>\n"; 
	this.display(raw);

	let space = document.querySelector('body');
	space.style.backgroundColor = hexString;
};


Application.prototype.
*/