import connectDB from "@/config/db";
import User from "@/models/user.models";
import Property from "@/models/property.models";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';
//When it's needed:

// When your page content needs to be fresh on every request.
// When you're using dynamic data that changes frequently.
// If you're using cookies, headers, or query parameters that affect the page content

//the get route so that we can get the saved propeties to the frontend
export const GET = async() => {
  try {
    //connect db 
    connectDB()

    //getting the user details
    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }
    const { userId } = sessionUser;

    // Find user in database
    const user = await User.findOne({ _id: userId });

    // Get users bookmarks
    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });

    return new Response(JSON.stringify(bookmarks), { status: 200 });
  } catch (error) {
    console.log('error:', error)
    return new Response('Something went wrong:',{status:500})
  }
}

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
  
      let message;
  
      if (isBookmarked) {
        // If already bookmarked, remove it
        user.bookmarks.pull(propertyId);
        message = 'Bookmark removed successfully';
        isBookmarked = false;
      } else {
        // If not bookmarked, add it
        user.bookmarks.push(propertyId);
        message = 'Bookmark added successfully';
        isBookmarked = true;
      }
  
      await user.save();
  
      return new Response(JSON.stringify({ message, isBookmarked }), {
        status: 200,
      });
    } catch (error) {
      console.log(error);
      return new Response('Something went wrong', { status: 500 });
    }
  };