import mongoose, { mongo } from 'mongoose'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required'],
      },
      username: {
        type: String,
        required: [true, 'Username is required'],
      },
      image: {
        type: String,
      },
      bookmarks: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Property',
        },
      ],
},{
    timestamps:true
})


//create a model but keep in mind thay nextjs is a edge time framework and we do need to check that whether there exists a model or do we need to create it
const User = mongoose.models.User || mongoose.model('User' , userSchema)

export default User