import mongoose, { mongo } from "mongoose";

//flag to check whether the database is connected or not
let connected = false

const connectDB = async () => {
    if(connected){
        console.log('MongoDB is already connected🚀')
        return 
    }else{
        try {
            //since next is a edge time framework so basically we need to check ki pehle se hi database connection ho rakha hai ya nahi
            const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
            console.log('MongoDB connected ' , connectionInstance.connection.host)
            //toggle the connected state
            connected = true
        } catch (error) {
            console.log('Error in connecting the database:' , error)
        }
    }
    
}

export default connectDB