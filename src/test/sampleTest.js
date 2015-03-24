describe('sampleTest', function() {

	var div,
		clock,
		server;

	/**
	 * Setup function called before each test.
	 */
	beforeEach(function() {
		div = document.createElement('div');

		div.id = VIEWPORT_ID;
		document.body.appendChild(div);

		// Fake the clock before every test
		clock = sinon.useFakeTimers();
		// Creates a new fake server before every test
		server = sinon.fakeServer.create();
	});

	/**
	 * Tear down function called after each test.
	 */
	afterEach(function() {
		document.body.removeChild(div);

		// Tears down the faked clock after every test
		clock.restore();
		// Tears down the fake server after every test
		server.restore();
	});

	/**
	 * Demonstrates the expectation that the div added to the body contains
	 * the AWESOME_CLASS after calling #makeAwesome().
	 */
	it('#makeAwesome(): should add class AWESOME_CLASS to a div', function() {
		expect(div.className).to.not.contain(AWESOME_CLASS);

		makeAwesome(div);

		expect(div.className).to.contain(AWESOME_CLASS);
	});

	it('#isAwesome(): should return true when el contains class AWESOME_CLASS', function() {
		expect(isAwesome(div)).to.be.false;

		makeAwesome(div);

		expect(isAwesome(div)).to.be.true;
	});

	it('#isAwesome(): should return false when el is null', function() {
		expect(isAwesome(null)).to.be.false;
	});

	it('#isAwesome(): should return false when el doesn\'t contain class "awesome"', function() {
		expect(isAwesome(document.createElement('div'))).to.be.false;
	});

	it('#isArray(): should return true when arr is an Array', function() {
		expect(isArray([])).to.be.true;
	});

	it('#isArray(): should throw an exception when arr is not an Array', function() {
		assert.throws(function() {
			isArray(null);
		}, ERROR_MESSAGE);
	});

	it('doEverything#addStuff(): should add keys "hello" and "stuff" to obj', function() {
		var obj = {};

		doEverything.addStuff(obj)

		expect(obj).to.include.keys(['hello', 'stuff']);
	});

	/**
	 * Demonstrates that the #asyncStuff() function sets the "async" property
	 * on the parameter obj once the timeout has lapsed.
	 */
	it('doEverything#asyncStuff(): should set obj.async to "true"', function() {
		var obj = {};

		doEverything.asyncStuff(obj);
		// Fast-forward 4 seconds to trip the setTimeout() in myAsnycFn()
		clock.tick(4000);

		expect(obj).to.include.keys(['async']);
		expect(obj.async).to.be.true;
	});

	/**
	 * Demonstrates the #getDataFromServer() function properly calls the success function
	 * passed to #getDataFromServer() when the server returns a HTTP 200.
	 */
	it('#getDataFromServer(): should get object with "name" property from my service when a HTTP 200 is returned', function() {
		var serverResponse,
			ajaxResponseData;

		serverResponse = {
			name: 'Jim Smith'
		};

		// Configure the fake server to respond with the configuration
		server.respondWith('GET', 
			DATA_SERVICE_URL, [ 
				200, { 
					'Content-Type': 'application/json', 
				}, 
				JSON.stringify(serverResponse)
			]
		);

		getDataFromServer(function(data) {
			ajaxResponseData = data;
		});
		// Tell the server to respond with the GET 200 response
		server.respond();

		expect(ajaxResponseData).to.include.keys(['name']);
		expect(ajaxResponseData.name).to.equal(serverResponse.name);
	});

	/**
	 * Demonstrates the #getDataFromServer() function properly calls the error function 
	 * passed to #getDataFromServer() when the server returns a HTTP 500.
	 */
	it('#getDataFromServer(): should get an error object from my service when an HTTP 500 is returned', function() {
		var serverErrorResponse,
			ajaxResponseData,
			ajaxErrorData,
			onError,
			onSuccess;

		serverErrorResponse = {
			error: 'Internal error!'
		};

		// Configure the fake server to respond with the configuration
		server.respondWith('GET', 
			DATA_SERVICE_URL, [ 
				500, { 
					'Content-Type': 'application/json', 
				}, 
				JSON.stringify(serverErrorResponse)
			]
		);

		onSuccess = function(data) {
			ajaxResponseData = data;
		};
		onError = function(jqXhr, errorString, exception) {
			ajaxErrorData = jqXhr.responseJSON.error;
		};

		getDataFromServer(onSuccess, onError);
		// Tell the server to respond with the GET 500 response
		server.respond();

		// AJAX response failed, the response data should be empty
		expect(ajaxResponseData).to.be.not.ok;
		// Make sure the AJAX response returned the server error
		expect(ajaxErrorData).to.equal(serverErrorResponse.error);
	});

});