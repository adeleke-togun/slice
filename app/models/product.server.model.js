'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


//A comment schema declaring the attribute of a comment
var CommentSchema = new Schema ({
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	comment: {
		type: String,
		default: ''
	}
});



//A review schema that stores details about the review
var ReviewSchema = new Schema ({
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	content: {
		type: String,
		default: ''
	},
	posted: {
		type: Date,
		default: Date.now
	},
	comments: [CommentSchema]
});



//A category schema
var CategorySchema = new Schema ({
	category: {
		type: String,
		enum: ['software', 'appliances', 'books', 'devices', 'deviceAddons', 'computers', 'computerAddons', 'electronics', 'Movies']
	}
});



//A product schema that stores attributes of a ptoduct
var ProductSchema = new Schema ({
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	title: {
		required: 'The product being reviewed should have a name, don\'t you think',
		type: String,
		default: ''
	},
	added: {
		type: Date,
		default: Date.now
	},
	category: [CategorySchema],
	reviews: [ReviewSchema]
});

mongoose.model('Product', ProductSchema);