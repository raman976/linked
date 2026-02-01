import UserModel,{IUser} from "../models/User.model";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

class AuthService{
    public async register(email:string,password:string): Promise<IUser>{
        const existingUser=await UserModel.findOne({email});
        if(existingUser) throw new Error("USER ALREADY EXISTS ,PLEASE LOGIN")
            const hashedPassword=await bcrypt.hash(password,10)
            const user=await UserModel.create({
                email,
                password:hashedPassword
            })
            return user 
    }

    public async login(email:string,password:string): Promise<string>{
        const user=await UserModel.findOne({email});
        if(!user) throw new Error("USER NOT REGISTERED PLEASE REGISTER")
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) throw new Error("WRONG PASSWORD")
        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET as string,{expiresIn:"1d"})
    return token
    }

    public async getAllUsers(): Promise<IUser[]>{
        const users=await UserModel.find().select("-password")
        return users
    }

    public async getUserById(userId:string): Promise<IUser | null>{
        const user=await UserModel.findById(userId).select("-password")
        return user
    }

    public async updatePassword(userId:string,oldPassword:string,newPassword:string): Promise<void>{
        const user=await UserModel.findById(userId)
        if(!user) throw new Error("USER NOT FOUND")
        
        const isMatch=await bcrypt.compare(oldPassword,user.password)
        if(!isMatch) throw new Error("WRONG OLD PASSWORD")
        
        const hashedPassword=await bcrypt.hash(newPassword,10)
        user.password=hashedPassword
        await user.save()
    }

    public async deleteUser(userId:string,password:string): Promise<void>{
        const user=await UserModel.findById(userId)
        if(!user) throw new Error("USER NOT FOUND")
        
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch) throw new Error("WRONG PASSWORD")
        
        await UserModel.deleteOne({_id:userId})
    }
}

export default AuthService;