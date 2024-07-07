import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true,
      },
      name: {
        type: String,
        required: [true, 'Name is required'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
      },
      phone: {
        type: String,
      },
      body: {
        type: String,
      },
      read: {
        type: Boolean,
        default: false,
      }
},{
    timestamps:true
})

//first while creating the model we need to check whether the model exists or not so basically 
const Message = mongoose.models.Message || mongoose.model('Message', messageSchema)

export default Message