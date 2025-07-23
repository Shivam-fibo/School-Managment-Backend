import express from "express"
import {MonthlyFees, getSubmittedMonths} from "../controller/feesContoller.js"


const router = express.Router()

router.post("/monthFee", MonthlyFees)
router.get("/submitted-months", getSubmittedMonths);

export default router