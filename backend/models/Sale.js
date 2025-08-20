import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'product',
                    required: true
                },
                productName: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                },
                unit: {
                    type: String,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                }
            }
        ],
        type: {
            type: String,
            enum: ['sale', 'purchase'],
            required: true
        },
        customerName: {
            type: String
        },
        totalAmount: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

const Sale = mongoose.model('sale', saleSchema);
export default Sale;