const mongoose = require('mongoose');

const ListItemSchema = require('./ListItem.js').schema;

const ListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        unique: true,
        dropDups: true,
    },
    password: {
        type: String,
    },
    items: [ListItemSchema],
    updatedAt: {
        type: Date,
        default: () => new Date(),
    },
})
 
ListSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
})

ListSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        next(new Error('List name already exists'));
    } else {
        next(error);
    }
})

module.exports = mongoose.model("List", ListSchema);