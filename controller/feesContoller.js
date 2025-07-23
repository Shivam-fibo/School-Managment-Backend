import FeeModel from "../model/feeModel.js";

export const MonthlyFees = async (req, res) => {
  console.log(req.body)
  try {
    const {
      group,
      monthName,
      monthFees,
      tuitionFees,
      examinationFees,
      sportFees,
      annualFunctionFees,
      extraFees,
      admissionFees
    } = req.body;

    const feeData = new FeeModel({
      group,
      monthName,
      monthFees,
      tuitionFees,
      examinationFees,
      sportFees,
      annualFunctionFees,
      extraFees,
      admissionFees
    });

    await feeData.save();

    return res.status(201).json({
      success: true,
      message: "Monthly fees data saved successfully.",
      data: feeData
    });
  } catch (error) {
    console.error("Error saving fees:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while saving fees.",
      error: error.message
    });
  }
};

export const getSubmittedMonths = async (req, res) => {
  try {
    console.log(req.query.group)
    const group  = req.query.group;

    if (!group) {
      return res.status(400).json({ success: false, message: "Group is required" });
    }

    const submitted = await FeeModel.find({ group }).select("monthName -_id");
    const months = submitted.map(fee => fee.monthName);

    return res.status(200).json({ success: true, months });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch submitted months",
      error: error.message
    });
  }
};