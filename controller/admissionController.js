import admissionModel from "../model/admissionModel.js";
import cloudinary from "../config/cloudinary.js";
import multer from 'multer';

export const uploadProfileImage = multer().single("image");

export const AdmissionDetails = async (req, res) => {
  const {
    firstName,
    lastName,
    middleName,
    preferredName,
    email,
    dob,
    gender,
    group,
    section,
    phoneNumber,
    fatherName,
    motherName,
    guardianPhone,
    admissionDate,
    distance,
    nationality,
    culturalAffiliationCountry,
    firstLanguage,
    siblings,
    previouslyApplied,

    motherFamilyName,
    motherFirstName,
    motherNationality,
    motherFirstLanguage,

    fatherFamilyName,
    fatherFirstName,
    fatherNationality,
    fatherFirstLanguage,

    homeAddress,
    homePhone,
    motherMobile,
    fatherMobile
  } = req.body;

  try {
    if (
      !firstName || !dob || !gender || !group || !section ||
      !fatherName || !motherName || !guardianPhone
    ) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Generate Student ID
    const year = new Date(admissionDate || Date.now()).getFullYear();
    const groupCode = group;
    const prefix = `SGM${year}${groupCode}`;

    const lastStudent = await admissionModel
      .findOne({ studentId: { $regex: `^${prefix}` } })
      .sort({ studentId: -1 });

    let nextNumber = 1;
    if (lastStudent) {
      const lastId = lastStudent.studentId;
      const lastNumStr = lastId.slice(prefix.length);
      const lastNum = parseInt(lastNumStr, 10);
      nextNumber = lastNum + 1;
    }

    const studentId = `${prefix}${String(nextNumber).padStart(2, '0')}`;

    // Upload Image
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "Student" }, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }).end(req.file.buffer);
    });

    // Save Admission
    const newAdmission = new admissionModel({
      studentId,
      firstName,
      lastName,
      middleName,
      preferredName,
      email,
      dob,
      gender,
      group,
      section,
      phoneNumber,
      nationality,
      culturalAffiliationCountry,
      firstLanguage,
      siblings: siblings ? JSON.parse(siblings) : [], 
      previouslyApplied,

      guardianDetails: {
        fatherName,
        motherName,
        guardianPhone,
      },
      familyDetails: {
        motherFamilyName,
        motherFirstName,
        motherNationality,
        motherFirstLanguage,
        fatherFamilyName,
        fatherFirstName,
        fatherNationality,
        fatherFirstLanguage,
        homeAddress,
        contactDetails: {
          homePhone,
          email,
          motherMobile,
          fatherMobile
        }
      },
      admissionDate,
      distance,
      image: result.secure_url
    });

    await newAdmission.save();

    res.status(201).json({
      message: "Student admission saved successfully",
      data: newAdmission
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const AllStudentList = async (req, res) => {
  try {
    const students = await admissionModel.find();
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
