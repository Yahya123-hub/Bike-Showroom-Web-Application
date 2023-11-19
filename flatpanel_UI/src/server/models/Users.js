import { Schema, model } from 'mongoose';

const UsersSchema = new Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    CreatedAt: {
      type: Date,
      default: Date.now
    },
    UpdatedAt: {
      type: Date,
      default: Date.now
    },
    Active: {
      type: Boolean,
      default: true
    }
  });
  
  const Users = model('Users', UsersSchema);
  
  export default Users;
  