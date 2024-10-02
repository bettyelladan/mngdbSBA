const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 50,
        },
        quantity: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { timestamps: true }
);

// Create an index on the name field
ItemSchema.index({ name: 1 });

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;