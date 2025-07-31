import mongoose from "mongoose";

const termFeeSchema = new mongoose.Schema({
  termName: { type: String, required: true },
  amount: { type: Number, required: true }
});

const feeSchema = new mongoose.Schema({
  group: { type: String, required: true, unique: true },
  registrationFee: { type: Number, default: 0 },
  admissionFee: { type: Number, default: 0 },
  annualFee: { type: Number, default: 0 },
  monthlyFee: { type: Number, required: true },
  termFees: [termFeeSchema] 
}, { timestamps: true });

export default mongoose.model("Fee", feeSchema);
