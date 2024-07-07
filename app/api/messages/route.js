//connect db 
import connectDB from "@/config/db";
import Message from "@/models/message.models";
//get the session details
import { getSessionUser } from "@/utils/getSessionUser";
import { getSession } from "next-auth/react";

export const dynamic = 'force-dynamic'
//if the content of the page changes very frequently and dynamically then we should use this 

//post route to send the message to a route
export const POST = async(request) => {
    try {
        //connect db 
        connectDB()

        //getting the data from the frontend
        const { name, email, phone, message, property, recipient } = await request.json();

        //getting the session details
        const sessionUser = getSessionUser()

        //if session not found then 
        if (!sessionUser || !sessionUser.user) {
            return new Response(
              JSON.stringify({ message: 'You must be logged in to send a message' }),
              { status: 401 }
            );
          }
        const { user } = sessionUser


        // Can not send message to self
        if (user.id === recipient) {
            return new Response(
            JSON.stringify({ message: 'Can not send a message to yourself' }),
            { status: 400 }
            );
        }

        const newMessage = new Message({
            sender: user.id,
            recipient,
            property,
            name,
            email,
            phone,
            body: message,
          });
      
          await newMessage.save();
      
          return new Response(JSON.stringify({ message: 'Message Sent' }), {
            status: 200,
          });
    } catch (error) {
        console.log(error);
        return new Response('Something went wrong', { status: 500 });
    }
}