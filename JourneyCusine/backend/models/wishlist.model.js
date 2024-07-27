const { model, Schema } = require("mongoose");

const wishlistSchema = new Schema({
    listingId: {
        type: String,
        requried: true,
    },
    userId: {
        type: String,
        requried: true,
    }
})

exports.Wishlist = model('Wishlist', wishlistSchema)

//wishlist