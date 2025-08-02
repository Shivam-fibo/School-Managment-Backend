import express from "express"
import {fullStructure,getStudentMonthlyFeeDetails,markFeePaid, getStudentFeeStatus, BalanceSheet,getStudentOneTimeFeeDetails} from "../controller/feesContoller.js"


const router = express.Router()

router.post("/fullStructure", fullStructure)
router.get("/studnetFeeMonth",getStudentMonthlyFeeDetails )
router.get("/studnetFeeOneTime",getStudentOneTimeFeeDetails )
router.post("/markFeePaid",markFeePaid)
router.get("/student/paymentStatus", getStudentFeeStatus);
router.post("/balanceSheet",BalanceSheet )
export default router