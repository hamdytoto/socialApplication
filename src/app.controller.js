import connectDB from "./DB/connection.js";
import userRouter from "./modules/user/user.controller.js";
import authRouter from "./modules/auth/auth.controller.js";
import postRouter from "./modules/post/post.controller.js";
import commentRouter from "./modules/comment/comment.controller.js";
import adminRouter from "./modules/admin/admin.controller.js";
import globalErrorHandler from "./utils/errors/globalError.js";
import notFoundHandler from "./utils/errors/notFoundHandler.js";
import cors from "cors";
import morgan from "morgan";

const bootstrap = async (app, express) => {
	await connectDB();
	app.use(morgan("dev"));
	app.use(cors());
	app.use(express.json());
	app.use("/auth", authRouter);
	app.use("/user", userRouter);
	app.use("/post", postRouter);
	app.use("/comment", commentRouter);
	app.use("/admin", adminRouter);
	app.all("*", notFoundHandler);
	app.use(globalErrorHandler);
};

export default bootstrap;
