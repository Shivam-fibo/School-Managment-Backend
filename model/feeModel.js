import mongoose from "mongoose";

const FeesSchema = new mongoose.Schema({
    group: {
        type: String,
        required: true
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

export default mongoose.model("FeeModel", FeesSchema);
