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

const Udhaar = mongoose.model('udhaar', udhaarSchema);
export default Udhaar;