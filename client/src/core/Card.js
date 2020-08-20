import React, {useState, Fragment} from 'react';
import {Link, Redirect} from 'react-router-dom'
import ShowImage from './ShowImage'
import {addItem, updateItem, removeItem} from './cartHelpers'
import moment from 'moment'
import NumberFormat from 'react-number-format';
const Card = ({product, showViewProductButton = true, isLayoutProductInfo = false, showAddToCartButton = true, viewLayout = "grid", cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f, // default value of function
  run = undefined // default value of undefined
  }) => {
    const showViewButton = () => {
      return(
        showViewProductButton && (
            <Link to={`/product/${product._id}`} title={product.name}>
              <button className="card-link btn btn-outline-primary">
                View Product
              </button>
            </Link>
          )
        )
    }
    const showAddToCart = (showAddToCartButton) => {
      return showAddToCartButton && (
        <button onClick={addToCart} className="ml-auto card-link btn btn-outline-warning">
            Add to cart
        </button>
      )
    }
    // Cart
    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(product.count)
    const addToCart = () => {
      addItem(product, ()=> {
        setRedirect(true)
      })
    }
    const shouldRedirect = redirect => {
      if(redirect) {
        return <Redirect to="/cart"/>
      }
    }
    const showCartUpdateOptions = cartUpdate => {
      return cartUpdate && (
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text mr-3">Adjust Quantity</span>
          </div>
          <input type="number" className="form-control" value={count} onChange={handleChange(product._id)}></input>
        </div>
      )
    }
    const handleChange = productId => event => {
      setRun(!run);
      setCount(event.target.value < 1 ? 1 : event.target.value)
      if(event.target.value >= 1) {
        // importy {updateItem} from './cartHelpers'
        updateItem(productId, event.target.value)
      }
    }
    const showRemoveButton = (showRemoveProductButton) => {
      return showRemoveProductButton && (
        <button onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }} className="ml-auto card-link btn btn-outline-danger">
            Remove
        </button>
      )
    }
    // End Cart
    const layoutProductInfo = () => {
      if(!isLayoutProductInfo) {
        // List
        if( viewLayout !== "grid") {
          return (
              <div className="row">
                <div className="col-3">
                  <ShowImage item={product} url="product"/>
                </div>
                <div className="col-9">
                  <h2 className="h5 font-weight-bold">{product.name}</h2>
                  <p className="card-text text-muted small mb-1">Category: { product.category && product.category.name }</p>
                  <p className="card-title text-muted small">Add on {moment(product.createdAt).fromNow()}</p>
                  <p className="card-title font-weight-bold text-danger price"><NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={''} suffix={' đ'}/></p>
                  <p className="card-text description">{product.description.substring(0,100)}</p>
                  {shouldRedirect(redirect)}
                  <div className="d-flex">
                    { showViewButton(showViewProductButton) }
                    { showAddToCart(showAddToCartButton) }
                    { showCartUpdateOptions(cartUpdate) }
                    { showRemoveButton(showRemoveProductButton) }
                  </div>
                </div>
                <div className="border-bottom mb-3 pb-3 clearfix col-12"></div>
            </div>
          )
        }
        else {
          // Grid
          return (
            <div className="card">
                <div className="card-header text-left bg-light font-weight-bold text-uppercase">{product.name}</div>
                <div className="card-body">
                    {shouldRedirect(redirect)}
                    <ShowImage item={product} url="product"/>
                    <p className="card-text description">{product.description.substring(0,100)}</p>
                    <p className="card-text text-muted small mb-1">Category: { product.category && product.category.name }</p>
                    <p className="card-title font-weight-bold text-danger price"><NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={''} suffix={' đ'}/></p>
                    <p className="card-title text-muted small">Add on {moment(product.createdAt).fromNow()}</p>
                    <div className="d-flex">
                        { showViewButton(showViewProductButton) }
                        { showAddToCart(showAddToCartButton) }
                    </div>

                </div>
            </div>
          )
        }
      }
      else {
        return (
          <div className="ProductInfo clearfix mt-4 mb-4">
              <div className="row">
                <div className="col-md-12">
                  <h1 className="ProductName h3 mb-4">{product.name}</h1>
                </div>
                <div className="col-md-6">
                  <figure className="figure-haft">
                    <ShowImage className="f-select" item={product} url="product"/>
                  </figure>
                </div>
                <div className="col-md-6">
                  <div className="ProductPrice font-weight-bold text-danger h3">
                    <label className="label text-muted">Price: </label> <NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={''} suffix={' đ'}/>
                  </div>

                  <div className="ProductOrder">
                    <label className="text-muted">Qty</label>
                    <div className="row">
                      <div className="col-3 col-md-3">
                        <select className="form-control text-center">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                      <div className="col-9 col-md-9">
                        <button className="ml-auto card-link btn btn-outline-warning">
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                  {product.description && (
                    <div className="clearfix ProductDescription">
                      <div className="AsideTitle mt-3 mb-1 font-weight-bold h6 text-uppercase">Description</div>
                      <div className="text">{product.description}</div>
                    </div>
                  )}
                </div>
              </div>
          </div>
        )
      }
    }
    return (
        <Fragment>
          {layoutProductInfo()}
        </Fragment>
    );
};

export default Card;
