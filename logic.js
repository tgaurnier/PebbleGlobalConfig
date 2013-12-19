/**
 *
 * @author Tory Gaurnier
 */


var i = 0;
var objects = new Array();

objects[i++] = {
	"type": "title",
	"value": "Weather Face Configuration"
};

objects[i++] = {
	"type": "radioGroup",
	"name": "theme",
	"title": "Color theme",
	"list": [
		{"value": "White on black", "selected": true},
		{"value": "Black on white", "selected": false}
	]
};

objects[i++] = {
	"type": "radioGroup",
	"name": "units",
	"title": "Units of measurement",
	"list": [
		{"value": "Celcius", "id": "Celcius", "selected": false},
		{"value": "Fahrenheit", "id": "Fahrenheit", "selected": true}
	]
};

objects[i++] = {
	"type": "select",
	"title": "Time between checks for weather",
	"id": "timeout",
	"list": [
		{"value": 300, "text": "5 minutes", "selected": false},
		{"value": 600, "text": "10 minutes", "selected": false},
		{"value": 900, "text": "15 minutes", "selected": true},
		{"value": 1200, "text": "20 minutes", "selected": false},
		{"value": 1500, "text": "25 minutes", "selected": false},
		{"value": 1800, "text": "30 minutes", "selected": false},
		{"value": 2100, "text": "35 minutes", "selected": false},
		{"value": 2400, "text": "40 minutes", "selected": false},
		{"value": 2700, "text": "45 minutes", "selected": false},
		{"value": 3000, "text": "50 minutes", "selected": false},
		{"value": 3300, "text": "55 minutes", "selected": false},
		{"value": 3600, "text": "1 hour", "selected": false}
	]
};

objects[i++] = {
	"type": "inputToggle",
	"title": "Enable static location",
	"id": "enableStaticLocation",
	"selected": false,
	"inputList": [
		{
			"type": "text",
			"title": "City name",
			"id": "cityName",
			"value": ""
		},
		{
			"type": "text",
			"title": "Territory/State",
			"id": "territoryName",
			"value": ""
		}
	]
};


//function getQueryString(key) {
	//var key		=	key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	//var regex	=	new RegExp("[\\?&]" + key + "=([^&#]*)");
	//var value	=	regex.exec(window.location.href);
    //return value[1];
//}


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
			fieldset.id			=	object.id + "Fieldset";
			fieldset.disabled	=	disabled;
			input.onclick		=	function() {
				document.getElementById(this.id + "Fieldset").disabled = !this.checked;
			}

			object.inputList.forEach(
				function(inputObject) {
					var fieldset		=	createFieldset(inputObject);
					fieldset.className	=	"toggledFieldset";
					this.parent.appendChild(fieldset);
				},
				{"parent": fieldset}
			);

			legend.innerHTML = "";
			legend.appendChild(label);
			legend.appendChild(input);
			break;
	}

	return fieldset;
}


function build() {
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