import express from "express"
import {MonthlyFees,getStudentMonthlyFeeDetails,markFeePaid, getStudentFeeStatus, BalanceSheet} from "../controller/feesContoller.js"


const router = express.Router()

router.post("/monthFee", MonthlyFees)
router.get("/studnetFeeMonth",getStudentMonthlyFeeDetails )
router.post("/markFeePaid",markFeePaid)
router.get("/student/paymentStatus", getStudentFeeStatus);
router.post("/balanceSheet",BalanceSheet )
export default router