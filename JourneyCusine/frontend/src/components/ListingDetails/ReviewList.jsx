import { useQuery } from '@tanstack/react-query'
import React from 'react'
import api from '../../backend'


const ReviewCard = ({ review }) => {
    return <>
        {review?.userId?.name.firstName}
        {review?.userId?.name.lastName}
        {review?.userId?.email}
        {review.rating}
        {review.review}
    </>
}

const ReviewList = ({listingId}) => {
    const { data, isLoading,isSuccess } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await api.get(`/house/review/${listingId}`)
            return res.data
        }
    })
    return (
        <>

        <h2>

          {/* {data?.length < 1 && 'No review yet.'} */}

        </h2>
            {/* <div className='flex flex-col jus '>
                {isSuccess && data?.map((review) => (
                    <ReviewCard review={review} key={review._id} />
                ))}
            </div> */}
        </>

    )
}

export default ReviewList
