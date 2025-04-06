import React, { useEffect, useState } from 'react'
import dealsImg from '../../../public/assets1/dealsImg.png'

const DealsSection = () => {
    // Set the target end date for the countdown
    const targetDate = new Date("2025-05-01T00:00:00").getTime(); // Adjust as needed

    const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000),
            };
        } else {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // When time is up
        }
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className='section__container deals__container dark:'>
            <div className='deals__image'>
                <img src={dealsImg} alt="Deals" />
            </div>

            <div className='deals__content'>
                <h5>Get Up To 20% Discount</h5>
                <h4>Deals Of The Month</h4>
                <p>"Discover the Deals of the Month at TreanHaven! 🛍️ Enjoy massive discounts on the latest fashion trends for men, women, and kids. From casual wear to party outfits, find everything you need to elevate your style without breaking the bank. Hurry, these limited-time offers won’t last forever—shop now and save big!"</p>

                <div className='deals__countdown flex-wrap'>
                    <div className="deals__countdown__card">
                        <h4>{timeLeft.days}</h4>
                        <p>Days</p>
                    </div>
                    <div className="deals__countdown__card">
                        <h4>{timeLeft.hours}</h4>
                        <p>Hours</p>
                    </div>
                    <div className="deals__countdown__card">
                        <h4>{timeLeft.minutes}</h4>
                        <p>Min</p>
                    </div>
                    <div className="deals__countdown__card">
                        <h4>{timeLeft.seconds}</h4>
                        <p>Secs</p>
                    </div>
                </div>
            </div>
        </section>
    );
}


export default DealsSection