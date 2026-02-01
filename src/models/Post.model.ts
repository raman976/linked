import { Schema,model,Document } from "mongoose";

export interface IPost extends Document{
    userId:string;
    content:string;
    createdAt:Date;
    updatedAt:Date;
}

const PostSchema=new Schema<IPost>(
    {
    userId:{type:String,required:true},
    content:{type:String,required:true}
    },
    {timestamps:true}
);

const PostModel=model<IPost>("Post", PostSchema);

export default PostModel;
