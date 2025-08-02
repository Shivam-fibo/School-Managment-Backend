import mongoose from "mongoose";
const termFeeSchema = new mongoose.Schema({
  termName: { type: String, required: true },
  amount: { type: Number, required: true }

});

const FeesSchema = new mongoose.Schema({
  group: {
    type: String,
    required: true,
    enum: ["Nursery", "LKG", "UKG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
  },
   registrationFee: { type: Number, default: 0 },
  admissionFee: { type: Number, default: 0 },
  annualFee: { type: Number, default: 0 },
  monthlyFee: { type: Number, required: true },
  termFees: [termFeeSchema] ,
  tuitionFees: {
    type: Number,
    required: true
  }
});
FeesSchema.index({ group: 1 }, { unique: true });

export default mongoose.model("FeeModel", FeesSchema);
