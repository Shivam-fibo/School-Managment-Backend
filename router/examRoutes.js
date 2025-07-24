import express from "express";
import {
  createExam,
  addSubjectToTerm,
  getAllExams,
} from "../controller/examController.js";

const router = express.Router();

router.post("/create", createExam);
router.post("/add-subject", addSubjectToTerm);
router.get("/all", getAllExams);

export default router;
