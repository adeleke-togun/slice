'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	products = require('../../app/controllers/products');

module.exports = function(app) {
	// Article Routes
	app.route('/products')
		.get(products.list)
		.post(products.create);

	app.route('/products/:productId')
		.get(products.read)
		.put(products.update)
		.delete(products.delete);

	// Finish by binding the article middleware
	app.param('productId', products.productByID);
};