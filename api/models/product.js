const mongoose = require('mongoose');

//validation for price
const productSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        userId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        file: { type: String, requred: true }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Product', productSchema);