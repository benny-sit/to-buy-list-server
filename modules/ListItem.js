const mongoose = require('mongoose');

const ListItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        default: 1,
    },
    updatedAt: {
        type: Date,
        default: () => new Date(),
    }
})

ListItemSchema.methods.updated = function () {
    this.updatedAt = new Date();
}

ListItemSchema.pre('save', function (next) {
    this.updateAt = Date.now();
    console.log("updating date in item")
    next();
});

module.exports = mongoose.model('ListItem', ListItemSchema);