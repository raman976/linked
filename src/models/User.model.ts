import { Schema,model,Document } from "mongoose";

export interface IUser extends Document{
    email:string;
    password:string;
}


const UserSchema=new Schema<IUser>(
    {
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
    },
    {timestamps:true}
);

const UserModel=model<IUser>("User", UserSchema);

export default UserModel;