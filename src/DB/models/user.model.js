import { Schema, model } from "mongoose";
import { hash } from "../../utils/hashing/hash.js";
export const defaultProfilePic = "uploads//default.jpg";
export const publicIdCloud = "default_mpkkic";
export const secureUrlCloud =
	"https://res.cloudinary.com/dheffyjlk/image/upload/v1739782608/default_mpkkic.png";
export const roles = {
	superSuperAdmin: "superSuperAdmin",
	superAdmin: "superAdmin",
	admin: "admin",
	user: "user",
};
export const provdiers = {
	system: "system",
	google: "google",
};
const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: [true, "Email already exists"],
			lowercase: true,
			match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
		},
		password: {
			type: String,
			required: function () {
				return this.provider === provdiers.system ? true : false;
			},
		},
		userName: {
			type: String,
			minlength: 5,
			maxlength: 20,
			unique: true,
			required: true,
		},
		isAcctivated: {
			type: Boolean,
			default: false,
		},
		role: {
			type: String,
			default: roles.user,
		},
		isLoggedIn: {
			type: Boolean,
			default: false,
		},
		freeze: {
			type: Boolean,
			default: false,
		},
		provider: {
			type: String,
			enum: Object.values(provdiers),
			default: provdiers.system,
		},
		tempMail: {
			type: String,
			default: null,
		},
		profilePicture: {
			type: String,
			default: defaultProfilePic,
		},
		profilePicCloud: {
			public_id: { type: String, default: publicIdCloud },
			secure_url: { type: String, default: secureUrlCloud },
		},
		coverPictures: {
			type: [String],
		},
	},
	{ timestamps: true }
);
// doc.save() >>user.save()
userSchema.pre("save", function (next) {
	if (this.isModified("password")) {
		this.password = hash({ plainText: this.password });
	}
	return next();
});

const User = model("User", userSchema);

export default User;
