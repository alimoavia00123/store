import React from 'react'

const box = () => {
  return (
    <div className='flex justify-center mt-5 '>
    <div className='border-2 border-black rounded-2xl h-35 w-2/4 flex justify-center flex-wrap'>
    <h5 className='font-bold mt-4 text-3xl'>We offer home delivery or in-store pickup.</h5>
    
      <button className='mb-2 px-6 bg-[#f1d4d4]  font-bold hover:bg-white'>Reserve a table</button> 
    </div>
    </div>
  )
}

export default box

