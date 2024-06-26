import connectDB from "@/config/db"
import Property from "@/models/property.models"

export const GET = async(request) => {
    try {
        // connect database 
        connectDB()

        //get all the properties from the database
        const properties = await Property.find({})
        return new Response(JSON.stringify(properties) , {status:200})
    } catch (error) {
        console.log('Error:' , error)
        // we are getting access to the Response object from the web fetch api 
        return new Response('Something went wrong' , {status:500})
    }
}