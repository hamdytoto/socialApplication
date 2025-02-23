import { Schema, model, Types } from "mongoose";

const postSchema = new Schema(
	{
		text: {
			type: String,
			minlength: 3,
			maxlength: 1000,
			required: function () {
				return this.images.length ? false : true;
			},
		},
		images: [{ secure_url: String, public_id: String }],
		likes: [{ type: Types.ObjectId, ref: "User" }],
		user: { type: Types.ObjectId, ref: "User", required: true },
		isDeleted: { type: Boolean, default: false },
		deletedBy: { type: Types.ObjectId, ref: "User" },
		cloudFolder: {
			type: String,
			required: function () {
				return this.images.length ? true : false;
			},
		},
	},
	{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
postSchema.virtual("comments", {
	ref: "Comment",
	foreignField: "post",
	localField: "_id",
});
const Post = model("Post", postSchema);
export default Post;
