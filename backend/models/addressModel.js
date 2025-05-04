import mongoose from "mongoose";

const addressSchema=mongoose.Schema({

})

const Address=mongoose.models.address || mongoose.model('address',addressSchema)

export default Address;