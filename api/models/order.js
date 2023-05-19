const mongoose = require('mongoose');

// v modela moje da se zadava dali poleto da e zadyljitelno
// dali da ima nqkakva default stoinost za tova se izpolzva
// tova sa setingite na db

//validation for price
const orderSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        // I want to kwno which product i order - ref use
        // ref 'Product' comming from here module.exports = mongoose.model('Product', productSchema);
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, default: 1 }
    },
    {
        timestamps: true
    }   
);

module.exports = mongoose.model('Order', orderSchema);