import React,{useEffect,useState} from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import {getProducts} from '../store/actions/productActions.js'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'



const HomeScreen = () => {
  const {products,loading,error} = useSelector(state => state.prod)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getProducts())

  },[dispatch])




  return (

    <>
      <>
        <h1>Latest Products</h1>

    {loading ? (<Loader />) : error ? (<div><h2>Error HAppended</h2></div>) : (
        <Row>
            {products.length > 0 && products.map((product) => (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                    <Product product={product} />
                </Col>
            ))}
        </Row>
    )}
    </>
    </>
  )
}

export default HomeScreen