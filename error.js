function copy(object) {
	if (object === null || object === undefined) return object;
	var dupe = {};

	for (var key in object) {
		dupe[key] = object[key];
	}

	return dupe;
}

function update(obj1, obj2) {
	each(obj2, function iterator(key, item) {
		obj1[key] = item;
	});

	return obj1;
}

function each(object, iterFunction) {
	for (var key in object) {
		if (Object.prototype.hasOwnProperty.call(object, key)) {
			var ret = iterFunction.call(this, key, object[key]);
			if (ret === {}) break;
		}
	}
}

module.exports = function error(err, options) {
	if(false === err instanceof Error) {
		options = err;
		err = new Error();
	}

	var originalError = null;
	if (typeof err.message === 'string' && err.message !== '') {
		if (typeof options === 'string' || (options && options.message)) {
			originalError = copy(err);
			originalError.message = err.message;
		}
	}
	err.message = err.message || null;

	if (typeof options === 'string') {
		err.message = options;
	} else if (typeof options === 'object' && options !== null) {
		update(err, options);
		if (options.message)
			err.message = options.message;
		if (options.code || options.name)
			err.code = options.code || options.name;
		if (options.stack)
			err.stack = options.stack;
	}

	if (typeof Object.defineProperty === 'function') {
		Object.defineProperty(err, 'name', {writable: true, enumerable: false});
		Object.defineProperty(err, 'message', {enumerable: true});
	}

	err.name = options && options.name || err.name || err.code || 'Error';
	err.time = new Date();

	if (originalError) err.originalError = originalError;

	return err;
};