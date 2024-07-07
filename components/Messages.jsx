'use client'
import { useState, useEffect } from "react"
//import the spinner
import {RotatingTriangles} from 'react-loader-spinner'
import Message from "./Message"


const Messages = () => {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        //get the messages when the page gets loaded
        const getMessages = async() => {
            try {
                //make a request to the get route so that we can get all the messages
                const res = await fetch('/api/messages')

                if (res.status === 200) {
                    const data = await res.json();
                    setMessages(data);
                  }
            } catch (error) {
                console.log('Error fetching messages: ', error)
            }finally{
                setLoading(false)
            }
        }

        //call the function 
        getMessages()
    },[])


    return (
        <>
            {
                loading ? (
                    <div className='justify-center flex items-center h-screen'>
            <RotatingTriangles
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="rotating-triangles-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
        </div>
                ) : (
                    <section className='bg-blue-50'>
      <div className='container m-auto py-24 max-w-6xl'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>

          <div className='space-y-4'>
            {messages.length === 0 ? (
                <p>You have no messages</p>
                ) : (
                messages.map((message) => (
                    <Message key={message._id} message={message} />
                ))
                )}
          </div>
        </div>
      </div>
    </section>
                )
            }
        </>
    ) 
}

export default Messages