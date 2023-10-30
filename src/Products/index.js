/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setProducts } from '../redux/actions/productsActions';
import axios from 'axios';
import { setCartProducts, setWishListProduct } from '../redux/actions/cartAction';
import Layouts from './../Layouts';
import { Hourglass } from 'react-loader-spinner';

const Index = () => {
  const [date, setData] = useState();
  const [loading, setLoading] = useState(false);
  const store = useSelector(state => state);
  const {allProducts, cart} = store;
  console.log(store)

  const prod = allProducts?.products;
  const dispatch = useDispatch();

  const getProducts = async() => {
    setLoading(true);
    const response = await axios.get('https://api.escuelajs.co/api/v1/products').catch((err) => console.log(err))
    if(response?.status === 200){
      setLoading(false);
      dispatch(setProducts(response?.data));
    }
    // console.log(response)
  }

  const addToCart = (e, item) => {
    dispatch(setCartProducts(item));
  }

  const addToWishList = (item) => {
    let {wishList} = cart;

    let inWishList = wishList.find((item2) => item2.id == item?.id)
    setData(inWishList);

    dispatch(setWishListProduct(item));
  }


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
      
    getProducts();
  }, [])


  return (
    <>

     <Layouts>
       

      {/* <!-- ✅ Grid Section - Starts Here 👇 --> */}
      <section className="w-fit pt-14 mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
          {
            loading && <div className='absolute bg-white w-full h-full  flex justify-center items-center'><Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={['#306cce', '#72a1ed']}
          /></div>
          }

      
     {
      prod.map((item, idx) => {
        const inWishList = cart?.wishList.find((item2) => item2?.id == item?.id)
        const inCart = cart?.cart.find(cartItem => cartItem?.id === item?.id)
       return <div key={idx} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        
          <img src={item?.images[0]} alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
          <div className="px-4 py-3 w-72">
            <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
            <p className="text-lg font-bold text-black truncate block capitalize">{item?.title}</p>
            <div className="w-full flex justify-between items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">৳ {item?.price}</p>
              <div className=''>
            <div className='inline-block mr-2 -mb-1 cursor-pointer' onClick={() => addToWishList(item)}><svg xmlns="http://www.w3.org/2000/svg" fill={ inWishList ? 'red' : 'none'}  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            </div>
              <div onClick={(e) => addToCart(e, item)} className="ml-auto inline-block cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" stroke={inCart ? 'green' : ''} fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg></div>
              </div>
            </div>
          </div>
      </div>
        
      })
     }

       


      </section>

      {/* <!-- 🛑 Grid Section - Ends Here --> */}

     </Layouts>
    </>
  )
}

export default Index