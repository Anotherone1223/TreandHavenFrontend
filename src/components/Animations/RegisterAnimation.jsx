import React from 'react'

const RegisterAnimation = ({ src, height = '300px', width = '300px', loop = true, autoplay = true }) => {
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-80'>
            <dotlottie-player
                src={src}
                background=""
                speed="1"
                style={{ width, height }}
                loop={loop}
                autoplay={autoplay}
            >
            </dotlottie-player>
        </div>
    )
}

export default RegisterAnimation