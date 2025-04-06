import React from 'react'
import instaImg1 from '../../public/assets1/instagram-1.jpg'
import instaImg2 from '../../public/assets1/instagram-2.jpg'
import instaImg3 from '../../public/assets1/instagram-3.jpg'
import instaImg4 from '../../public/assets1/instagram-4.jpg'
import instaImg5 from '../../public/assets1/instagram-5.jpg'
import instaImg6 from '../../public/assets1/instagram-6.jpg'
import { Link } from 'react-router-dom'


const Footer = () => {
       const categories = [
            { name: 'Women', path: 'women'},
            { name: 'Men', path: 'men'},
            { name: 'Kids', path: 'kids'}
    
        ]
    return (
        <>
            <footer className='section__container footer__container'>
                <div className='footer__col'>
                    <h4>CUSOMER CARE</h4>
                    {/* <p>
                        <span><i className="ri-map-pin-2-fill"></i></span>
                        122,Gujarat,India
                    </p> */}
                    <p>
                        <span><i className="ri-mail-fill"></i></span>
                        TreandHaven@Support.com
                    </p>
                    <p>
                        <span><i className="ri-phone-fill"></i></span>
                        +91 90909 89890
                    </p>

                </div>

                <div className="footer__col">
                    <h4>COMPANY</h4>
                    <Link to="/">Home</Link>
                    <Link to="/aboutus">About Us</Link>
                    <Link to="/treams">Trems & Condition</Link>
                </div>

                <div className="footer__col">
                    <h4>USEFUL LINK</h4>
                    {/* <Link to="/">Help</Link> */}
                    {/* <a href="/">Track Your Order</a> */}
                    <Link to={`/categories/Men`}>Men</Link>
                    <Link to={`/categories/Women`}>Women</Link>
                </div>

                <div className="footer__col">
                    <h4>INSTAGRAM</h4>
                    <div className='instagram__grid'>
                        <img src={instaImg1} alt="" />
                        <img src={instaImg2} alt="" />
                        <img src={instaImg3} alt="" />
                        <img src={instaImg4} alt="" />
                        <img src={instaImg5} alt="" />
                        <img src={instaImg6} alt="" />

                    </div>

                </div>
            </footer>

            <div className='footer__bar'>
                Copyright © 2025 by TreandHaven . All right reserved.

            </div>

        </>
    )
}

export default Footer