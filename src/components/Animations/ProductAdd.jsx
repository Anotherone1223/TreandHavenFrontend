import React from 'react'
import '@dotlottie/player-component';


const ProductAdd = () => {
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-80'>
            <dotlottie-player
                src="https://lottie.host/e80852b7-7594-46e1-8e53-36dbbe60ea84/E0bhI7SPYc.lottie"
                background="transparent"
                speed="1"
                style={{ width: '700px', height: '700px' }}
                loop
                autoplay
            ></dotlottie-player>
        </div>
    )
}

export default ProductAdd