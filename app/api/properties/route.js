import connectDB from "@/config/db"
import Property from "@/models/property.models"
import { getSessionUser } from "@/utils/getSessionUser"

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


//submit the form data
export const POST = async(request) => {
    try {
        await connectDB();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
        return new Response('User ID is required', { status: 401 });
        }

        const { userId } = sessionUser;

        const formData = await request.formData();

        // Access all values from amenities and images
        const amenities = formData.getAll('amenities');
        const images = formData
        .getAll('images')
        .filter((image) => image.name !== '');

        // Create propertyData object for database
        const propertyData = {
        type: formData.get('type'),
        name: formData.get('name'),
        description: formData.get('description'),
        location: {
            street: formData.get('location.street'),
            city: formData.get('location.city'),
            state: formData.get('location.state'),
            zipcode: formData.get('location.zipcode'),
        },
        beds: formData.get('beds'),
        baths: formData.get('baths'),
        square_feet: formData.get('square_feet'),
        amenities,
        rates: {
            weekly: formData.get('rates.weekly'),
            monthly: formData.get('rates.monthly'),
            nightly: formData.get('rates.nightly.'),
        },
        seller_info: {
            name: formData.get('seller_info.name'),
            email: formData.get('seller_info.email'),
            phone: formData.get('seller_info.phone'),
        },
        owner: userId,
        };

        console.log('Here is the propety data:', propertyData)

        const newProperty = new Property(propertyData);
        await newProperty.save();

        return Response.redirect(
        `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
        );

        // return new Response(JSON.stringify({message:'Success'}), {status:200})
    } catch (error) {
        return new Response('Failed to add property', {status:500})
    }
}