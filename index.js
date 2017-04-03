const url = require('url');
const http = require('http');
const querystring = require('querystring');

var MidofficeApiError = require('./error');

/**
 * MidofficeApi Class
 *
 * @param {Object} config
 * @constructor
 */
function MidofficeApi(config) {
	if ('object' !== typeof(config)) {
		throw new MidofficeApiError({
			code: 'ConfigError',
			message: 'Config must be an object.'
		});
	}

	if (!config.hasOwnProperty('url')) {
		throw new MidofficeApiError({
			code: 'ConfigError',
			message: 'Midoffice URL is missing in config. Please provide the "url" property.'
		});
	}

	if (!config.hasOwnProperty('auth')) {
		throw new MidofficeApiError({
			code: 'ConfigError',
			message: 'Authentication is missing in config. Please provide the "auth" property.'
		});
	}

	this.auth = config.auth;
	this.url = url.parse(config.url);
}

MidofficeApi.prototype.request = function (url, options) {
	var api = this;
	var query = options ? querystring.stringify(options.query) : '';

	return new Promise(function (resolve, reject) {
		var req = http.request({
			host: api.url.hostname,
			protocol: api.url.protocol,
			port: api.url.port,
			method: 'GET',
			path: url + query,
			auth: api.auth.key + ':' + api.auth.secret
		}, function (res) {
			var body = '';

			if (200 !== res.statusCode) {
				return reject(res);
			}

			res.on('data', function (chunk) {
				body += chunk;
			});

			res.on('end', function () {
				try {
					return resolve(JSON.parse(body));
				} catch (e) {
					return reject(e);
				}
			});
		});

		req.on('error', function (e) {
			return reject(e);
		});

		req.end();
	});
};

module.exports = function (options) {
	return new MidofficeApi(options);
};