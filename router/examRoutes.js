import express from "express";
import {
  createExam,
  addSubjectToTerm,
  getAllExams,
  getGroupStudentsAndSubjects,
  saveStudentMarks,
  getStudentMarks
} from "../controller/examController.js";

const router = express.Router();

router.post("/create", createExam);
router.post("/add-subject", addSubjectToTerm);
router.get("/all", getAllExams);
router.get("/group-data/:group/:termName", getGroupStudentsAndSubjects);
router.post("/save-marks", saveStudentMarks);
router.post("/studnetsMarksByGroup", getStudentMarks)

export default router;
