import {
  createBadRequest,
  createUnprocessableEntity,
} from '../../shared/utils/error.factory.utils';
import { UserModel, IUser } from './user.model';

export class UserService {
  static async createUser({
    email,
    password,
    phoneNo,
    designation,
    location,
  }: Partial<IUser>) {
    if (!email) throw createBadRequest('Email is required');
    if (!password) throw createBadRequest('Password is required');
    if (!phoneNo) throw createBadRequest('Phone no is required');
    if (!designation) throw createBadRequest('Designation is required');
    if (!location) throw createBadRequest('Location is required');

    const existing = await UserModel.findOne({ email: email });
    if (existing)
      throw createUnprocessableEntity('User already exists with given email');

    const user = new UserModel({
      email,
      password,
      phoneNo,
      designation,
      location,
    });
    await user.save();

    const token = user.generateAuthToken();

    const userObj: Partial<IUser> = user.toObject();
    delete userObj.password;

    return { user: userObj, token };
  }

  static async updateUser(id: string, updates: Partial<IUser>) {
    const user = await UserModel.findById(id);
    if (!user) throw createBadRequest('User not found with given id');

    Object.assign(user, updates);
    await user.save();

    const userObj: Partial<IUser> = user.toObject();
    delete userObj.password;
    return userObj;
  }

  static async checkUserExists(id: string) {
    const user = await UserModel.findById(id).select('_id');
    if (!user) return false;
    return true;
  }
}
