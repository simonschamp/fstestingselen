import mongoose, { Document } from "mongoose";
interface IUser extends Document {
    username: string;
    password: string;
}
declare const User: mongoose.Model<IUser>;
export { User, type IUser };
//# sourceMappingURL=User.d.ts.map