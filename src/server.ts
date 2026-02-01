import App from "./app"
import AuthRoutes from "./routes/auth.routes"
import PostRoutes from "./routes/post.routes"

const app=new App(
    [new AuthRoutes, new PostRoutes]
)
app.start()