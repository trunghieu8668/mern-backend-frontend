import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { read, listRelated } from './apiCore'
import Card from './Card'

const Product = (props) => {
  // Step 1
  const [product, setProduct] = useState({})
  const [error,setError] = useState(false)
  const [relatedProduct, setRelatedProduct] = useState([])
  // Step 2
  const loadSingleProduct = (productId) => {
    read(productId).then(data => {
      if(data.error) {
        setError(data.error)
      }
      else {
        setProduct(data)
        // fetch related products
        listRelated(data._id).then(data => {
          if(data.error) {
            setError(data.error)
          }
          else {
            setRelatedProduct(data)
          }
        })
      }
    })
  }
  useEffect(()=> {
    const productId = props.match.params.productId
    loadSingleProduct(productId)
  }, [props])
  return (
      <Layout className="container">
          <Card product={product} isLayoutProductInfo="true" />
          <div className="clearfix"></div>

          {relatedProduct.length > 0 && (
            <div>
              <div className="AsideTitle h4 mb-4 mt-4">Related Products</div>
              <div className="row">
                {
                  relatedProduct.map((relatedproduct, i)=> {
                    return (<div key={i} className="col-6 col-md-4 mb-4">
                      <Card product={relatedproduct} />
                    </div>)
                  })
                }
              </div>
            </div>
          )}

      </Layout>
  )
}

export default Product
