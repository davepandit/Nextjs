import connectDB from "@/config/db";
import Property from "@/models/property.models";

export const GET = async (request) => {
    try {
      connectDB();
  
      const { searchParams } = new URL(request.url);
      //this is a method to get the query params in the backend in the frontend we can also easily get that using the {searchParmas} prop
      const location = searchParams.get('location');
      const propertyType = searchParams.get('propertyType');
  
      const locationPattern = new RegExp(location, 'i');
  
      // Match location pattern against database fields
      let query = {
        $or: [
          { name: locationPattern },
          { description: locationPattern },
          { 'location.street': locationPattern },
          { 'location.city': locationPattern },
          { 'location.state': locationPattern },
          { 'location.zipcode': locationPattern },
        ],
      };
  
      // Only check for property if its not 'All'
      if (propertyType && propertyType !== 'All') {
        const typePattern = new RegExp(propertyType, 'i');
        query.type = typePattern;
      }
  
      const properties = await Property.find(query);
  
      return new Response(JSON.stringify(properties), {
        status: 200,
      });
    } catch (error) {
      console.log(error);
      return new Response('Something went wrong', { status: 500 });
    }
  };


//note for the regex expression 
// const locationPattern = new RegExp(location, 'i');

// This creates a case-insensitive regular expression from the location variable.
// If location is "London", locationPattern will match "London", "london", "LONDON", etc.
// The 'i' flag makes it case-insensitive.


// The query object:

// It uses MongoDB's $or operator to match any of the specified conditions.
// It checks multiple fields for the location pattern.


// Fields being checked:

// name
// description
// location.street
// location.city
// location.state
// location.zipcode



// Example:
// Let's say location is "London". The query will match documents where any of these are true:

// The name field contains "London" (case-insensitive)
// The description field contains "London"
// The location.street field contains "London"
// The location.city field contains "London"
// The location.state field contains "London"
// The location.zipcode field contains "London"