// user.model.ts
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { generateToken } from '../../shared/services/token.service';
import { UserRole } from '../../shared/types/roles.enum';
import { IUser } from './user.types';

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: (props: any) => `${props.value} is not a valid email!`,
      },
    },
    role: { type: String, required: true, default: UserRole.USER },
    password: { type: String, required: true, select: false },
    designation: { type: String, required: true },
    phoneNo: { type: String, required: true },
    location: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err as Error);
  }
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.generateAuthToken = function (): string {
  return generateToken({ id: this._id, email: this.email, role: this.role });
};

export const UserModel = mongoose.model<IUser>('User', UserSchema);
