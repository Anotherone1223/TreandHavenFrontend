import React from 'react'
import { Link } from 'react-router-dom'
import bannerImg from '../../../public/assets1/header.png'

const Banner = () => {
    return (
        <div className='section__container header__container'>
            <div className='header__content'>
                <h4>UP TO 20% Discount on</h4>
                <h1> Fashion at Your Fingertips</h1>
                <p>your ultimate destination for trendy and affordable fashion. Discover a seamless shopping experience with a wide range of styles, perfect for every occasion. Step into the world of fashion and let ChicCart bring the latest trends straight to your fingertips!</p>
                <button className='btn'><Link to='/shop'>EXPLORE NOW</Link></button>
            </div>
            <div className='header__image'>
                <img src={bannerImg} alt="bannerImg" />
            </div>

        </div>
    )
}

export default Banner