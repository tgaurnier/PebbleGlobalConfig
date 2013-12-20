/**
 *
 * @author Tory Gaurnier
 */


var objects = new Array();


/**
 * When toggling a toggleable field, toggle the disabled attribute.
 * This currently isn't actually working as of Pebble 2.0-BETA3, include just in case they get it
 * fixed
 */
function toggleFieldsets(inputID) {
	var children = document.getElementsByName(inputID + "ToggledFieldset");
	for(var i = 0; i < children.length; i++) {
		children[i].disabled = !document.getElementById(inputID).checked;
	}
}


/**
 * Creates and returns a fieldset containing elements defined by object
 */
function createFieldset(object) {
	var fieldset		=	document.createElement("fieldset");
	var legend			=	document.createElement("legend");
	legend.innerHTML	=	object.title;
	fieldset.appendChild(legend);

	switch(object.type) {
		case "text":
			var input		=	document.createElement("input");
			input.type		=	"text";
			input.id		=	object.id;
			input.className	=	"textInput";
			fieldset.appendChild(input);
			break;

		case "radioGroup":
			fieldset.className = "radioGroup";

			// Loop through each radio object creating radios with labels
			object.list.forEach(
				function(radioObject) {
					var radioContainer			=	document.createElement("div");
					radioContainer.className	=	"radioContainer";
					var input					=	document.createElement("input");
					input.type					=	"radio";
					input.name					=	this.name;
					input.checked				=	radioObject.selected;
					input.id					=	radioObject.id;
					var label					=	document.createElement("label");
					label.htmlFor				=	input.id;
					label.innerHTML				=	radioObject.value;

					radioContainer.appendChild(label);
					radioContainer.appendChild(input);
					this.parent.appendChild(radioContainer);
				},
				{"parent": fieldset, "name": object.name}
			);

			inputArea.appendChild(fieldset);
			break;

		case "select":
			var select = document.createElement("select");
			object.list.forEach(
				function(optionObject) {
					option				=	document.createElement("option");
					option.value		=	optionObject.value;
					option.innerHTML	=	optionObject.text;
					option.selected		=	optionObject.selected;
					this.parent.appendChild(option);
				},
				{"parent": select}
			);

			fieldset.appendChild(select);
			break;

		case "inputToggle":
			var input			=	document.createElement("input");
			input.type			=	"checkbox";
			input.id			=	object.id;
			input.className		=	"inputToggle"
			input.checked		=	object.selected;
			var label			=	document.createElement("label");
			label.htmlFor		=	input.id;
			label.innerHTML		=	object.title;
			input.setAttribute("onclick", "toggleFieldsets('" + input.id + "')");

			object.inputList.forEach(
				function(inputObject) {
					var fieldset		=	createFieldset(inputObject);
					fieldset.className	=	"toggledFieldset";
					fieldset.name		=	this.input.id + "ToggledFieldset";
					fieldset.disabled	=	!this.input.checked;

					this.parent.appendChild(fieldset);
				},
				{"parent": fieldset, "input": input}
			);

			legend.innerHTML = "";
			legend.appendChild(label);
			legend.appendChild(input);
			break;
	}

	return fieldset;
}


function build() {
	// First get array of JSON objects from querry string
	var pairs = location.search.slice(1).split('&');
	pairs.forEach(
		function(pair) {
			pair = pair.split('=');
			objects[pair[0]] = JSON.parse(decodeURIComponent(pair[1]));
		}
	);

	inputArea = document.getElementById("inputArea");

	objects.forEach(
		function(object) {
			if(object.type == "title")
				document.getElementById("title").innerHTML = object.value;

			else
				inputArea.appendChild(createFieldset(object));
		}
	);
}


function cancel() {
	document.location="pebblejs://close#Cancelled";
}


function submit() {
	var celsius		=	document.getElementById("unitsCelsius");
	var fahrenheit	=	document.getElementById("unitsFahrenheit");
	var value = "NULL";

	if(celsius.checked)
		value = "Celsius"

	else if(fahrenheit.checked)
		value = "Fahrenheit"

	document.location = "pebblejs://close#" + value;
}