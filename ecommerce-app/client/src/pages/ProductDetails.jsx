import { useState, useEffect } from 'react';
import Navtop from './../components/Navtop';
import MainNav from '../components/MainNav';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {

  const params = useParams()
  const [product, setProduct] = useState({})

  // Initial Product Details
  useEffect(() => {
    if (params?.slug) getProduct()
  }, [params?.slug]);

  // Get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/get-product/${params.slug}`)
      setProduct(data?.product)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Navtop />
      <MainNav />
      <div>
        <h1>Product details</h1>
        
        <div>
          <h1>Similar products</h1>
        </div>
      </div>
    </>
  )
}

export default ProductDetails