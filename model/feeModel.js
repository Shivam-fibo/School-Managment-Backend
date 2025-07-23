import mongoose from "mongoose";

const FeesSchema = new mongoose.Schema({
    group: {
        type: String,
        required: true,
        enum: [
            "Nursery",
            "LKG",
            "UKG",
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
        ]
    },

    monthName: {
        type: String,
        required: true,
        enum: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
    monthFees: {
        type: Number,
        required: true
    },
    tuitionFees: {
        type: Number
    },
    examinationFees: {
        type: Number
    },
    sportFees: {
        type: Number
    },
    annualFunctionFees: {
        type: Number
    },
    extraFees: {
        type: Number
    },
    admissionFees: {
        type: Number
    }
});
FeesSchema.index({ group: 1, monthName: 1 }, { unique: true });

export default mongoose.model("FeeModel", FeesSchema);
