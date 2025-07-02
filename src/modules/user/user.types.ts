import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  designation: string;
  phoneNo: number;
  location: string;
  role: string;
  generateAuthToken(): string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
