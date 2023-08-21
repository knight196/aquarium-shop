import {useEffect,useState} from 'react'
import axios from 'axios'
import './Product/Product.css'

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

  const [mostRecent] = useState('mostRecent')
  const [topRated] = useState('topRated')

  function filterRating(col){
  if(topRated === 'topRated'){
    const sorted = [...review].sort((a,b) => 
    a[col] < b[col] ? 1 : -1
    )
    setreview(sorted)
  }else if(mostRecent === 'mostRecent'){
    const sorted = [...review].sort((a,b) => 
    a[col] < b[col] ? 1 : -1
    )
    setreview(sorted)
  }
  }


  return (
    <>
    {review.length === 0 && (<p>No Reviews</p>)}
 
 <div className="d-flex justify-content-between align-items-center">

<div className="review-star">
    {star()} <span>{review.length} customer reviews</span>
  </div>  

<div className="filter-btn">
    <button className="btn btn-primary" onClick={()=> filterRating('createdAt')}>MostRecent</button>
    <button className="btn btn-primary" onClick={()=> filterRating('selectedrating')}>Top Rated</button>
</div>

 </div>

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
