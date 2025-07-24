import express from "express"
import {MonthlyFees, getSubmittedMonths,getStudentMonthlyFeeDetails,markFeePaid, getStudentFeeStatus} from "../controller/feesContoller.js"


const router = express.Router()

router.post("/monthFee", MonthlyFees)
router.get("/submitted-months", getSubmittedMonths);
router.get("/studnetFeeMonth",getStudentMonthlyFeeDetails )
router.post("/markFeePaid",markFeePaid)
router.get("/student/paymentStatus", getStudentFeeStatus);

export default router