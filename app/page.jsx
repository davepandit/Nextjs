// this is page that is getting served on the / route that is the home route 
import React from 'react'
import InfoBoxes from '@/components/InfoBoxes';
import HomeProperties from '@/components/HomeProperties';

const HomePage = () => {
  return (
    <>
      <div className='border border-t-1 border-blue-500'> </div>
      <div className='bg-blue-700 flex flex-col gap-3 justify-center items-center pt-28 pb-20 pl-5 pr-5'>
          <span className='text-center text-4xl md:text-7xl md:whitespace-nowrap font-bold text-white'>
            Find The Perfect Rental
          </span>
          <span className='text-center text-lg font-normal md:text-lg md:whitespace-nowrap text-white '>Discover the perfect property that suits your needs.</span>
          {/* input boxes  */}
          <div className='flex md:flex-row flex-col gap-3 mt-3'>
            <input type="text" className='border-none outline-none rounded-lg text-black w-[300px] h-[55px] py-2 px-4' placeholder='Enter keywords and location'/>
            <select className='border-none outline-none rounded-lg text-black w-[300px] h-[55px] py-2 px-4'>
              <option value="">--Please choose an option--</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
              <option value="option3">Option 3</option>
              <option value="option3">Option 3</option>
              <option value="option3">Option 3</option>
              <option value="option3">Option 3</option>
              <option value="option3">Option 3</option>
            </select>
            <button className='bg-blue-500 h-[55px] hover:opacity-55 duration-300 ease-in-out md:flex items-center gap-3 text-white text-sm px-4 py-2 rounded-lg'>Search</button>
          </div>
      </div>

      <InfoBoxes />
      <HomeProperties />
    </>
  )
}

export default HomePage