//connect db method
import connectDB from "@/config/db";
import User from "@/models/user.models";
//bring the custom method to see the user info
import { getSessionUser } from "@/utils/getSessionUser";
import { getSession } from "next-auth/react";

//see agar humare page ka data kaafi frequently and dynamically change hota hai then we need to take care of that and that can be very easily done using the below one line of code
export const dynamic = 'force-dynamic';

export const POST = async (request) => {
  try {
    await connectDB();

    const { propertyId } = await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    // Find user in database
    const user = await User.findOne({ _id: userId });

    // Check if property is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);

    return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};