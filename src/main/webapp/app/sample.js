var AWESOME_CLASS = 'awesome',
	VIEWPORT_ID = 'viewport',
	ERROR_MESSAGE = 'error!',
	DATA_SERVICE_URL = '/services/data',
	doEverything;

function makeAwesome(el) {
	if(el) {
		el.className += ' ' + AWESOME_CLASS;
	}
}

function isAwesome(el) {
	return (el && el.className.indexOf(AWESOME_CLASS) > -1) === true;
}

function isArray(arr) {
	if(Array.isArray(arr)) {
		return true;
	}

	throw new Error(ERROR_MESSAGE);
}

function getDataFromServer(onSuccess, onError) {
	return $.ajax({
		url: DATA_SERVICE_URL
	}).error(onError).done(onSuccess);
}

doEverything = (function() {
	var obj = {};

	privateFunction = function(obj) {
		// var obj = {};
		obj.stuff = true
	};

	asyncFunction = function(obj) {
		setTimeout(function(){ 
			obj.async = true; 
		}, 3000);
	};

	return {

		wow: function() {
			console.log('wow');
		},

		omg: function() {
			console.log('omg');
		},

		addStuff: function (obj) {
			if(obj) {
				obj.hello = 'hello';
			}
			privateFunction(obj);
		},

		asyncStuff: function(obj) {
			asyncFunction(obj);
		}
	};

})();