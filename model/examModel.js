import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  subjectName: { type: String, required: true },
  maxMarks: { type: Number, default: 100 },
  passMarks: { type: Number, default: 33 },
});

const termSchema = new mongoose.Schema({
  termName: { type: String, required: true }, // e.g., Term 1, Term 2
  subjects: [subjectSchema],
});

const examSchema = new mongoose.Schema(
  {
    group: { type: String, required: true }, // e.g., "10"
    terms: [termSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Exam", examSchema);
