import { Schema, model } from 'mongoose';

const MechanicsSchema = new Schema({
  name: String,
  contact: String,
  email: String,
  isApproved: {
    type: Boolean,
    default: false,
  },
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

const Mechanics = model('Mechanics', MechanicsSchema);

export default Mechanics;
