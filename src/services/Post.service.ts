import PostModel,{IPost} from "../models/Post.model";

class PostService{
    public async createPost(userId:string,content:string): Promise<IPost>{
        const post=await PostModel.create({
            userId,
            content
        })
        return post 
    }

    public async getAllPosts(): Promise<IPost[]>{
        const posts=await PostModel.find().sort({createdAt:-1})
        return posts
    }

    public async getPostsByUser(userId:string): Promise<IPost[]>{
        const posts=await PostModel.find({userId}).sort({createdAt:-1})
        return posts
    }

    public async getPostById(postId:string): Promise<IPost | null>{
        const post=await PostModel.findById(postId)
        return post
    }

    public async updatePost(postId:string,userId:string,content:string): Promise<IPost | null>{
        const post=await PostModel.findOne({_id:postId,userId})
        if(!post) throw new Error("POST NOT FOUND OR YOU ARE NOT THE OWNER")
        post.content=content
        await post.save()
        return post
    }

    public async deletePost(postId:string,userId:string): Promise<void>{
        const result=await PostModel.deleteOne({_id:postId,userId})
        if(result.deletedCount===0) throw new Error("POST NOT FOUND OR YOU ARE NOT THE OWNER")
    }
}

export default PostService;
