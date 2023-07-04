import {useState,useEffect} from 'react'

import {useParams} from 'react-router-dom'

import axios from 'axios'

import {toast} from 'react-toastify' 

import './Plants.css'

export default function PlantsReview() {

    const { slug }=useParams();
    const [details, setDetails]=useState([])

    const fetchData = async () => {
        const res = await axios.get(`/api/plants/slug/${slug}`)
        setDetails(res.data)
    }

        useEffect(()=> {
        fetchData();
        },[slug])


    const [rating,setrating] = useState(0)

    const [selectedrating,setselectedrating] = useState(0)

    const [name,setname] = useState('')
    const [location,setlocation] = useState('')
    const [email,setemail] = useState('')
    const [reviewTitle,setReviewTitle] = useState('')
    const [reviewBody,setReviewBody] = useState('')

  const ratingProduct = async () => {

      await axios.post('/ratingProduct/ratingProduct', {
        image:details.image?.url,
          slug: details?.slug,
          name,
          location,
          email,
          selectedrating,
          reviewTitle,
          reviewBody
      })

      toast.success('Thank you for your feedback.')

  }

    return (
    <div className="text-center bg-white bg-opacity-50 py-2">
      <h5 className="bg-secondary">Write A Review</h5>

        
        <img style={{width:'100px',height:'100px'}} src={details.image?.url} alt=""/>
        <p>{details?.title}</p>

      <hr></hr>

    <p>Name</p>
    <input value={name} onChange={(e) => setname(e.target.value)} className="px-2 py-1 border-0" type="text" placeholder="Enter your full name"/>

    <p>Location</p>
    <input value={location} onChange={(e) => setlocation(e.target.value)} className="px-2 py-1 border-0" type="text" placeholder="Example: London"/>

    <p>Email Address</p>
    <input value={email} onChange={(e) => setemail(e.target.value)}  className="px-2 py-1 border-0" type="email" placeholder="Enter your email address"/>

    <p>Only your name and location will be displaed on your review</p>

    <hr></hr>

    <h1>Your Review</h1>

    <p>Rating</p>
    {[...Array(5)].map((star,index) => {
        index += 1
        return(
            <button className="border-0 px-2 py-1" onClick={()=> setrating(index)} onMouseEnter={()=> setselectedrating(index)}>
                <i className={index <= (selectedrating || rating) ? 'bi bi-star-fill star' : 'bi bi-star-fill'}></i>
            </button>
        )
    })}

    <p>Review Title</p>
    <input value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)} className="px-2 py-1 border-0" type="text" placeholder="Enter the title"/>
    
    <p>Review Body</p>
    <textarea value={reviewBody} onChange={(e) => setReviewBody(e.target.value)} style={{height:'200px'}} className="w-50 border-0" type="text" placeholder="What do you like or dislike about this product"/>

        <br></br>
        <br></br>

    <button  onClick={()=> ratingProduct()} className="bg-success px-2 py-1 text-white w-100 border-0">Submit Review</button>


    </div>
  )
}
