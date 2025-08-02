import FeeModel from "../model/feeModel.js";
import admissionModel from "../model/admissionModel.js";

export const fullStructure = async (req, res) => {
  try {
    const {
      group,
      registrationFee,
      admissionFee,
      annualFee,
      monthlyFee,
      termFees ,
      tuitionFees
    } = req.body;
console.log(req.body)
    if (!group || !monthlyFee || !registrationFee || !admissionFee || !termFees) {
      return res.status(400).json({ message: "All field are required" });
    }

    const existing = await FeeModel.findOne({ group });

    if (existing) {
      existing.registrationFee = registrationFee || 0;
      existing.admissionFee = admissionFee || 0;
      existing.annualFee = annualFee || 0;
      existing.monthlyFee = monthlyFee;
      existing.termFees = termFees || [];
      existing.tuitionFees = tuitionFees;

      await existing.save();

      return res.status(200).json({ success: true, message: "Fee structure updated", data: existing });
    }

    const newFee = new FeeModel({
      group,
      registrationFee,
      admissionFee,
      annualFee,
      monthlyFee,
      termFees,
      tuitionFees
    });

    await newFee.save();
    return res.status(201).json({ success: true, message: "Fee structure created", data: newFee });
  } catch (error) {
    console.error("Error setting fee structure:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};



export const getStudentMonthlyFeeDetails = async (req, res) => {
  const { studentId } = req.query;

  if (!studentId) {
    return res.status(400).json({ error: "studentId is required in query params" });
  }

  try {
    const student = await admissionModel.findOne({ studentId });
    console.log(student)
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // ✅ Get fees for the student's group
    const monthlyFees = await FeeModel.find({ group: student.group }).sort({ monthName: 1 });

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



export const getStudentOneTimeFeeDetails = async (req, res) => {
  const { studentId } = req.query;
  console.log(studentId)

  if (!studentId) {
    return res.status(400).json({ error: "studentId is required in query params" });
  }

  try {
    // ✅ Find the student using their studentId
    const student = await admissionModel.findOne({ studentId });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // ✅ Fetch the fee structure for the student's group
    const feeStructure = await FeeModel.findOne({ group: student.group });
    console.log(feeStructure)
    console.log(feeStructure)
    if (!feeStructure) {
      return res.status(404).json({ error: "Fee structure not found for this group" });
    }

    // ✅ Return only one-time fees
    return res.status(200).json({
      student: {
        studentId: student.studentId,
        fullName: `${student.firstName} ${student.lastName || ""}`,
        group: student.group,
        section: student.section
      },
      oneTimeFees: {
        registrationFee: feeStructure.registrationFee || 0,
        admissionFee: feeStructure.admissionFee || 0,
        annualFee: feeStructure.annualFee || 0,
        termFee: feeStructure.termFees
      }
    });
  } catch (error) {
    console.error("Error fetching one-time fee details:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};
