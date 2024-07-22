const { model, Schema, Types } = require("mongoose");




const reviewSchema = new Schema({
    rating: {
        type: Number
    },
    review: {
        type: String
    },
    listingId: {
        type: Types.ObjectId,
        ref: 'House'
    },
    userId: {
        type: Types.ObjectId,
        ref: 'User'
    },
    reservationId: {
        type: String
    }
}, {
    timestamps: true
})

exports.Review = model('Review', reviewSchema)