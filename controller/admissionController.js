import admissionModel from "../model/admissionModel.js";
import cloudinary from "../config/cloudinary.js";
import multer from 'multer'
export const uploadProfileImage = multer().single("image")
export const AdmissionDetails = async (req, res) => {
  const {
    studentId,
    firstName,
    lastName,
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
  } = req.body;

  try {
    if (
      !studentId ||
      !firstName ||
      !dob ||
      !gender ||
      !group ||
      !section ||
      !fatherName ||
      !motherName ||
      !guardianPhone
    ) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const existingStudent = await admissionModel.findOne({ studentId });

    if (existingStudent) {
      return res.status(400).json({ error: "Student ID is already in use. Choose another one." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is reqired" })
    }
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "Student" }, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }).end(req.file.buffer);
    })
    const newAdmission = new admissionModel({
      studentId,
      firstName,
      lastName,
      email,
      dob,
      gender,
      group,
      section,
      phoneNumber,
      guardianDetails: {
        fatherName,
        motherName,
        guardianPhone,
      },
      admissionDate,
      image: result.secure_url
    });

    await newAdmission.save();

    res.status(201).json({ message: "Student admission saved successfully", data: newAdmission });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};



export const AllStudentList = async(req, res) =>{
  try {
    const student = await admissionModel.find()
    return res.status(200).json({student})
  } catch (error) {
        res.status(500).json({ message: "Server error", error });

  }
  
}