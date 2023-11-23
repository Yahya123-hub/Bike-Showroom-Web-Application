import { Schema, model } from 'mongoose';

const OrderSchema = new Schema({
  items: String,
  grandtotal: Number ,
  paymentmethod:{
    type: String ,
    default: "Cash"
  } , 
  status:{
    type: String ,
    default: "Pending"
  },  
  CreatedAT: {
    type: Date,
    default: Date.now
  },
  UpdatedAT: {
    type: Date,
    default: Date.now
  },
  Active: {
    type: Boolean,
    default: true
  }
});

const Order = model('Order', OrderSchema);

export default Order;
