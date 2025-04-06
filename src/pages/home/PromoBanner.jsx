import React from 'react'

const PromoBanner = () => {
    return (
        <section className='section__container banner__container'>
            <div className='banner__card'>
                <span><i className="ri-truck-line"></i></span>
                <h1>Free Delivery</h1>
                <p>Offers convenience and the ability to shop from anywhere, anytime.</p>
            </div>
            <div className='banner__card'>
                <span><i className="ri-money-dollar-circle-line"></i></span>
                <h1>100% Money Back Guaranty</h1>
                <p>Ecommerce have a review system where customer can shre feedback</p>
            </div>
            <div className='banner__card'>
                <span><i className="ri-user-voice-fill"></i></span>
                <h1>Storng Support</h1>
                <p>Offers customer support service to assit customer with queries and issues</p>
            </div>


        </section>
    )
}

export default PromoBanner