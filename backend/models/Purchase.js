import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        suppliername: {
            type: String,
            required: true
        },
        items: [
            {
                itemname: {
                    type: String,
                    ref: 'Product',
                    required: true
                },
                purchasePrice: {
                    type: Number,
                    required: true,
                    min: 0
                },
                quantity: {
                    type: Number,
                    default: 0
                }
            }
        ],
        total: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

// purchaseSchema.index({ createdAt: -1 });
// purchaseSchema.index({ userId: 1 });
// purchaseSchema.index({ suppliername: 1 });


const Purchase = mongoose.model('purchase', purchaseSchema);
export default Purchase;