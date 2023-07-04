import {useState,useEffect} from 'react'
import {useStateValue} from '../../../StateProvider'
import axios from 'axios'
import {toast} from 'react-toastify'

export default function Reviewtab() {


    const [{user}, dispatch] = useStateValue();
    
    const [review,setReview] = useState([]);
    
    const deleteReview = async (id) => {

      await axios.delete(`/ratingProduct/deleteReview/${id}`)

      toast.success('You have delete your review')

        setTimeout(function (){
          window.location.href="/user/dashboard"
        },1500)

    }
    
      const getReview = async () => {
        const res = await axios.post('/ratingProduct/getUserReview', {email:user.email})
        setReview(res.data)
      }
      useEffect(() => {
      getReview();
    },[])

  return (
    <div>
      {review.map(item => (
        <div style={{textAlign:'left'}} className="bg-white px-2 py-1 my-2 d-flex justify-content-between align-items-center">

<div>

        <img style={{height:'100px',width:'100px'}} src={item.image} alt=""/><span>{item.slug}</span>
<br></br>
          {[...Array(item.selectedrating).keys()].map(i=> {
            return (
              <i className="bi bi-star-fill text-warning"></i>
            )
          })}
        <h5>{item.reviewTitle}</h5>
        <p>{item.reviewBody}</p>
        <small>{item.createdAt.slice(0,10)}</small>
  </div>
  
      <button className="bg-danger btn" onClick={() => deleteReview(item._id)}>Delete</button>
            </div>
      ))}

    </div>
  )
}
