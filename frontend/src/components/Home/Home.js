import React,{useState,useRef,useEffect} from 'react'
import {Link } from 'react-router-dom'
import './Home.css'
import {motion} from 'framer-motion'
import AOS from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'
import {toast} from 'react-toastify'
export default function Home(props) {

    const {products} = props


    const [searchTerm, setSearchTerm] = useState('');

    const [current, setCurrent] = useState(0);
    const [slide] = useState(products);

    const [email,setemail] = useState('')

    const subscribebtn = async (e) => {
        e.preventDefault()

        await axios.post('/api/subscribe', {
            email
        })
        .then(()=> {
            setemail('')
            toast.success('Thank you for joining with us')
            window.location.href="/"
        })
    }


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

    useEffect(()=> {
        AOS.init()
    },[])

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


    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filtered = !searchTerm
        ? products
        : products.filter((y) =>
            y.title.toLowerCase().includes(searchTerm.toLowerCase())
        );


    function left() {
        document.getElementById('scroll').scrollLeft -= 350;
    }

    function right() {
        document.getElementById('scroll').scrollLeft += 350;
    }
   

    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1,transition:{duration:0.5}}}>

            <input className="w-100 p-1 border-0" type="text" placeholder="SEARCH YOUR PRODUCT" value={searchTerm} onChange={handleSearch} />

            {filtered.map((filterproduct) => {
                return (
                    <div className={!searchTerm ? "d-none" : "d-block m-4 text-center search-filter"}>
                        <img style={{width:'200px',height:'200px'}} src={filterproduct.image} alt="" />
                        <p key={filterproduct.slug}>{filterproduct.title}</p>
                        <p>£ {filterproduct.price}</p>
                        <button onClick={() => {

                        }} className="bg-primary px-2 rounded-1 py-1 text-white border-0"><Link to={`/api/products/slug/${filterproduct.slug}`}>View More</Link></button>
                    </div>
                )
            })}

            <div className={!searchTerm ? "d-block" : "d-none"}>

                <section className="section mb-4">
                    <button className="left-arrow" onClick={prevSlide}><i className="fas fa-chevron-left"></i></button>
                    <button className="right-arrow" onClick={nextSlide}><i className="fas fa-chevron-right"></i></button>
                    {products.map((slides, index) => (
                        (
                            <div className="text-center slideshow mt-5">
                                {index === current && (
                                    <motion.div className="slideshow-flex" initial={{transform:'translateX(-100%)',opacity:0}} animate={{transform:'translateX(0%)',opacity:1, transition:{duration:1}}} exit={{transform:'translateX(100%)'}}>
                                        
                                        <div className="slideshow-img" data-aos="zoom-in"  data-aos-delay="1000">
                                        <img src={slides.image} alt="" />
                                        </div>

                                        <div className="my-3">
                                        <h5>{slides.title}</h5>
                                        <p>{slides.description}</p>
                                        <p>£{slides.price}</p>
                                        <span style={{border:'2px solid black'}} className="btn bg-white bg-opacity-50" key={slides.slug}><Link className="text-dark" to={`/api/products/slug/${slides.slug}`}>View More</Link></span>
                                        </div>

                                    </motion.div>
                                )}
                            </div>
                        )
                    ))}
                </section>


               


                <div data-aos="zoom-in"
     data-aos-delay="500"
      className="slider-scroll bg-success bg-opacity-50 p-2">

                    <h4>Our top selling product</h4>

                    <div className="slide-option p-2 mb-5">


                        <div className="slide-container" id="scroll" >
                            <button onClick={left} className="left"><i className="bi bi-chevron-left"></i></button>
                            {products.map((item) => (
                                <div>
                                    <img src={item.image} alt="" />
                                    <p>{item.title}</p>
                                    <button className="px-2 border-1 border-dark" key={item.slug}><Link to={`/api/products/slug/${item.slug}`}>View More</Link></button>
                                </div>
                            ))}
                            <button onClick={right} className="right"><i className="bi bi-chevron-right"></i></button>
                        </div>
                    </div>
                </div>

<div className="bg-dark" data-aos="zoom-in"   data-aos-delay="600">

<h4 className="pt-2 px-2 text-white">New Arrival</h4>

                <div className="show-product">
                    {products.map((item) => (
                        <div className="card text-center" data-aos="flip-left"
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="2000">
                            <h6>{item.title}</h6>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sagittis tincidunt lorem.</p>
                            <button className="border-1 px-2 border-dark" key={item.slug}><Link to={`/api/products/slug/${item.slug}`}>View More</Link></button>
                            <img className="img-fluid" alt="" src={item.image} />
                        </div>
                    ))}
                </div>

</div>

                <div className="save-price px-2 py-1 bg-white d-flex justify-content-between align-items-center">
                    <img style={{ width: '100px', height: '100px' }} alt="" src="./images/pixel6.png" />

                    <div className="d-flex justify-content-between save-details text-center">
                        <h4>Great Phones</h4>
                        <h4 className="text-success">Amazing Prices.</h4>
                        <h4>Shop Now</h4>
                        <h4>------&gt;</h4>
                    </div>

                    <button className="border-0 py-2 bg-primary shop-now-btn text-white px-2">
                        <Link className="text-white" to="/Product">Shop At Us</Link></button>
                </div>

                <div className="containerfluid bg-secondary">

                    <div className="footer-details d-flex justify-content-between px-2 py-4">

                        <div>
                            <h6>Company Info</h6>
                            <p>About Us</p>
                            <p>Blog</p>
                            <p>Competitions</p>
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
                            <h6>Security & Privacy</h6>
                            <p>Terms and Conditions</p>
                            <p>Privacy Policy</p>
                            <p>Cookie Policy</p>
                            <i className="h2 fab fa-instagram"></i>
                            <i className="h2  mx-2 fab fa-youtube"></i>
                            <i className="h2 fab fa-facebook"></i>
                            <br></br>
                            <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="mastercard"/>
                            <img src="https://img.icons8.com/fluency/48/000000/bank-card-front-side.png" alt="debit card"/>
                        </div>

                    </div>

                </div>

            </div>

        </motion.div>
    )
}
