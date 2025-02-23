import { Schema, model } from "mongoose";

const otpSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
		},
		otp: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds:480 });
const Otp = model("Otp", otpSchema);
export default Otp;
