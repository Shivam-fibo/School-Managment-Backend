import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema({
  studentId: { type: String, unique: true },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    match: [/.+@.+\..+/, "Please enter a valid email address"]
  },
  dob: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true
  },
  group: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
  },
  guardianDetails: {
    fatherName: {
      type: String,
      required: true
    },
    motherName: {
      type: String,
      required: true
    },
    guardianPhone: {
      type: String,
      required: true
    }
  },
  admissionDate: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String,
  },
});

export default mongoose.model("StudentAdmission", admissionSchema);
