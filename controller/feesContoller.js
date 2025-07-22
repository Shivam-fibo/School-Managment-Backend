import FeeModel from "../model/feeModel.js";

export const MonthlyFees = async (req, res) => {
  try {
    const {
      group,
      monthName,
      monthFees,
      tuitionFees,
      transportFees,
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
      transportFees,
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

