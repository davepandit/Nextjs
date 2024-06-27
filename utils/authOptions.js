import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user.models";
import connectDB from "@/config/db";


//auth options
export const authOptions = {
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            //this will always load up the screen to choose our google accounts(matlab hume ek screen dikhta hai na jo ki aata hai when we need to login wahi wala)
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
            }
        })
    ],
    callbacks: {
        //this function will run on succesfull sign in
        async signIn({ account, profile }) {
            //connect to the database
            await connectDB()
            //check if the user exists
            const userExists = await User.findOne({ email: profile.email });
            //if not add the user to the database
            if (!userExists) {
                // Truncate user name if too long
                const username = profile.name.slice(0, 20);
        
                await User.create({
                  email: profile.email,
                  username,
                  image: profile.picture,
                });
              }
            //return true to allow sign in
            return true
        },
        //modifies the session object 
        async session({session}){
            //get user from the database
            const user = await User.findOne({ email: session.user.email });
            //assign the user id to the session 
            session.user.id = user._id.toString();
            //return session
            return session;
        }
      },
}