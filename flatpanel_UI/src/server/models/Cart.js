import { Schema, model } from 'mongoose';

const CartSchema = new Schema({
  BikeID: String,
  name: String,
  updatedprice:{
    type: Number,
    default: 0
  } ,
  price: Number ,
  stock: Number , //availablequantity
  orderedQuantity: Number ,
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

const Cart = model('Cart', CartSchema);

export default Cart;
