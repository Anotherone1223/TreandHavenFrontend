import React from 'react'
import { Link } from 'react-router-dom'
// import { p_img1 } from '../../assets/assets'
import {p_img1,p_img2_1,p_img3} from "../../assets/assets"


const Categories = () => {

    const categories = [
        { name: 'Women', path: 'women',image:p_img1},
        { name: 'Men', path: 'men',image:p_img2_1},
        { name: 'Kids', path: 'kids',image:p_img3}

    ]
    return (
        <>
            <div className='product__grid'>
                {
                    categories.map((category) => (
                        <Link  key={category.name} to={`/categories/${category.path}`} className='categories__card'>
                            <img src={category.image} alt="Categoryname" />
                            <h4>{category.name}</h4>
                        </Link>

                    ))
                }


            </div>
        </>
    )
}

export default Categories