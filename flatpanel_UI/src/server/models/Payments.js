import { Schema, model } from 'mongoose';

const PaymentSchema = new Schema({
  OrderID: String,
  payed_amount: Number ,
  payment_method: String,  
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

const Payment = model('Payment', PaymentSchema);

export default Payment;
