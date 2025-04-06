import React from 'react'

function ReviewAnimation() {
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-80'>
            <dotlottie-player
                src="https://lottie.host/e3717056-45c3-43aa-8efd-96aee4ed7f7d/zuON7PbF43.lottie"
                background="transparent"
                speed="1"
                style={{ width: '500px', height: '600px' }}
                loop
                autoplay
            ></dotlottie-player>
        </div>
    )
}

export default ReviewAnimation