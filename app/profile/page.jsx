'use client'
import { useState, useEffect } from 'react'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
//in the frontend if we want to use anything regarding the session then we can use the useSession hook
import { useSession } from 'next-auth/react'
import profileDefault from '@/assets/images/profile.png'
import {RotatingTriangles} from 'react-loader-spinner'
//based on the loading state we need to show the loader
import { toast } from 'react-toastify'
const ProfilePage = () => {
  //getting the data from the session since we have wrapped the entire thing with the session provider thays why we are able to use it anywhere in the app directory 
  const {data:session} = useSession()
  //take the google profile image of the individual
  const profileImage = session?.user?.image
  //take the google profile name of the individual
  const profileName = session?.user?.name
  //take the email of the individual
  const profileEmail = session?.user?.email


  //we want to show the user the properties that he has added so basically for that we are making a component level state
  const [properties, setProperties] = useState([])
  //loading state hona chahiye but just like the RTK query jahaan hume query karte time hi loading karke ek state mil jata tha yahan waisa nahi hai things are a little bit different here and we need to maintain a different state altogether
  const [loading, setLoading] = useState(true)

  //hum chahte hai ki jaise hi page load ho jaye data fetching start ho jaye
  useEffect(()=>{
    //fetching user properties
    const fetchUserProperties = async(userId) => {
      //if no user id then return 
      if(!userId){
        return 
      }
      //now try to fetch the data from the api
      try {
        const response = await fetch(`/api/properties/user/${userId}`)

        //if everything is okay then lets go
        if (response.status === 200) {
          const data = await response.json();
          setProperties(data);
        }

      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }

    }

    // Fetch user properties when session is available
    if (session?.user?.id) {
      fetchUserProperties(session.user.id);
    }
  },[session])


  //delete handler
  const handleDeleteProperty  = async(propertyId) => {
    //call the backend route in order to delete the added property so first hum ekbar window se confirm karwa lete hai i mean lets give the user a message that whether he really wants to delete the property or not
    const confirmed = window.confirm(
      'Are you sure you want to delete this property'
    )

    if (!confirmed) return;

    //otherwise call the api route and delete the property 
    const res = await fetch(`/api/properties/${propertyId}`, {
      method: 'DELETE',
    });


    //so here we need to updte the state so that the user can no longer see the deleted property
    const updatedProperties = properties.filter((property)=>(
      property._id !== propertyId
    ))


    //update the state
    setProperties(updatedProperties)

    //give a success message
    toast.success('Property Deleted');
  }
  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Profile</h1>
          <div className='flex flex-col md:flex-row'>
            <div className='md:w-1/4 mx-20 mt-10'>
              <div className='mb-4'>
                <Image
                  className='h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0'
                  src={profileImage || profileDefault}
                  width={200}
                  height={200}
                  alt='User'
                />
              </div>
              <h2 className='text-2xl mb-4'>
                <span className='font-bold block'>Name: </span> {profileName}
              </h2>
              <h2 className='text-2xl'>
                <span className='font-bold block'>Email: </span> {profileEmail}
              </h2>
            </div>

            <div className='md:w-3/4 md:pl-4'>
              <h2 className='text-xl font-semibold mb-4'>Your Listings</h2>
              {!loading && properties.length === 0 && (
                <p>You have no property listings</p>
              )}
              {loading ? (
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
                properties.map((property) => (
                  <div key={property._id} className='mb-10'>
                    <Link href={`/properties/${property._id}`}>
                      <Image
                        className='h-32 w-full rounded-md object-cover'
                        src={property.images[0]}
                        alt=''
                        width={500}
                        height={100}
                        priority={true}
                      />
                    </Link>
                    <div className='mt-2'>
                      <p className='text-lg font-semibold'>{property.name}</p>
                      <p className='text-gray-600'>
                        Address: {property.location.street}{' '}
                        {property.location.city} {property.location.state}
                      </p>
                    </div>
                    <div className='mt-2'>
                      <Link
                        href={`/properties/${property._id}/edit`}
                        className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProperty(property._id)}
                        className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
                        type='button'
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage