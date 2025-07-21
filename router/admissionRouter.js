import express from 'express'
import {AdmissionDetails, uploadProfileImage, AllStudentList } from '../controller/admissionController.js'
const router = express.Router()

router.post('/newStudent',uploadProfileImage, AdmissionDetails )
router.get("/allStudent", AllStudentList)
export default router