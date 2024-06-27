"use client"

import Image from "next/image"
import logo from '@/assets/images/logo-white.png'
import { FaGoogle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState , useEffect } from "react";
import Link from "next/link";
import profileImage from '@/assets/images/profile.png'
import { GiRingingBell } from "react-icons/gi";
import { signIn , signOut , useSession , getProviders } from "next-auth/react";
import { properties } from "@/properties";

const Navbar = () => {
    //session data
    const {data:session , status} = useSession()
    const profileImageFromGoogle = session?.user?.image

    const [mobileModal , showMobileModal] = useState(false)
    const [profileModal , setProfileModal] = useState(false)
    const [providers , setProviders] = useState(true)
    const [bg , setBg] = useState('Home')
    const [notifications , setNotifications] = useState(true)

    //handle Modal
    const handleModal = () => {
        showMobileModal((prev)=>!prev)
    }

    //handle profile modal
    const handleProfileModal = () => {
        setProfileModal((prev)=>!prev)
    }

    //the task of useEffects is going to be like set the providers wala thing and basically the reason why we want to set the providers is basically we can render the buttons based on the providers right
    useEffect(()=>{
        const setAuthProviders = async() => {
            const res = await getProviders()
            setProviders(res)
        }

        setAuthProviders()
        
    },[])
  return (
    <>
        <div className="bg-blue-700 w-full p-3 flex gap-11 items-center justify-between pl-11 pr-11">
            {/* hamburger icon  */}
            <RxHamburgerMenu className="text-white block text-2xl md:hidden " onClick={handleModal}/>
            {/* 1st part  */}
            <div className="flex gap-5 items-center">
                {/* logo and the name of the app  */}
                <Link href='/'><Image src={logo} alt="logo" width={40} height={40} /></Link>
                <Link href='/'><div className="text-white font-bold text-2xl hidden md:block">
                    PropertyView
                </div>
                </Link>
            {/* buttons  */}
            <div className="md:flex md:gap-1 hidden">
                <Link href='/'><button className={`${bg == 'Home' ? 'bg-gray-800' : null} text-sm text-white hover:bg-blue-900 duration-300 ease-in-out rounded-lg px-4 py-2`} onClick={()=>setBg('Home')}>Home</button></Link>
                <Link href='/properties'><button className={`${bg == 'Properties' ? 'bg-gray-800' : null} text-sm text-white hover:bg-blue-900 duration-300 ease-in-out rounded-lg px-4 py-2`} onClick={()=>setBg('Properties')}>Properties</button></Link>
                {/* conditionalt render whether logged in or not  */}
                {
                    session ? (
                        <Link href='/properties/add'><button className={`${bg == 'AddProperties' ? 'bg-gray-800' : null} text-sm text-white hover:bg-blue-900 duration-300 ease-in-out rounded-lg px-4 py-2`} onClick={()=>setBg('AddProperties')}> Add Properties</button></Link>
                    ) : null
                }
                
            </div>
            </div>
            {/* 2rd part  */}
            {/* button  */}
            <div className="flex gap-5 items-center">
            {
                !session && providers && Object.values(providers).map((provider , index)=>(
                    <button onClick={()=>(signIn(provider.id))} key={index} className="bg-gray-800 hover:opacity-55 hidden duration-300 ease-in-out md:flex items-center gap-3 text-white text-sm px-4 py-2 rounded-lg"><span className="inline-block"><FaGoogle /></span>Login or Register</button>
                ))
            }
            


            {/* conditionally render if the user is logged in  */}
            {
             session ? (
                 <div className="flex gap-5 items-center">
                     {/* notifications icon  */}
                     <GiRingingBell className="text-white text-3xl hidden md:block relative"/>
                     {
                        notifications ? (
                            <div className="hidden absolute bg-red-600 text-white text-base rounded-full p-3 w-[10px] h-[10px] top-[7px] right-[93px] items-center justify-center md:flex">
                                <span>2</span>
                            </div>
                        ) : null
                     }
                     {/* render this when there is no image in the google account of the person  */}
                     <Image src={profileImageFromGoogle || profileImage} alt="profile image" width={35} height={35} className="relative" onClick={handleProfileModal}/>
                     {
                        profileModal ? (
                            <div className="flex flex-col z-50 gap-3 top-[67px] right-[10px] shadow-2xl absolute px-4 py-2 rounded-lg bg-white text-black text-base h-auto w-[145px] justify-center items-center">
                                <span className="hover:cursor-pointer hover:text-blue-500">Your Profile</span>
                                <span className="hover:cursor-pointer hover:text-blue-500">Saved</span>
                                <span className="hover:cursor-pointer hover:text-blue-500" onClick={()=>{
                                    signOut()
                                }}>Logout</span>
                            </div>
                        ) : null
                     }
                 </div>
             ) : null
            }
            </div>
        </div>

        {/* conditional rendering */}
        {
            mobileModal ? (
                <div className="bg-blue-700 text-white flex flex-col gap-3 pt-5 pb-5 pl-11">
                    <Link href='/'><span className="text-white text-lg">Home</span></Link>
                    <Link href='/properties'><span className="text-white text-lg">Properties</span></Link>
                    {
                        !session && providers && Object.values(providers).map((provider , index)=>(
                            <button onClick={()=>(signIn(provider.id))} className="bg-gray-900 py-1 px-2 rounded-lg text-white text-lg w-[200px]" key={index}>Login or Register</button>
                        ))
                    }
                    {
                        session ? (
                            <Image src={profileImageFromGoogle || profileImage} alt="profile image" width={35} height={35} className="relative" onClick={handleProfileModal}/>
                        ) : null
                    }
                </div>
            ) : (null)
        }
    </>
  )
}

export default Navbar