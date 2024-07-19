const { Router } = require("express")
const { addToWishlist, getAllWishlist, removeFromWishlist } = require("../controllers/wishlistController")

const router = Router()

router.get('/', getAllWishlist)
router.post('/', addToWishlist)
router.delete('/:id', removeFromWishlist)

module.exports = router