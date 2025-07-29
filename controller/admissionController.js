import admissionModel from "../model/admissionModel.js";
import cloudinary from "../config/cloudinary.js";
import multer from 'multer'
export const uploadProfileImage = multer().single("image")
export const AdmissionDetails = async (req, res) => {
  const {
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
    distance
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

    // 1. Get the year from admissionDate or use current year
    const year = new Date(admissionDate || Date.now()).getFullYear();

    // 2. Use group as-is (LKG, UKG, Nursery, 1, 2, ...)
    const groupCode = group;

    // 3. Build prefix
    const prefix = `SGM${year}${groupCode}`;

    // 4. Find the last student with this prefix
    const lastStudent = await admissionModel
      .findOne({ studentId: { $regex: `^${prefix}` } })
      .sort({ studentId: -1 });

    let nextNumber = 1;
    if (lastStudent) {
      const lastId = lastStudent.studentId;
      const lastNumStr = lastId.slice(prefix.length); // get last number
      const lastNum = parseInt(lastNumStr, 10);
      nextNumber = lastNum + 1;
    }

    // 5. Final studentId
    const studentId = `${prefix}${String(nextNumber).padStart(2, '0')}`;

    // 6. Upload image
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "Student" }, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }).end(req.file.buffer);
    });

    // 7. Save new admission
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
      distance,
      image: result.secure_url
    });

    await newAdmission.save();

    res.status(201).json({ message: "Student admission saved successfully", data: newAdmission });
  } catch (error) {
    console.error(error);
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