import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addWishlistItemIntoCart, decrementCartItem, incrementCartItem, removeCartItem, removeWishlistItem, setCartProducts, updateCartItems } from '../../redux/actions/cartAction';
import { Link } from 'react-router-dom';
import { toggleSidebar } from '../../redux/actions/generalAction';

const Index = ({ isWishlist }) => {
  const store = useSelector(state => state);
  const dispatch = useDispatch();
  const { allProducts, cart, general } = store;
  const [cartData, setCartData] = useState(isWishlist ? cart?.wishList : cart?.cart);
  const [totalPrice, setTotalPrice] = useState(0);
  console.log(cart.cart)



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

  const toggleMainSidebar = () => {
    dispatch(toggleSidebar({ isSidebarOpen: !general.isSidebarOpen, isCart: !general.isCart }));
  }

  const removeFromCart = (item) => {
    dispatch(removeCartItem(item));
  }

  const addWishlistItemsToCart =(products) => {
    dispatch(addWishlistItemIntoCart(products))
  }

  const removeFromWishlist = (item) => {

    dispatch(removeWishlistItem(item));
  }

  useEffect(() => {
    if (isWishlist) {
      setCartData(cart?.wishList);
    } else {
      setCartData(cart?.cart)
    }
  }, [cart?.cart, cart?.wishList, isWishlist])

  return (
    <>

      <div className='h-screen w-full flex flex-col'>
        <div className=' flex-grow overflow-auto'>
          <div className='p-4 border-b-2 w-full flex justify-between items-center'><h1 className="text-3xl font-bold">{isWishlist ? 'Wishlist' : 'Cart'}</h1>
            <div className='cursor-pointer' onClick={() => toggleMainSidebar()}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            </div>
          </div>
          <div className='p-4'>
            {
              isWishlist ?
                cartData.length > 0 ? cartData.map((item) => {
                  return (
                    <div key={item?.id} className='mb-4 border-b-2 pb-4 last:border-b-0 first:pt-5'>
                      <div className='w-full h-full flex space-x-2'>
                        <div className="rounded-lg overflow-hidden">
                          <img className='' width={100} src={item?.images[0]} alt="" />
                        </div>
                        <div className='h-auto w-full flex flex-col justify-between'>
                          <div className='w-full flex justify-between'>
                            <div>
                              <h3 className='font-semibold text-sm'>{item?.title}</h3>
                              <p className='text-sm text-gray-500'>{item?.category?.name}</p>
                            </div>
                            <div>
                              <p className='text-sm text-gray-500'>৳ {item?.price * item?.quantity}</p>
                            </div>
                          </div>
                          <div>
                            <div className='h-full w-full flex justify-end items-end'>

                              <div onClick={() => removeFromWishlist(item)} className=''><svg className='w-4 h-4 stroke-red-700 cursor-pointer transform hover:scale-125 hover:stroke-slate-700 transition-all' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                              </svg>
                              </div>
                              <div>

                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                      <div>

                      </div>
                      <div>


                      </div>
                    </div>
                  )
                }) : (
                  <p className='font-semibold bg-yellow-200 border-t-4 border-red-500 text-red-950 rounded-md py-4 px-4'>Your wish list is empty</p>
                ) :
                cartData.length > 0 ? cartData.map((item) => {
                  return (
                    <div className='mb-4 border-b-2 pb-4 last:border-b-0 first:pt-5'>
                      <div className='w-full h-full flex space-x-2'>
                        <div className="rounded-lg overflow-hidden">
                          <img className='' width={100} src={item?.images[0]} alt="" />
                        </div>
                        <div className='h-auto w-full flex flex-col justify-between'>
                          <div className='w-full flex justify-between'>
                            <div>
                              <h3 className='font-semibold text-sm'>{item?.title}</h3>
                              <p className='text-sm text-gray-500'>{item?.category?.name}</p>
                            </div>
                            <div>
                              <p className='text-sm text-gray-500'>৳ {item?.price * item?.quantity}</p>
                            </div>
                          </div>
                          <div>
                            <div className='h-full w-full flex justify-between items-end'>
                              <div className='w-full flex items-center space-x-2'>
                                <div onClick={(e) => decreaseProductQuantity(item)} className='text-sm'>
                                  <svg className='w-4 h-4 cursor-pointer' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                  </svg>
                                </div>
                                <div><input onChange={(e) => updateCartItem(e, item)} className='w-10 border border-gray-300 rounded-md text-center focus:border-gray-400' type="nummber" value={item?.quantity} readOnly={item?.quantity == 1 ? true : false} /></div>
                                <div onClick={() => increaseProductQuantity(item)}>
                                  <svg className='w-4 h-4 cursor-pointer' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                  </svg>
                                </div>
                              </div>
                              <div onClick={() => removeFromCart(item)} className=''><svg className='w-4 h-4 stroke-red-700 cursor-pointer transform hover:scale-125 hover:stroke-slate-700 transition-all' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                              </svg>
                              </div>
                              <div>

                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                      <div>

                      </div>
                      <div>


                      </div>
                    </div>
                  )
                }) : (
                  <p>Your cart is empty</p>
                )
            }
          </div>
        </div>
        <div className='w-full  mt-auto'>
          {
            isWishlist ?
              <>
                <div class="mt-6 flex space-x-1 w-full p-4 border-t-2">
                  <button onClick={()=> addWishlistItemsToCart(cartData)} href="#" class="w-full flex items-center justify-center rounded-md border border-transparent bg-blue-800 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-900">Add All to Cart {cartData.length > 0 && <>({cartData.length})</>}</button>
                  <button onClick={()=> dispatch(toggleSidebar({isSidebarOpen: true, sidebarContent: 'cart'}))} href="#" class="w-full flex items-center justify-center rounded-md border border-transparent bg-lime-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-lime-700">Go to Cart</button>
                </div>
              </> : <div class="border-t  border-gray-200 px-4 py-6 sm:px-6  bg-white right-0">
                <div class="flex justify-between text-base font-medium text-gray-900">
                  <p>Total</p>
                  <p>৳ {cartData.reduce((total, item) => total + (item?.price * item?.quantity), 0)}</p>
                </div>
                <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div class="mt-6 flex space-x-1 w-full">
                  <Link href="#" class="w-full flex items-center justify-center rounded-md border border-transparent bg-blue-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-900">Go to Cart</Link>
                  <Link href="#" class="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</Link>
                </div>
                <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or
                    <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500">
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
          }
        </div>
      </div>
    </>
  )
}

export default Index;