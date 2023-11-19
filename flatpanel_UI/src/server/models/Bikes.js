import { Schema, model } from 'mongoose';

const BikesSchema = new Schema({
  name: String,
  price: Number,
  availableQuantity: Number,
  category: String,
  Image: String, 
  CreatedAT: {
    type: Date,
    default: Date.now,
  },
  UpdatedAT: {
    type: Date,
    default: Date.now,
  },
  Active: {
    type: Boolean,
    default: true,
  },
});

const Bikes = model('Bikes', BikesSchema);

export default Bikes;
