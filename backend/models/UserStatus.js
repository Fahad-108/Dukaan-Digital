import mongoose from "mongoose";

const userStatusSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "suspended"],
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

userStatusSchema.index({ userId: 1 });
userStatusSchema.index({ status: 1 })

const UserStatus = mongoose.model('UserStatus', userStatusSchema);

export default UserStatus;