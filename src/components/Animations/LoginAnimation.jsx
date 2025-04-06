import React from 'react'
import '@dotlottie/player-component';


const LoginAnimation = ({ src, height = '700px', width = '700px', loop = true, autoplay = true }) => {
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-80'>
            <dotlottie-player
                 src={src}
                 background=""
                 speed="2"
                 style={{ width, height }}
                 loop={loop}
                 autoplay={autoplay}
            ></dotlottie-player>
        </div>
    )
}

export default LoginAnimation