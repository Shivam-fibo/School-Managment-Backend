import express from "express"
import {MonthlyFees} from "../controller/feesContoller.js"


const router = express.Router()

router.post("/monthFee", MonthlyFees)

export default router