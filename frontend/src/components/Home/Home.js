import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import { motion } from 'framer-motion'
import AOS from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'
import slideshow from './data'
import plants from './Plantsdata'
import Pagination from './Pagination'
import {GetProducts} from '../GraphQLData/GetProducts'
import { gql,useQuery } from '@apollo/client'


export default function Home() {    
    const {data} = useQuery(GetProducts)


    const [products, setproducts] = useState([])
    const [review, setreview] = useState([])


    const fetchData = () => {
        if(data){
            setproducts(data.products)
        }
    }

    const showReview = async () => {

        const res = await axios.get('/ratingProduct/showReview')

        setreview(res.data)

    }

    useEffect(() => {
        fetchData()
        showReview()
        
    }, [data])
    

    const [searchTerm, setSearchTerm] = useState('');

    const [currentPage, setCurrentPage] = useState(1)

    const [perPage, setPerPage] = useState(5)


    useEffect(() => {
        AOS.init()
    }, [])


    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1)
    };


    const filtered = !searchTerm
        ? products
        : products.filter((y) => y.title.toLowerCase().includes(searchTerm.toLowerCase()));

    
    const [current, setCurrent] = useState(0);
    const [slide] = useState(slideshow);

    const length = slide.length

    const timeout = useRef(null)

    // auto slide && stop when button is clicked
    useEffect(() => {
        const nextSlide = () => {
            setCurrent((current) => (current === length - 1 ? 0 : current + 1))
        }

        timeout.current = setTimeout(nextSlide, 4000)

        //clear timeout and reset its set time
        return function () {
            if (timeout.current) {
                clearTimeout(timeout.current)
            }
        }

    }, [current, length])

    const nextSlide = () => {
        if (timeout.current) {
            clearTimeout(timeout.current)
        }
        setCurrent(current === length - 1 ? 0 : current + 1)
    }

    const prevSlide = () => {
        if (timeout.current) {
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


    const indexOfLastPost = currentPage * perPage
    const indexOfFirstPost = indexOfLastPost - perPage
    const currentPosts = filtered.slice(indexOfFirstPost, indexOfLastPost)



       const star = (value) => {

    
                const ratinglength = review.map(item => item.slug === value && item)
        
                const scores = ratinglength.map(item => item.selectedrating).filter(function(x) {
                    return x !== undefined
                })
        
                const average = scores.reduce((totalRates, score) => totalRates + score, 0)
                const averageTotal = parseInt(average / scores.length) || 0     
                
                const star =  [...Array(averageTotal).keys()].map(i=> {
                    
                    return (
                        <>
                        <i className="bi bi-star-fill text-warning"></i>
                        </>
                        )
                    })
                
                    return star.concat( 
                        <>
                        <br></br>
                        <small>{scores.length} customers reviews</small>
                        </>
                    )                  
        
            }
        
            

       


    return(
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.5 } }}>


            <input className="w-100 p-1 border-0" type="text" placeholder="SEARCH YOUR PRODUCT" value={searchTerm} onChange={handleSearch} />


            <div className={!searchTerm ? "d-none" : "d-block"}>


                <div className="search-filter">

                

                    {currentPosts.map((filterproduct) => {
                        return(
                            <div className='m-4 text-center'>
                                <img style={{ width: '300px', height: '300px' }} src={filterproduct.image.url} alt="" />
                                <p key={filterproduct.slug}>{filterproduct.title}</p>
                                <p>£ {filterproduct.price}</p>
        
                                 {star(filterproduct.slug)}
                        
                                <br></br>

                                {filterproduct.category === 'Tanks' ? (
                                    <button className="btn bg-white px-2 rounded-0 py-1 text-white border-2 border-dark"><Link to={`/api/tanks/slug/${filterproduct.slug}`}>View More</Link></button>
                                ) : (
                                    filterproduct.category === 'Plants' ?
                                        <button className="btn bg-white px-2 rounded-0 py-1 text-white border-2 border-dark"><Link to={`/api/plants/slug/${filterproduct.slug}`}>View More</Link></button>

                                        :
                                        <button className="btn bg-white px-2 rounded-0 py-1 text-white border-2 border-dark"><Link to={`/api/products/slug/${filterproduct.slug}`}>View More</Link></button>


                                )
                                }

                            </div>

                        
                        )
                    })}


                </div>

            
                <Pagination currentPosts={currentPosts} currentPage={currentPage} setCurrentPage={setCurrentPage} />

            </div>

            <div animate={{ opacity: 1, transition: '0.5s all' }} className={!searchTerm ? "d-block" : "d-none"}>

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
                                    <motion.div className="slideshow-flex" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>


                                        <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="img-fluid" src={slides.image} alt={slides.title} />


                                        <div className="my-3 slideshow-details">


                                            <div className="title">
                                                <p>{slides.title}</p>
                                                <motion.div initial={{ height: '100%' }} animate={{ height: 0 }} transition={{ delay: 1 }} className="title-reveal"></motion.div>
                                            </div>


                                            <div className="price">
                                                <h5 style={{ fontWeight: 'bold' }}>{slides.price}</h5>
                                                <motion.div initial={{ height: '100%' }} animate={{ height: 0 }} transition={{ delay: 1.5 }} className="price-reveal"></motion.div>
                                            </div>

                                            <br></br>
                                            <motion.span initial={{ transform: 'scale(0)' }} animate={{ transform: 'scale(1.2)' }} transition={{ delay: 1.5 }} className="btn bg-white rounded-0"><Link className="text-dark" to={slides.link}>View More</Link></motion.span>
                                        </div>
                                    </motion.div>
                                )}
                            </>
                        )
                    ))}
                </section>



                <div>

                    <h4 className="text-white px-2 py-2">Browse our range of Aquatic plants</h4>

                    <div className="slide-option py-2">


                        <div className="slide-container" id="scroll" >
                            <button onClick={left} className="left"><i className="fas fa-chevron-left"></i></button>
                            {plants.map((item) => (

                                <div>

                                    <div className="plants-card rounded-0">
                                        <img src={item.image} alt="" />
                                    </div>

                                    <div className="plants-card2 rounded-0">
                                        <img src={item.doubleimg} alt="" />
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


                <div className="bg-success bg-opacity-50 p-2">

                    <h5 className="text-white">Featured Categories</h5>

                    <div className="product-grid">


                        <div className="product-grid-one">

                            <button><Link to="/woodsrocks">Hardscaping</Link></button>

                        </div>

                        <div className="product-grid-two">

                            <button><Link to="/lighting">Lighting</Link></button>

                        </div>

                        <div className="product-grid-three">

                            <button ><Link to="/soil">Soil & Substrate</Link></button>

                        </div>

                        <div className="product-grid-four">

                            <button><Link to="/Tanks">Tanks</Link></button>

                        </div>

                        <div className="product-grid-five">

                            <button><Link to="/fertiliser">Plant Fertiliser</Link></button>

                        </div>

                        <div className="product-grid-six">

                            <button><Link to="/plants">Plants</Link></button>

                        </div>


                    </div>


                </div>

                <div className="aquascape-pic">
                    <img className="w-100 h-100" src='https://www.adana.co.jp/wp-content/uploads/sites/3/2019/05/nitg_aj283_02.jpg' alt="aquascape" />

                    <div className="btn-1">
                        <Link to="/api/plants/slug/Cryptocoryne-backettii-petchii">
                            <button className="button"><i className="bi bi-cart"></i></button>
                        </Link>
                        <label>Cryptocoryne Backetti</label>
                    </div>

                    <div className="btn-2">
                        <Link to="/api/plants/slug/Eleocharis-parvula">
                            <button className="button"><i className="bi bi-cart"></i></button>
                        </Link>
                        <label>Eleocharis Parvula</label>
                    </div>

                    <div className="btn-3">
                        <Link to="/api/plants/slug/Ludwigia-repens-'Rubin'">
                            <button className="button"><i className="bi bi-cart"></i></button>
                        </Link>
                        <label>Ludwigia Repens</label>
                    </div>


                    <div className="btn-4">
                        <Link to="/api/plants/slug/Microsorum-pteropus">
                            <button className="button"><i className="bi bi-cart"></i></button>
                        </Link>
                        <label>Microsorum Pteropus</label>
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

                            <h6>Contact Detail</h6>
                            <p>Aquature@outlook.com</p>
                        </div>

                        <div>

                            <h6>Get in touch with us on</h6>
                            <i className="h2 fab fa-instagram"></i>
                            <i className="h2  mx-2 fab fa-youtube"></i>
                            <i className="h2 fab fa-facebook"></i>
                            <br></br>
                            <h5>Accept</h5>
                            <img src="https://play-lh.googleusercontent.com/tDXSaAt_I_qx6am_rTcQ1WHaXo6ncfiB-b742DnSXZkJGASvs15yRYnvzogzbYwse0QD" style={{height:'40px', width:'50px'}} alt="visa"/>
                            <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="mastercard" />
                            <img src="https://img.icons8.com/?size=50&id=13608&format=png" alt="debit card" />
                        </div>

                    </div>

                </div>

            </div>

        </motion.div>
    )
}
