import { useEffect, useState } from "react";
import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, getAllWishList, removeFromWishlist } from "../../redux/actions/userActions";
import api from "../../backend";

/* eslint-disable react/prop-types */
const ListingTitle = ({ listingData }) => {
  const user = useSelector((state) => state.user.userDetails)
  const [isLiked, setIsLiked] = useState(false)
  const [wishListId, setWishListId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const wishlist = useSelector((state) => state.user.wishlist) || [];
  const dispatch = useDispatch()
  console.log('wishlist===================', wishlist)

  useEffect(() => {
    dispatch(getAllWishList())
  }, [])


  const wishlistExist = user && wishlist && wishlist.find((item) => item?.listingId === listingData?._id)

  useEffect(() => {
    if (wishlistExist) {
      setIsLiked(true)
      setWishListId(wishlistExist._id)
    } else {
      setIsLiked(false)
    }
  }, [wishlist])

  async function addToWishlist() {
    try {
      const response = await api.post("/wishlist/", {
        listingId: listingData._id
      });
      setIsLiked(true)
      dispatch(getAllWishList())
    } catch (error) {
      console.log('error occured', error)

    }

  }

  async function removeFromWishList() {
    try {
      const response = await api.delete(`/wishlist/${wishlistExist._id}`);
      setIsLiked(false)
    } catch (error) {
      console.log('error occured', error)
    }
  }

  const handleAddToWishlist = () => {
    if (!isLiked) {
      addToWishlist()
    } else {
      removeFromWishList()
    }

  }
  return (
    <div className=" flex flex-col text-[#222222]">
      {/* title */}
      <p className="text-xl md:text-2xl font-medium">{listingData?.title}</p>
      <div className=" grid grid-cols-1 md:grid-cols-5 items-center justify-end">
        <div className=" flex flex-row flex-wrap md:flex-nowrap items-center gap-2 col-span-4">
          {/* ratings */}
          <p className=" flex flex-row items-center gap-1">
            {listingData?.ratings ? (
              <>
                <AiFillStar size={16} />
                <p className=" text-xs sm:text-sm">{listingData?.ratings}</p>
              </>
            ) : (
              <>
                <AiFillStar size={16} />
                <p className="text-xs sm:text-sm">New</p>
              </>
            )}
          </p>
          <span> · </span>
          <p className="text-xs sm:text-sm">
            {listingData?.reviews ? listingData?.reviews : "No reviews"}
          </p>
          <span> · </span>
          {/* location */}
          <p className="text-xs sm:text-sm font-medium underline">
            {listingData?.location?.addressLineOne
              ? listingData?.location?.addressLineOne
              : listingData?.location?.addressLineTwo
                ? listingData?.location?.addressLineTwo
                : listingData?.location?.country?.name}
          </p>
        </div>
        {/* save wishlist options */}
        <div className="col-span-1 md:flex justify-end w-full hidden">

          <button
            disabled={isLoading}
            onClick={handleAddToWishlist}
            className=" flex flex-row-reverse gap-2 items-center cursor-pointer p-2 rounded-md w-[80px] bg-white hover:bg-[#f1f1f1] transition duration-200 ease-in">
            <p className=" text-sm underline underline-offset-1 font-medium">
              {/* Save */}
            </p>
            {
              isLiked ?
                <AiFillHeart size={25} color="red" fill="red" />
                :
                <AiOutlineHeart size={25} color="red" />

            }
          </button>

        </div>
      </div>
    </div>
  );
};

export default ListingTitle;
