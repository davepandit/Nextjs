'use client'

import { useState, useEffect } from 'react'
import PropertyCard from '@/components/PropertyCard'
import { RotatingTriangles } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import React from 'react'
//here we simply need to call that route that we just made


const SavedProperties = () => {
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)

    //data fetch from the api route
    useEffect(()=>{
        //fetch saved properties
        const fetchSavedProperties = async() => {
            try {
                const res = await fetch('/api/bookmarks');
                if (res.status === 200) {
                    const data = await res.json();
                    setProperties(data);
                  } else {
                    console.log(res.statusText);
                    toast.error('Failed to fetch saved properties');
                  }
            } catch (error) {
                console.log(error);
                toast.error('Failed to fetch saved properties');
            }finally{
                setLoading(false)
            }
        }

        fetchSavedProperties();
    },[])
  return (
    <>
        {
            loading ? (
                // render the spinner 
                <RotatingTriangles
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="rotating-triangles-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
            ) : (
                <section className='px-4 py-6'>
                    <div className='container-xl lg:container m-auto px-4 py-6'>
                        <h1 className='text-2xl mb-4'>Saved Properties</h1>
                        {properties.length === 0 ? (
                        <p>No saved properties</p>
                        ) : (
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            {properties.map((property) => (
                            <PropertyCard key={property._id} property={property} />
                            ))}
                        </div>
                        )}
                    </div>
                </section>
            )
        }
    </>
  )
}

export default SavedProperties