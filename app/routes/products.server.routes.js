'use strict';

/**
 * Module dependencies.
 */

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var products = require('../../app/controllers/products');
	var reviews = require('../../app/controllers/reviews');

	// Products Routes
	app.route('/products')
		.get(products.list)
		.post(products.create);

	app.route('/products/:productId')
		.get(products.read)
		.put(products.update)
		.delete(products.delete);

	app.route('/products/:productId/reviews')
		.get(reviews.list)
		.post(reviews.addReview);

	app.route('/products/:productId/reviews/:reviewId')
		.delete(reviews.deleteReview)

	// Finish by binding the product middleware
	app.param('productId', products.productByID);

	//Finish by binding the review middleware
	// app.param('reviewId', reviews.reviewByID);
};