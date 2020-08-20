import React, { useState, useEffect } from 'react'
import Layout from './Layout'
//Step 1
import { getProducts } from './apiCore'
// Step 7
import Card from './Card'
// Step 9
import Search from './Search'
const Home = () => {
    // Step 3
    const [productBySell, setproductBySell] = useState([])
    const [productByArrival, setProductByArrival] = useState([])
    const [error, setError] = useState(false)
    // STEP 4
    const loadProductBySell = () => {
        getProducts(`sold`)
        .then(data => {
            if(data.error) {
                setError(data.error)
            }
            else {
                setproductBySell(data)
            }
        })
    }
    //Step 5
    const loadProductByArrival = () => {
        getProducts(`createAt`)
        .then(data => {
            if(data.error) {
                setError(data.error)
            }
            else {
                setProductByArrival(data)
            }
        })
    }
    // Step 6
    useEffect(()=>{
        loadProductByArrival()
        loadProductBySell()
    }, [])
    // Step 2
    return (
        <Layout title="Home page" description="Display product latest and sold" className="container">
            <Search />
            {/* // Step 8 */}
            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                {productBySell.map((product, i)=>(
                    <div key={i} className="col-2 col-sm-2 col-md-4 mb-5">
                        <Card key={i} product={product}/>
                    </div>
                ))}
            </div>
            
            <h2 className="mb-4">New Arrival</h2>
            <div className="row">
                {productByArrival.map((product, i)=>{
                    return (
                        <div key={i} className="col-2 col-sm-2 col-md-4 mb-5">
                            <Card product={product}/>
                        </div>
                    )
                })}
            </div>
        </Layout>
    )
}
export default Home;