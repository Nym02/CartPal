import React from 'react'
import { useSelector } from 'react-redux'
import WishList from '../WishList';
import Cart from './../Cart';

const  Index = ({children}) => {
  const store = useSelector(state => state);
  const {general} = store;

  return (
    <div className={`w-96 bg-white border-l-2 shadow-slate-300 h-screen transform transition-all fixed z-50 ${general.isSidebarOpen ? '-right-0' : '-right-full'} top-0 overflow-auto`}>
      {general?.sidebarContent === 'cart' && <Cart />}
      {general?.sidebarContent === 'wishlist' && <WishList />}
    </div>
  )
}

export default Index