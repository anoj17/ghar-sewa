const { Wishlist } = require("../models/wishlist.model")

exports.addToWishlist = async (req, res) => {

    const { listingId } = req.body
    const userId = req.user
    try {

        const wishList = await Wishlist.create({
            listingId,
            userId
        })


        res.status(201).json({
            message: "Added to wishlist"
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: 'Something went wrong!'
        })

    }
}




exports.removeFromWishlist = async (req, res) => {

    const { id } = req.params
    
    try {
        
        await Wishlist.findByIdAndDelete(id)
        res.status(201).json({
            message: "removed from wishlist"
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            message: 'Something went wrong!'
        })

    }
}


exports.getAllWishlist = async(req,res) => {
    const userId = req.user

    try {
        const wishlists = await Wishlist.find({
            userId
        }).populate('listingId')

        res.status(200).json(wishlists)
    } catch (error) {

        res.status(500).json({
            message: 'Something went wrong!'
        })
        
    }
}