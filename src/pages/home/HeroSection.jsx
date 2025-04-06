import React from 'react'
import card1 from '../../../public/assets1/card-1.png'
import card2 from '../../../public/assets1/card-2.png'
import card3 from '../../../public/assets1/card-3.png'


const cards = [
    {
        id: 1,
        image: card1,
        trend:'2024 Trend',
        title: 'Women Shirt'
    },
    {
        id: 2,
        image: card2,
        trend:'2024 Trend',
        title: 'Women Dresses'
    },
    {
        id: 3,
        image: card3,
        trend:'2024 Trend',
        title: 'Women casuals'
    },
]

const HeroSection = () => {
    return (
        <section className='section__container hero__container '>
            {
                cards.map((card)=>(
                    <div className='hero__card ' key={card.id}>
                        <img src={card.image} alt="" />
                        <div className='hero__content'>
                            <p>{card.trend}</p>
                            <h4 className='dark:text-black'>{card.title}</h4>
                            {/* <a href="#">Discover More</a> */}
                        </div>

                    </div>
                ))
            }
        </section>
    )
}

export default HeroSection