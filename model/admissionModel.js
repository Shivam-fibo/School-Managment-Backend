import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema({
  studentId: { type: String, unique: true },

  // Basic Info
  firstName: { type: String, required: true },
  lastName: { type: String },
  middleName: { type: String },
  preferredName: { type: String },
  email: {
    type: String,
    match: [/.+@.+\..+/, "Please enter a valid email address"]
  },
  dob: { type: Date, required: true },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true
  },
  group: {
    type: String,
    required: true,
    enum: [
      "Nursery", "LKG", "UKG", "1", "2", "3", "4", "5", "6",
      "7", "8", "9", "10", "11", "12"
    ]
  },
  section: { type: String, required: true },
  phoneNumber: { type: String },
  nationality: { type: String },
  culturalAffiliationCountry: { type: String },
  firstLanguage: { type: String },

  // Sibling Info
  siblings: [
    {
      name: String,
      age: Number
    }
  ],
  previouslyApplied: {
    type: Boolean,
    default: false
  },

  // Guardian Info
  guardianDetails: {
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    guardianPhone: { type: String, required: true }
  },

  // Family Info
  familyDetails: {
    motherFamilyName: String,
    motherFirstName: String,
    motherNationality: String,
    motherFirstLanguage: String,

    fatherFamilyName: String,
    fatherFirstName: String,
    fatherNationality: String,
    fatherFirstLanguage: String,

    homeAddress: String,
    contactDetails: {
      homePhone: String,
      email: String,
      motherMobile: String,
      fatherMobile: String
    }
  },

  // Other
  admissionDate: {
    type: Date,
    default: Date.now
  },
  distance: {
    type: Number,
    default: 0
  },
  image: { type: String },

  // Fees
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
      paidAt: { type: Date }
    }
  ],

  // Marks
  marks: [
    {
      termName: String,
      subjectName: String,
      marksObtained: Number
    }
  ]
});

export default mongoose.model("StudentAdmission", admissionSchema);
