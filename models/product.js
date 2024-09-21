const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: [true, "Price must be provided"],
    },
    feature: {
        type: Boolean,
        required: false,
    },
    rating: {
        type: Number,
        default: 4.9,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    company: {
        type: String,
        enum: {
            values: ["apple", "samsung", "dell", "mi"],
            message: `{VALUE} is not supported`,
        },
    },
});

module.exports = mongoose.model("Product", productSchema);
