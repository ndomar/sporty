
var rest = module.exports = {
	response: function(err, data, req, res) {
		var httpStatusCode;
		var developerMessage;
		var userMessage;
		var responseObject = {};

		// if error exists	
		if (err) {
			httpStatusCode = err.code;
			switch (err.code) {
				case 403:
					developerMessage = "Access to resource is forbidden";
					userMessage = err.error;
					break;
				case 400:
					developerMessage = "Bad data sent. This means that either a required data field had been missed or invalid data had been sent. check userMessage field to know which data fields contain errors.";
					userMessage = err.error;
					break;
				case 404:
					developerMessage = "Object not found. This means either the object didn't exist in our database or it has been removed.";
					userMessage = err.error;
					break;
				case 500:
					// httpStatusCode = 500;
					developerMessage = "Internal server error: "+err.error+". In most times, this means that our database server had passed some bad times during your request. Please try again later.";
					userMessage = [{
						field: 'all',
						error: 'internal server error'
					}];
					break;
				default:
					httpStatusCode = 500;
					developerMessage = err.error;
					userMessage = [{
						field: 'all',
						error: err.error
					}];
					break;
			}
		} else {
			if (req.method == 'POST') {
				httpStatusCode = 201;
			} else {
				httpStatusCode = 200;
			}
			data = data;
		}

		if (err) {
			responseObject.developerMessage = developerMessage;
			responseObject.userMessage = userMessage;
		} else {
			if (data.metadata) {
				responseObject._metadata = data.metadata;
				responseObject.data = data.docs;
			} else {
				responseObject.data = data;
			}
		}
		this.toJSON(httpStatusCode, responseObject, req, res);
	},

	toJSON: function(code, data, req, res) {
		var statusCode;
		var responseObject = data;
		if (req.suppressResponseCode) {
			statusCode = 200;
			responseObject.responseCode = code;
		} else {
			statusCode = code;
		}

		if(!res.headersSent)
			res.status(statusCode).json(responseObject)
	},


};