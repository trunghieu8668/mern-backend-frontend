import React from 'react'
import {Link} from 'react-router-dom'
import {API} from '../config'

const showImage = ({item, url, className}) => {
    return (
        <div className="product-img">
            <Link className="clearfix" to={ `/product/${item._id}` } title={ item.name }>
              <img className={ className ? className : "card-img-top img-fluid mb-3" } src={ `${API}/${url}/photo/${item._id}` } alt={ item.name }/>
            </Link>
        </div>
    );
};

export default showImage;
