import React,{useState,useRef,useEffect} from 'react'
import {Link} from 'react-router-dom'
import './Home.css'
import {motion} from 'framer-motion'
import AOS from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'
import slideshow from './data'
import plants from './Plantsdata'
import {gsap,Power2} from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)


export default function Home() {


    const [products,setproducts] = useState([])

    const fetchdata = async () => {
        const res = await axios.get('/api/newproducts')
        setproducts(res.data.newproducts)
    }

    
    useEffect(() => {
        fetchdata()
    },[])


      
    const [searchTerm, setSearchTerm] = useState('');

 

    useEffect(()=> {
        AOS.init()
    },[])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filtered = !searchTerm
        ? products
        : products.filter((y) =>
            y.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const [current, setCurrent] = useState(0);
    const [slide] = useState(slideshow);

    const length = slide.length

    const timeout = useRef(null)

    // auto slide && stop when button is clicked
    useEffect(()=> {
    const nextSlide = () => {
        setCurrent((current) => (current === length -1 ? 0 : current + 1))
    } 

    timeout.current = setTimeout(nextSlide, 4000)

    //clear timeout and reset its set time
    return function (){
        if(timeout.current){
            clearTimeout(timeout.current)
        }
    }

    },[current,length])

    const nextSlide = () => {
        if(timeout.current){
            clearTimeout(timeout.current)
        }
        setCurrent(current === length - 1 ? 0 : current + 1)
    }

    const prevSlide = () => {
        if(timeout.current){
            clearTimeout(timeout.current)
        }
        setCurrent(current === 0 ? length - 1 : current - 1)
    }

    if (!Array.isArray(slide) || slide.length <= 0) {
        return null;
    }

    function left() {
        document.getElementById('scroll').scrollLeft -= 350;
    }

    function right() {
        document.getElementById('scroll').scrollLeft += 350;
    }
   


    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1,transition:{duration:0.5}}}>

            <input className="w-100 p-1 border-0" type="text" placeholder="SEARCH YOUR PRODUCT" value={searchTerm} onChange={handleSearch} />

            <div className="search-filter">
            {filtered.map((filterproduct) => {
                return (

                    <div className={!searchTerm ? "d-none" : "d-block m-4 text-center"}>
                           
                        <img style={{width:'300px',height:'300px'}} src={filterproduct.image.url} alt="" />
                        <p key={filterproduct.slug}>{filterproduct.title}</p>
                        <p>£ {filterproduct.price}</p>
                        <button className="btn bg-white px-2 rounded-0 py-1 text-white border-2 border-dark"><Link to={`/api/products/slug/${filterproduct.slug}`}>View More</Link></button>
                           </div> 
                )
            })}
            </div>

            <div animate={{opacity:1, transition:'0.5s all'}} className={!searchTerm ? "d-block" : "d-none"}>

                <div className="parallax">
                    <div>
                        <h5>Bring Aquatic Nature to your Home</h5>
                        </div>

                        <div className="arrow">
                     <i className="bi bi-arrow-down"></i>
                        </div>
                </div>
            


                <section className="section">
                    <button className="left-arrow" onClick={prevSlide}><i className="fas fa-chevron-left"></i></button>
                    <button className="right-arrow" onClick={nextSlide}><i className="fas fa-chevron-right"></i></button>
                    {slideshow.map((slides, index) => (
                        (
                            <>
                                {index === current && (
                                    <motion.div className="slideshow-flex" initial={{opacity:0}} animate={{opacity:1}}>
                                        
                                        
                                            <motion.img initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}} className="img-fluid" src={slides.image} alt={slides.title}/>
                                        
                                    
                                        <div className="my-3 slideshow-details">


                                        <div className="title">
                                        <p>{slides.title}</p>
                                        <motion.div initial={{height:'100%'}} animate={{height:0}} transition={{delay:1}} className="title-reveal"></motion.div>
                                        </div>


                                        <div className="price">
                                        <h5 style={{fontWeight:'bold'}}>{slides.price}</h5>
                                        <motion.div initial={{height:'100%'}} animate={{height:0}} transition={{delay:1.5}} className="price-reveal"></motion.div>
                                        </div>

                                        <br></br>
                                        <motion.span initial={{transform:'scale(0)'}} animate={{transform:'scale(1.2)'}} transition={{delay:1.5}} className="btn bg-white rounded-0"><Link className="text-dark" to={slides.link}>View More</Link></motion.span>
                                        </div>                                    
                                    </motion.div>
                                )}
                                </>
                        )
                    ))}
                </section>

                <div data-aos="zoom-in">

                <h4 className="text-white px-2 py-2">Browse our range of Aquatic plants</h4>
                
                <div className="slide-option py-2">


