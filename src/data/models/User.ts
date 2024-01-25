import mongoose from 'mongoose';

export interface User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  labels?: string[]; 
  groups?: string[];
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide a email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  labels: {
    type: [String],
    default: [],
  },
  groups: {
    type: [String],
    default: [],
  },
});

export default mongoose.models.users || mongoose.model<User>('users', UserSchema);