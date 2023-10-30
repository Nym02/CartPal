import React from 'react'
import Cart from './../Cart';
import Sidebar from './../Sidebar';
import Navbar from './../Navbar';

const Index = ({ children }) => {
  return (
    <>
      <div>
        <div>
          <Navbar></Navbar>
        </div>
        <Sidebar>
          <Cart></Cart>
        </Sidebar>
      </div>
      { children }
    </>
  )
}

export default Index