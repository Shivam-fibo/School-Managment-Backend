import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  subjectName: { type: String, required: true },
  maxMarks: { type: Number, default: 100 },
  passMarks: { type: Number, default: 33 },
});

const termSchema = new mongoose.Schema({
  termName: { type: String, required: true },
  subjects: [subjectSchema],
});

const examSchema = new mongoose.Schema(
  {
    group: { type: String, required: true },
    terms: [termSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Exam", examSchema);