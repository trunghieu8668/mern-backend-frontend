import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import Layout from './Layout'
import { getCart } from './cartHelpers'
import Card from './Card'
import Checkout from './Checkout'
const Cart = () => {
  const [items, setItems] = useState([])
  const [run, setRun] = useState(false)
  useEffect(()=> {
    setItems(getCart())
  }, [run])
  const showItems = items => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr/>
        <div className="row">
          {
            items.map((product, i)=> {
              return(
                <div key={i} className="col-12 col-md-12">
                  <Card product={product} viewLayout="list" showViewProductButton={false} showAddToCartButton={false} cartUpdate={true} showRemoveProductButton={true} setRun={setRun} run={run}/>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
  const noItemsMessage = () => (
    <h2>Your cart is empty. <br/> <Link className="mt-2 btn btn-info active btn-lg" to="/shop">Continue shopping</Link></h2>
  )
  return (
      <Layout title="Cart page" description="Display product cart" className="container">
          <h2 className="mb-4">Cart</h2>
          <div className="row">
            <div className="col-12 col-md-8">
              {items.length > 0 ? showItems(items) : noItemsMessage()}
            </div>
            <div className="col-12 col-md-4">
              <Checkout products={items} setRun={setRun} run={run} />
            </div>
          </div>
      </Layout>
  )
}

export default Cart
