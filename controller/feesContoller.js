import FeeModel from "../model/feeModel.js";
import admissionModel from "../model/admissionModel.js";
import feeModel from "../model/feeModel.js";
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

export const getStudentMonthlyFeeDetails = async (req, res) => {
  const { studentId } = req.query;

  if (!studentId) {
    return res.status(400).json({ error: "studentId is required in query params" });
  }

  try {
    // ✅ Find student by studentId (not _id)
    const student = await admissionModel.findOne({ studentId });
    console.log(student)
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // ✅ Get fees for the student's group
    const monthlyFees = await feeModel.find({ group: student.group }).sort({ monthName: 1 });

    return res.status(200).json({
      student: {
        studentId: student.studentId,
        fullName: `${student.firstName} ${student.lastName || ""}`,
        group: student.group,
        section: student.section,
        distance: student.distance
      },
      fees: monthlyFees
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch monthly fee details",
      error: error.message
    });
  }
};



export const markFeePaid = async (req, res) => {
  const { studentId, monthName } = req.body;

  if (!studentId || !monthName) {
    return res.status(400).json({ error: "studentId and monthName are required" });
  }

  try {
    const student = await admissionModel.findOne({ studentId });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }


    const paymentIndex = student.payments.findIndex(p => p.monthName === monthName);

    if (paymentIndex !== -1) {
      // Update existing record to paid
      student.payments[paymentIndex].paid = true;
      student.payments[paymentIndex].paidAt = new Date();
    } else {
      // Add new payment record
      student.payments.push({
        monthName,
        paid: true,
        paidAt: new Date()
      });
    }

    await student.save();

    res.json({ message: `Payment marked as done for ${monthName}`, payments: student.payments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}


export const getStudentFeeStatus = async (req, res) => {
  const { studentId } = req.query;

  if (!studentId) {
    return res.status(400).json({ error: "studentId is required" });
  }

  try {
    const student = await admissionModel.findOne({ studentId });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const allMonths = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Map all months to their payment status
    const feeStatus = allMonths.map(month => {
      const record = student.payments.find(p => p.monthName === month);
      return {
        monthName: month,
        paid: record?.paid || false,
        paidAt: record?.paidAt || null
      };
    });

    res.json({
      student: {
        studentId: student.studentId,
        fullName: `${student.firstName} ${student.lastName}`,
        group: student.group,
        section: student.section,
      },
      fees: feeStatus
    });

  } catch (error) {
    console.error("Error fetching student payment status:", error);
    res.status(500).json({ error: "Server error" });
  }
};


export const GroupExamMarks = async(req, res) =>{
  try {
    const {group} = req.body;
    
  } catch (error) {
    
  }
}



export const BalanceSheet = async(req, res) =>{
  const {group, section} = req.body;
  try {
    const student = await admissionModel.find({group, section})

    console.log(student)
    res.status(200).json({student})
  } catch (error) {
    console.log(error)
      res.status(500).json({ error: "Server error" });
  } 
}