import GoogleProvider from "next-auth/providers/google";

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
            //check if the user exists
            //if not add the user to the database
            //return true to allow sign in
        },
        //modifies the session object 
        async session({session}){
            //get user from the database
            //assign the user id to the session 
            //return session
        }
      },
}