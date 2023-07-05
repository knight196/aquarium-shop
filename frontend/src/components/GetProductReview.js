import {useEffect,useState} from 'react'
import axios from 'axios'

export default function GetProductReview({Product}) {

const [review,setreview] = useState([])


  const reviewProduct = async () => {

    const res = await axios.post( '/ratingProduct/getReview', {slug:Product.slug})

    setreview(res.data)

  }

  

  useEffect(() => {
    
    reviewProduct()

  },[Product])

 


  const star = () => {
    const scores = review.map(review => review.selectedrating)
    
    const average = scores.reduce((totalRates,score) => totalRates + score,0)
    const averageTotal = parseInt(average / review.length) || 0
   
    const star =  [...Array(averageTotal).keys()].map(i=> {
    return (
      <i className="bi bi-star-fill text-warning"></i>
      )
    })

    return star
    
  }

  return (
    <>
    {review.length === 0 && (<p>No Reviews</p>)}
 
    {star()} <span>{review.length} customer reviews</span>

    {review.length !== 0 && (
      <>
      {review.map(item => (
        <div className="bg-white px-2 py-1 my-2">
          {[...Array(item.selectedrating).keys()].map(i=> {
            return (
              <i className="bi bi-star-fill text-warning"></i>
            )
          })}
      <h4>{item.reviewTitle}</h4>
      <p>{item.reviewBody}</p>
      <small>{item.name}</small> | <small>{item.location}</small> | <small>{item.createdAt.slice(0,10)}</small>
      </div>
        ))}
      </>      
      )}
    </>
  )
}
