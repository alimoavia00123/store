import React from 'react'
import Logout from './Logout'

const Navbar = () => {
  return (
    <>
    <div className='bg-[#a30606] h-22  sticky top-0 z-50  shadow-md mt-0 p-0 flex justify-between items-center'>
      <img src="cheesy-crust.png" alt="" className='h-35  p-0'/>
      <div>
      <button className='p-2 bg-[#f1d4d4] mr-5 font-bold hover:bg-white '>Contact us</button>
      <button className='p-2 bg-[#f1d4d4] mr-10 font-bold hover:bg-white '> <Logout/></button>
      </div>
   </div>
    </>
  )
}

export default Navbar
