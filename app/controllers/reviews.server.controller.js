'use strict';


//Mongoose dependencies
var mongoose = require('mongoose');
var	Product = mongoose.model('Product'),
	_ = require('lodash');
var products = require('../../app/controllers/products');


//Get the error message from the error object
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        };
    }

    return message;
};



//Add review
exports.addReview = function(req, res) {
	var product = req.product;
	var review = req.body;
	review.reviewer = req.user;
	product.reviews.unshift(review);

	product.save(function(err) {
		if (err) {
            return res.send(400, {
                message: products.getErrorMessage(err)
            });
        }   
        else {
            res.jsonp(product);
        }
	});
};

//review middleware
exports.reviewbyID = function(req, res, id, next) {

	if (err) return next(err);
	if (!review) return next(new Error('Failed to load review ' + id));
	req.review = req.product.review.id(id);
	next();
} 

//read reviews thread
exports.list = function(req, res) {
	Product.find().sort('-created').populate('user', 'displayname').exec(function(err, reviews) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(reviews);
		}
	});
};
//Read review t
exports.read = function(req, res) {
	res.jsonp(req.review);
};

//Delete review
exports.deleteReview = function(req, res) {
	var product = req.product;

	product.reviews.id(req.params.itemId).remove();
	product.save(function(err) {
		if (err) {
			return res.send(400, {
				message: 'Delete failed'
			});
		} else {
			res.jsonp(product);
		}
	});
};



//authorization middleware
exports.hasAuthorization = function(req, res, next) {
    console.log('requires login');
    if (req.review.reviewer.toString() !== req.user.id) {
        return res.send(403, {
            itemMessage: 'You are not authorized'
        });
    }
    next();
};