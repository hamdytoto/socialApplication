import { query } from "express";
import { Schema, Types, model } from "mongoose";
const commentSchema = new Schema(
	{
		post: { type: Types.ObjectId, ref: "Post", required: true },
		user: { type: Types.ObjectId, ref: "User", required: true },
		text: {
			type: String,
			required: function () {
				return this.image ? false : true;
			},
		},
		image: { secure_url: String, public_id: String },
		deletedBy: { type: Types.ObjectId, ref: "User" },
		isDeleted: { type: Boolean, default: false },
		likes: [{ type: Types.ObjectId, ref: "User" }],
		comment: { type: Types.ObjectId, ref: "Comment" },
	},
	{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
commentSchema.virtual("replies", {
	localField: "_id",
	foreignField: "comment",
	ref: "Comment",
});
commentSchema.post(
	"deleteOne",
	{ query: false, document: true },
	async function (doc, next) {
		if(doc.image.secure_url){
			await cloudinary.uploader.destroy(doc.image.public_id);
		}
		const commentParent = doc._id;
		const replies = await this.constructor.find({ comment: commentParent });
		if (replies.length) {
			for (const reply of replies) {
				await reply.deleteOne();
			}
		}
		return next();
	}
);
const Comment = model("Comment", commentSchema);
export default Comment;
