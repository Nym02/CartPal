import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../redux/actions/generalAction';
import { Link } from 'react-router-dom';

const Index = () => {
    const store = useSelector(state => state);
    const {general} = store;
    const dispatch = useDispatch();
    return (
        <div className='relative'>
            <nav className="bg-white fixed z-50 w-full mb-4 top-0 border-b-2">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between">

                        <div className="flex space-x-4">
                            {/* <!-- logo -->  */}
                            <div>

                            </div>

                            {/* <!-- primary nav --> */}
                            <div className="hidden md:flex items-center space-x-1">
                                <Link to="/" className="py-5 px-3 text-gray-700 hover:text-gray-900">Home</Link>
                                <Link to="/cart" className="py-5 px-3 text-gray-700 hover:text-gray-900">Cart</Link>
                            </div>
                        </div>

                        {/* <!-- secondary nav --> */}
                        <div className="hidden md:flex items-center space-x-1">
                            <div className='cursor-pointer' onClick={()=> dispatch(toggleSidebar({isSidebarOpen: true, sidebarContent: 'wishlist'}))}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                            </div>
                            <div className='cursor-pointer' onClick={()=> dispatch(toggleSidebar({isSidebarOpen: true, sidebarContent: 'cart'}))}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>

                            </div>
                        </div>

                        {/* <!-- mobile button goes here --> */}
                        <div className="md:hidden flex items-center">
                            <button className="mobile-menu-button">
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>

                    </div>
                </div>

                {/* <!-- mobile menu --> */}
                <div className="mobile-menu hidden md:hidden">
                    <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Features</a>
                    <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Pricing</a>
                </div>
            </nav>

        </div>
    )
}

export default Index