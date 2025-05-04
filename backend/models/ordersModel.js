// import mongoose from "mongoose";

// const orderSchema=new mongoose.Schema({
//     userId:{type:String,required:true,ref:'product'},
//     items:[ {
//             product:{type:String,required:true,ref:'user'},
//             quantity:{type:Number,required:true},
//         } ],
//         amount:{type:Number,required:true},
//         address:{type:String,required:true},
//         status:{type:String,default:'OrdrPlaced'},
//         paymentType:{type:String,required:true},
//         isPaid:{type:Boolean},

// },{timestamps:true})

// const Order=mongoose.models.order || mongoose.model('order',orderSchema)

// export default Order;

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // assuming your user model is named 'user'
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product', 
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    }
  ],
  amount: {
    type: Number,
    required: true,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'address', // only if address is stored as a document
    required: true,
  },
  status: {
    type: String,
    default: 'OrderPlaced',
  },
  paymentType: {
    type: String,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Order = mongoose.models.order || mongoose.model('order', orderSchema);

export default Order;
