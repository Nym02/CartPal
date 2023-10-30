import React, { useEffect, useState } from 'react'
import Layouts from './../../Layouts'
import { useDispatch, useSelector } from 'react-redux'
import { decrementCartItem, incrementCartItem, removeCartItem, updateCartItems } from '../../redux/actions/cartAction';
import { Link } from 'react-router-dom';

const Index = () => {
    const store = useSelector(state => state);
    const { cart } = store;
    const [cartData, setCartData] = useState(cart?.cart || []);
    const [deliveryCharge, setDeliveryCharge] = useState(120);
    const dispatch = useDispatch();
    // console.log(store);

    const increaseProductQuantity = (item) => {
        console.log('clicked')
        item = { ...item, quantity: item.quantity + 1 };
        dispatch(incrementCartItem(item));
      }
    
      const decreaseProductQuantity = (item) => {
        let qty = item.quantity - 1;
        if (qty > 0) {
          const updatedItem = { ...item, quantity: qty };
          dispatch(decrementCartItem(updatedItem));
        }
      }
      const removeFromCart = (item) => {
        dispatch(removeCartItem(item));
      }
      const updateCartItem = (e, item) => {
        let newCartData = cartData.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: Number(e.target.value)
            }
          }
          return cartItem;
        })
        setCartData(newCartData);
        dispatch(updateCartItems(newCartData));
      }

    useEffect(() => {
        setCartData(cart?.cart);
    }, [cart?.cart])


    return (
        <>
            <Layouts>
                <div class="bg-gray-100">
                    <div class="container mx-auto mt-10">
                        <div class="flex justify-start shadow-md">
                            <div class="w-3/4 bg-white px-10 py-10">
                                <div class="flex justify-between border-b pb-8">
                                    <h1 class="font-semibold text-2xl">Shopping Cart</h1>
                                    <h2 class="font-semibold text-2xl">{cartData.reduce((total, item) => total + (item?.quantity), 0)} Items</h2>
                                </div>
                                <div class="flex mt-10 mb-5">
                                    <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                                    <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
                                    <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
                                    <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
                                </div>

                                

                                {
                                    cartData.length > 0 ? cartData?.map((item, idx) => {
                                        return (
                                            <div key={idx} class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                                                <div class="flex w-2/5">
                                                    <div class="w-20">
                                                        <img class="h-24" src={item?.images.length > 0 ? item?.images[0] : 'image not found.'} alt="" />
                                                    </div>
                                                    <div class="flex flex-col justify-between ml-4 flex-grow">
                                                        <div>
                                                        <p class="font-bold text-sm">{item?.title}</p>
                                                        <p class="text-red-500 text-xs">{item?.category?.name}</p>
                                                        </div>
                                                        <button onClick={()=> removeFromCart(item)} href="#" class=" text-left font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</button>
                                                    </div>
                                                </div>
                                                <div class="flex justify-center w-1/5">
                                                    <svg onClick={()=> decreaseProductQuantity(item)} class="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                                    </svg>

                                                    <input onChange={(e) => updateCartItem(e, item)} class="mx-2 border text-center w-8" type="text" value={item?.quantity} />

                                                    <svg onClick={()=> increaseProductQuantity(item)} class="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                                                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                                    </svg>
                                                </div>
                                                <span class="text-center w-1/5 font-semibold text-sm">৳ {item?.price}</span>
                                                <span class="text-center w-1/5 font-semibold text-sm">৳ {item?.price * item?.quantity}</span>
                                            </div>
                                        )
                                    }) : <>Your Cart is empty.</>
                                }




                                <Link to="/" class="flex font-semibold text-indigo-600 text-sm mt-10">

                                    <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                                    Continue Shopping
                                </Link>
                            </div>

                            <div id="summary" class="w-1/5 px-8 py-10 fixed right-16 bg-white">
                                <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                               <div className='flex flex-col'>
                               <div class="flex justify-between border-b-[1px] py-2">
                                    <span class="font-semibold text-base uppercase">Total Items:  </span>
                                    <span class="font-semibold text-base uppercase">{cartData.reduce((total, item) => total + (item?.quantity), 0)}</span>
                                    
                                </div>
                                <div class="flex justify-between border-b-[1px] py-2">
                                    <span class="font-semibold text-base uppercase">Total Cost:  </span>
                                    <span class="font-semibold text-base uppercase">৳ {cartData.reduce((total, item) => total + (item?.price * item?.quantity), 0)}</span>
                                    
                                </div>
                                <div class="flex justify-between border-b-[1px] py-2 last:border-b-0">
                                    <span class="font-semibold text-base uppercase">Delivery Charge:  </span>
                                    <span class="font-semibold text-base uppercase">৳ {deliveryCharge}</span>
                                    
                                </div>
                               </div>
    
                             
                                <div class="border-t mt-8">
                                    <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                                        <span>Total cost</span>
                                        <span>৳ {deliveryCharge + cartData.reduce((total, item) => total + (item?.price * item?.quantity), 0)}</span>
                                    </div>
                                    <button class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Layouts >
        </>
    )
}

export default Index