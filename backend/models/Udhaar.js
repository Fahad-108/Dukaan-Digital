import mongoose from "mongoose";

const udhaarSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        default: ""
    },
    amount: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending"
    }
},
    {
        timestamps: true
    }
);

// udhaarSchema.index({ createdAt: -1 });
// udhaarSchema.index({ userId: 1 });
// udhaarSchema.index({ customerName: 1 });
// udhaarSchema.index({ status: 1 });


const Udhaar = mongoose.model('udhaar', udhaarSchema);
export default Udhaar;