import React from 'react'
import '@dotlottie/player-component';


const ShopPageAnimation = () => {
    return (
        <div>
            <dotlottie-player
                src="https://lottie.host/fbc4ea5e-a746-42f1-9dd5-bd0202871604/DLyUmJAz7r.lottie"
                background="transparent"
                speed="0.5"
                style={{ width: '900px', height: '700px' }}
                loop
                autoplay
            ></dotlottie-player>
        </div>
    )
}

export default ShopPageAnimation