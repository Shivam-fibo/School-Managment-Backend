import express from 'express'
import {AdmissionDetails, uploadProfileImage, AllStudentList,  deleteStudent,
  updateStudent,
   } from '../controller/admissionController.js'
const router = express.Router()

router.post('/newStudent',uploadProfileImage, AdmissionDetails )
router.get("/allStudent", AllStudentList)
router.delete("/delete/:id", deleteStudent);
router.put("/update/:id", updateStudent);
export default router