import connectDB from "@/config/db"
import Property from "@/models/property.models"

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