import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ReactStars from 'react-rating-stars-component'
import api from "../../../backend";
import { PulseLoader } from "react-spinners";


export const ReviewPage = () => {
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')

  const { id: listingId } = useParams()

  const ratingChanged = (newRating) => {
    console.log(newRating);
    setRating(newRating)
  };

  const { data, isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await api.get(`/house/review_status/${listingId}`)
      return res.data
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      await api.post('/house/review', data)

    },
    onSuccess: () => {
      navigate(`/rooms/${listingId}`)
      queryClient.invalidateQueries({
        queryKey: ['reviews']
      })
    },
    onError: (error) => {
      console.log('error', error?.response)
      error.response?.data?.message ?
        toast.error(error.response?.data?.message)
        :
        toast.error('Something went wrong')
    }
  })

  const handleSubmit = () => {
    mutate({
      rating, review, listingId
    })
  }
  return (
    <>
    {
        
          data?.canReview ?
              <div className="px-[20rem] py-10">
                  <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      size={30}
                      isHalf={true}
                      emptyIcon={<i className="far fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      activeColor="#ffd700"
                  />
                  <textarea
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      name="message"
                      rows="6"
                      placeholder="Write your experience here.."
                      className=' border-2 rounded-xl w-full p-3'
                  />
                  <button
                      className={`bg-[#ff385c] hover:bg-[#d90b63] transition-all duration-300 text-white font-medium rounded-lg p-3  disabled:bg-[#dddddd] ${isPending ? " cursor-not-allowed" : ""
                          }`}
                      type="button"
                      disabled={isPending}
                      onClick={handleSubmit}
                  >
                      {isPending ? (
                          <PulseLoader
                              color="#f7f7f7"
                              size={7}
                              margin={4}
                              speedMultiplier={0.6}
                          />
                      ) : (
                          "Submit"
                      )}
                  </button>

              </div>
              : <p>Can not submit review {JSON.stringify(data)} </p>

      }
    
     
    </>
  )
}

/* eslint-disable react/prop-types */
const AllReservations = ({ data, role }) => {

  return (
    <div className="flex flex-col overflow-x-auto">
      <div className="">
        <div className="inline-block min-w-full py-2">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm font-light">
              <thead className=" text-xs text-[#717171] font-medium border-b border-[#dddddd]">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    S.NO
                  </th>
                  <th scope="col" className="px-6 py-4">
                    ORDER ID
                  </th>
                  <th scope="col" className="px-6 py-4">
                    LISTING
                  </th>
                  <th scope="col" className="px-6 py-4">
                    GUEST
                  </th>
                  <th scope="col" className="px-6 py-4">
                    NIGHT
                  </th>
                  <th scope="col" className="px-6 py-4">
                    {role === 'visitors' ? 'SPEND' : "EARNED"}
                  </th>
                  <th scope="col" className="px-6 py-4">
                    CHECK IN
                  </th>
                  <th scope="col" className="px-6 py-4">
                    CHECK OUT
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((listing, i, arr) => {
                  const checkIn = new Date(
                    listing.checkIn
                  ).toLocaleDateString();
                  const checkOut = new Date(
                    listing.checkOut
                  ).toLocaleDateString();
                  return (
                    <tr
                      key={i}
                      className={`${i === arr.length - 1 ? "" : "border-b border-[#dddddd]"
                        }`}
                    >
                      {/* serial */}
                      <td className=" px-6 py-4 w-[120px]">
                        <p className="text-sm text-[#222222]">{i + 1}</p>
                      </td>
                      {/* order id*/}
                      <td className=" px-6 py-4 w-[120px]">
                        <p className="text-sm text-[#222222]">
                          {listing.orderId}
                        </p>
                      </td>
                      {/* see listing btn */}
                      <td className=" px-6 py-4 flex flex-row items-center gap-2">
                        <Link
                          to={`/rooms/${listing.listingId}`}
                          className=" text-sm text-gray-800 font-medium w-[120px] underline hover:text-blue-500 transition-all duration-200 ease-in"
                        >
                          See listing
                        </Link>
                      </td>

                      {/* guest number */}
                      <td className=" px-6 py-4 w-[120px]">
                        <p className="text-sm text-[#222222]">
                          {listing.guestNumber}
                        </p>
                      </td>
                      {/* night staying */}
                      <td className=" px-6 py-4 w-[120px]">
                        <p className="text-sm text-[#222222]">
                          {listing.nightStaying}
                        </p>
                      </td>
                      {/* author earned */}
                      <td className=" px-6 py-4 w-[120px]">
                        <p className="text-sm text-[#222222]">
                          ${listing.authorEarnedPrice}
                        </p>
                      </td>
                      {/* check in */}
                      <td className=" px-6 py-4 w-[120px]">
                        <p className="text-sm text-[#222222]">{checkIn}</p>
                      </td>
                      {/* check out */}
                      <td className=" px-6 py-4 w-[120px]">
                        <p className="text-sm text-[#222222]">{checkOut}</p>
                      </td>
                      {/* <td className=" px-6 py-4 w-[120px]">
                        <Link to={`/users/${listing._id}/reviews`}>
                          <p className="text-sm text-[#222222]">Post a review</p>
                        </Link>
                      </td> */}

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllReservations;
