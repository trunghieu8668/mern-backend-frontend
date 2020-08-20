const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 1000,
        index: { unique: true }
    },
    description: {
        type: String,
        required: true,
        maxlenght: 2000
    },
    price: {
        type: Number,
        trim: true,
        required: true,
        default: 0,
        maxlength: 100
    },
    category: {
        type: ObjectId,
        ref: "Category",
        maxlength: 32,
        required: true
    },
    quantity: {
        type: Number,
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    sold: {
        type: Number,
        default: 0
    },
    shipping: {
        required: false,
        type: Boolean
    }
},{timestamps: true});
module.exports = mongoose.model("Product", productSchema);
