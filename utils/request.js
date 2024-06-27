//some deployment settings 
const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null

//function to fetch all the properties from the api routes 
const fetchProperties = async() => {
    try {
        if(!apiDomain){
            return []
        }

      const res = await fetch(`${apiDomain}/properties`)
      
      if(!res.ok){
        throw new Error('Failed to fetch the data')
      }
      
      return res.json()
  
    } catch (error) {
      console.log('Error:' , error)
      return Response(`${error.message}` || 'Something went wrong', {status:500})
    }
  }

//function to fetch single property from the api routes 
const fetchProperty = async(id) => {
    try {
        if(!apiDomain){
            return null
        }

      const res = await fetch(`${apiDomain}/properties/${id}`)
      
      if(!res.ok){
        throw new Error('Failed to fetch the data')
      }
      
      return res.json()
  
    } catch (error) {
      console.log('Error:' , error)
      return Response(`${error.message}` || 'Something went wrong', {status:500})
    }
  }

export {fetchProperties, fetchProperty}