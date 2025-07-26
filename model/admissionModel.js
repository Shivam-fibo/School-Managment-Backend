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
  required: true,
  enum: [
    "Nursery",
    "LKG",
    "UKG",
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
  ]
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
  distance: {
    type: Number,
    default: 0
  },
  payments: [
    {
      monthName: {
        type: String,
        enum: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      },
      paid: {
        type: Boolean,
        default: false
      },
      paidAt: {
        type: Date
      }
    }
  ],
  marks: [
  {
    termName: String,
    subjectName: String,
    marksObtained: Number
  }
]
});

export default mongoose.model("StudentAdmission", admissionSchema);
