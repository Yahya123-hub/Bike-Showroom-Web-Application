import { Schema, model } from 'mongoose';

const FeedbackSchema = new Schema({
  mechanicID: String,
  comment: String,
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

const Feedback = model('Feedback', FeedbackSchema);

export default Feedback;
