//connect db method
import connectDB from "@/config/db";
import User from "@/models/user.models";
//bring the custom method to see the user info
import { getSessionUser } from "@/utils/getSessionUser";
import { getSession } from "next-auth/react";

//see agar humare page ka data kaafi frequently and dynamically change hota hai then we need to take care of that and that can be very easily done using the below one line of code
export const dynamic = 'force-dynamic';

//method to check whether the property is boookmarked or not
export const POST = async(request) => {
    try {
        //connect to the database
        connectDB()

        //we will be sending the property id from the frontend and we need to extract that here
        const {propertyId} = await request.json()

        //getting the session details
        const sessionUser = getSessionUser()

        //check for the session 
        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required', { status: 401 });
          }
        
        //take out the user id from the session user
        const { userId } = sessionUser;

        //find the user in the database
        const user = await User.findOne({ _id: userId });

        // Check if property is bookmarked
        let isBookmarked = user.bookmarks.includes(propertyId);

        return new Response(JSON.stringify({ isBookmarked }), {
            status: 200,
          });
    } catch (error) {
        console.log('Error:', error)
        return new Response('Something went wrong', {status:500})
    }

}