<div className="slide-container" id="scroll" >
    <button onClick={left} className="left"><i className="fas fa-chevron-left"></i></button>
   {plants.map((item)=> (
    
    <div>

    <div className="plants-card rounded-0">
    <img src={item.image} alt=""/>
    </div>

    <div className="plants-card2 rounded-0">
        <img src={item.doubleimg} alt=""/>
    </div>

    <small>{item.title}</small>
    <br></br>
<Link className="btn border-1 border-secondary rounded-0" to={item.link}>View More</Link>
    </div>

   ))}
    <button onClick={right} className="right"><i className="fas fa-chevron-right"></i></button>
</div>

                </div>

                </div>


                <div className="slider-scroll bg-success bg-opacity-50 p-2">

        <h5  className="text-white">Featured Categories</h5>
                    <div className="grid p-2 mb-5">
     

     <div  className="product-grid" data-aos="zoom-in">
      <img src="https://www.aquasabi.de/vcdn/images/dynamic/adaptive/5b9YKMMRlp/naturaquarium-takashi-amano.jpg" alt="tanks"></img>
      <br></br>
      <div className="product-view">
      <p>TANKS</p>
      <button className="btn bg-white"><Link to="/Tanks">View Products</Link></button>
      </div>
     </div>

     <div className="product-grid" data-aos="zoom-in">
     <img src="https://storefeederimages.blob.core.windows.net/realaquaticsltd/Products/35d46c7b-a3ab-415e-b818-e527a968ece2/Full/khpy4qymvfo.jpg" alt="foreground"/>
<br></br>
<div className="product-view">
<p>Plants</p>
<button className="btn bg-white"><Link to="/foreground">View products</Link></button>
</div>
     </div>

     <div className="product-grid" data-aos="zoom-in">
     <img  src="https://www.aquasabi.com/media/image/product/27669/lg/twinstar-led-light-iii-sp.jpg" alt="lighting"/>
<br></br>
<div className="product-view">
<p>LIGHTING</p>
<button className="btn bg-white"><Link to="/lighting">View Products</Link></button>
</div>
     </div>


     <div className="product-grid" data-aos="zoom-in">
    <img src="https://www.azaqua.nl/img/cms/hardscape-aquascaping.jpg" alt="ornaments"/>
    <br></br>
    <div className="product-view">
    <p>HARDSCAPING</p>
    <button className="btn bg-white"><Link to="/woodsrocks">View Products</Link></button>
    </div>
     </div>

     </div>

                </div>

                <div className="containerfluid bg-secondary">

                    <div className="footer-details d-flex justify-content-between px-2 py-4">

                        <div>
                            <h6>Company Info</h6>
                            <p>About Us</p>
                            <p>Blog</p>
                        </div>

                        <div>
                            <h6>Services & Support</h6>
                            <p>Contact Us</p>
                            <p>Warranty</p>
                            <p>Delivery</p>
                            <p>Returns</p>
                            <p>FAQ's</p>
                        </div>


                        <div>
                        <h6>Opening Times</h6>
                            <p>MON-FRI: 9:00AM - 3:00PM</p>
                            <p>SAT & SUN: CLOSED</p>

                        <h6>Contact No</h6>
                        <p>01211 000000</p>
                        </div>
                        <div>

                            <h6>Get in touch with us on</h6>
                            <i className="h2 fab fa-instagram"></i>
                            <i className="h2  mx-2 fab fa-youtube"></i>
                            <i className="h2 fab fa-facebook"></i>
                            <br></br>
                            <h5>Accept</h5>
                            <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="mastercard"/>
                            <img src="https://img.icons8.com/fluency/48/000000/bank-card-front-side.png" alt="debit card"/>
                        </div>

                    </div>

                </div>

            </div>

        </motion.div>
    )
}
