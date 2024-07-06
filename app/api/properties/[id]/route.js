import connectDB from "@/config/db"
import Property from "@/models/property.models"
import { getSessionUser } from "@/utils/getSessionUser"

export const GET = async(request , {params}) => {
    //just like we need to use the req.params in a typical mern backend here we can destructure it from the get function itself
    const {id} = params
    try {
        // connect database 
        connectDB()

        //get all the properties from the database
        const property = await Property.findById(id)

        if(!property){
            return new Response('Property not found', {status:500})
        }

        return new Response(JSON.stringify(property) , {status:200})
    } catch (error) {
        console.log('Error:' , error)
        // we are getting access to the Response object from the web fetch api 
        return new Response('Something went wrong' , {status:500})
    }
}

//here should come the delete handler so basically kabhi bhi hum agar get  request kar rahe hai then while using the fetch hume method specify karne ka need nahi hota hai rather when we are using the other methods then we do need to specify the http method
export const DELETE = async (request, { params }) => {
    try {
      const propertyId = params.id;
  
      const sessionUser = await getSessionUser();
  
      // Check for session
      if (!sessionUser || !sessionUser.userId) {
        return new Response('User ID is required', { status: 401 });
      }
  
      const { userId } = sessionUser;
  
      await connectDB();
  
      const property = await Property.findById(propertyId);
  
      if (!property) return new Response('Property Not Found', { status: 404 });
  
      // Verify ownership
      if (property.owner.toString() !== userId) {
        return new Response('Unauthorized', { status: 401 });
      }
  
      await property.deleteOne();
  
      return new Response('Property Deleted', {
        status: 200,
      });
    } catch (error) {
      console.log(error);
      return new Response('Something Went Wrong', { status: 500 });
    }
  };
