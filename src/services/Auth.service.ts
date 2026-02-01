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
                passowrd:hashedPassword
            })
            return user 
    }
    public async login(email:string,password:string): Promise<string>{
        const user=await UserModel.findOne({email});
        if(!user) throw new Error("USER NOT REGISTERED PLEASE REGISTER")
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) throw new Error("WRONG PASSWORD")
        const token=jwt.sign({userID:user._id},process.env.JWT_SECRET as string,{expiresIn:"1d"})
    return token
    }

}

export default AuthService;