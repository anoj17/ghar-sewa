import React, { useState } from 'react'
import ReactStars from "react-rating-stars-component";
import api from '../../backend';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PulseLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import ReviewList from './ReviewList';

const Review = ({ listingId }) => {

    const queryClient = useQueryClient()

    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('')

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
                    <div>
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
                    : null

            }
            <ReviewList listingId={listingId} />
        </>
    )
}

export default Review
