
import React from 'react'
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/navigation";
import { Autoplay,Mousewheel, Keyboard}  from 'swiper'
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
// import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from 'react';
import { ratingsEndpoints } from '../../services/apis'
import { apiConnector } from '../../services/apiconnector'
import RatingStars from '../common/RatingStars'


const RatingSlider = () => {
    const [Reviews, setReviews] = useState([]);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        const getReviews = async () => {
            setLoading(true);
            try {
                const res = await apiConnector("GET",ratingsEndpoints.REVIEWS_DETAILS_API);
                setReviews(res.data.data);
                console.log("LOGGING REVIEWS",res);
            } catch (error) {
                console.log("LOGGING Review ERROR",error);
            } finally {
                setLoading(false);
            }
        }
        getReviews();
    }, [])
  return (
    <div>
        <Swiper
                 mousewheel={
                      {
                          enabled: true,
                          forceToAxis: true,
                      } 
                 }
                 keyboard={
                      {
                          enabled: true,
                          onlyInViewport: true,
                      }
                 }
                 allowSlidePrev={true}
                    slidesPerView={1}
                    loop={true}
                    spaceBetween={20}
                    pagination={false}
                    modules={[Mousewheel,Keyboard, Autoplay]}
                    className="mySwiper md:pt-5"
                    autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                    }}
                    style={{
                        "--swiper-navigation-size": "20px",
                      }}
                    freeMode={false}
                    rewind={false}
                    centeredSlides={true}
                    navigation={false}
                    // navigation={
                    //     {
                    //         nextEl: ".swiper-button-next",
                    //         prevEl: ".swiper-button-prev",
                    //     }
                    // }
                    breakpoints={{
                        300:{slidesPerView:1.1,spaceBetween:10,},
                        640:{slidesPerView:2.2,},
                        1024:{slidesPerView:3.1,}
                    }}
                    
                   
                >
                    {
                        Reviews?.map((review, index)=> (
                            <SwiperSlide key={index}>
                                <div className='flex flex-col gap-3 min-h-[150px] bg-richblack-800 p-3 text-[14px] text-richblack-25'>
                                    <div className='flex items-center gap-4'>
                                        <img src={review?.user?.image} alt="user" className='h-9 w-9 rounded-full object-cover' />
                                        <div className='flex flex-col'>
                                            <h3 className='font-semibold text-richblack-5'>{review?.user?.firstName} {review?.user.lastName}</h3>
                                            <p className='text-[12px] font-medium text-richblack-500'>{review?.course?.courseName}</p>
                                        </div>
                                    </div>
                                    <div className='font-medium text-richblack-25'>{review?.review.slice(0,70)}...</div>
                                    <RatingStars Review_Count={review?.rating} />
                                </div>
                            </SwiperSlide>
                        ))
                    }   
                    {/* <div className='swiper-button-next'></div> */}
                    {/* <div className='swiper-button-prev'></div> */}
                </Swiper>
    </div>
  )
}

export default RatingSlider


// import React, { useEffect, useState } from "react"
// import ReactStars from "react-rating-stars-component"
// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react"

// // Import Swiper styles
// import "swiper/css"
// import "swiper/css/free-mode"
// import "swiper/css/pagination"
// import "../../App.css"
// // Icons
// import { FaStar } from "react-icons/fa"
// // Import required modules
// import { Autoplay, FreeMode, Pagination } from "swiper"

// // Get apiFunction and the endpoint
// import { apiConnector } from "../../services/apiconnector"
// import { ratingsEndpoints } from "../../services/apis"

// function ReviewSlider() {
//   const [reviews, setReviews] = useState([])
//   const truncateWords = 15

//   useEffect(() => {
//     ;(async () => {
//       const { data } = await apiConnector(
//         "GET",
//         ratingsEndpoints.REVIEWS_DETAILS_API
//       )
//       if (data?.success) {
//         setReviews(data?.data)
//       }
//     })()
//   }, [])

//   // console.log(reviews)

//   return (
//     <div className="text-white">
//       <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
//         <Swiper
//           slidesPerView={4}
//           spaceBetween={25}
//           loop={true}
//           freeMode={true}
//           autoplay={{
//             delay: 2500,
//             disableOnInteraction: false,
//           }}
//           modules={[FreeMode, Pagination, Autoplay]}
//           className="w-full "
//         >
//           {reviews.map((review, i) => {
//             return (
//               <SwiperSlide key={i}>
//                 <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
//                   <div className="flex items-center gap-4">
//                     <img
//                       src={
//                         review?.user?.image
//                           ? review?.user?.image
//                           : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
//                       }
//                       alt=""
//                       className="h-9 w-9 rounded-full object-cover"
//                     />
//                     <div className="flex flex-col">
//                       <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
//                       <h2 className="text-[12px] font-medium text-richblack-500">
//                         {review?.course?.courseName}
//                       </h2>
//                     </div>
//                   </div>
//                   <p className="font-medium text-richblack-25">
//                     {review?.review.split(" ").length > truncateWords
//                       ? `${review?.review
//                           .split(" ")
//                           .slice(0, truncateWords)
//                           .join(" ")} ...`
//                       : `${review?.review}`}
//                   </p>
//                   <div className="flex items-center gap-2 ">
//                     <h3 className="font-semibold text-yellow-100">
//                       {review.rating.toFixed(1)}
//                     </h3>
//                     <ReactStars
//                       count={5}
//                       value={review.rating}
//                       size={20}
//                       edit={false}
//                       activeColor="#ffd700"
//                       emptyIcon={<FaStar />}
//                       fullIcon={<FaStar />}
//                     />
//                   </div>
//                 </div>
//               </SwiperSlide>
//             )
//           })}
//           {/* <SwiperSlide>Slide 1</SwiperSlide> */}
//         </Swiper>
//       </div>
//     </div>
//   )
// }

// export default ReviewSlider
