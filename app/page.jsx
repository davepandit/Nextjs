// this is page that is getting served on the / route that is the home route 
import React from 'react'
import InfoBoxes from '@/components/InfoBoxes';
import HomeProperties from '@/components/HomeProperties';
import PropertySearchForm from '@/components/PropertySearchForm';

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
          <PropertySearchForm />
      </div>

      <InfoBoxes />
      <HomeProperties />
    </>
  )
}

export default HomePage