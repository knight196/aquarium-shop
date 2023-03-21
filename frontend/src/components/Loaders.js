import {useRef,useState,useEffect} from 'react'

export default function Loaders() {


  const loadericon = [
    {
      img:'https://cdn-icons-png.flaticon.com/512/5793/5793684.png'
    },
    {
      img:'https://cdn-icons-png.flaticon.com/512/1145/1145548.png'
    },
    {
      img:'https://cdn-icons-png.flaticon.com/512/5295/5295197.png'
    }
  ]

const [current, setCurrent] = useState(0);
const [slide] = useState(loadericon);

const length = slide.length

const timeout = useRef(null)

// auto slide && stop when button is clicked
useEffect(()=> {
const nextSlide = () => {
    setCurrent((current) => (current === length -1 ? 0 : current + 1))
} 

timeout.current = setTimeout(nextSlide, 2000)

//clear timeout and reset its set time
return function (){
    if(timeout.current){
        clearTimeout(timeout.current)
    }
}

},[current,length])


if (!Array.isArray(slide) || slide.length <= 0) {
    return null;
}


  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}} className="loader-animated">
      
{
  loadericon.map((item,index) => (
    <div >
    {index === current && (
      <img className="mySlides" src={item.img} alt="text"/>
    )}
    <p>Loading....</p>
      </div>
  ))
}

    </div>
  )
}
