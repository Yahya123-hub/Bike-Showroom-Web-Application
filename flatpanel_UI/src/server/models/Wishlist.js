import { Schema, model } from 'mongoose';

const WishlistSchema = new Schema({
  BikeID: String,
  name: String,
  price: Number ,
  availableQuantity: Number ,
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

const Wishlist = model('Wishlist', WishlistSchema);

export default Wishlist;
