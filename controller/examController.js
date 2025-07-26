import Exam from "../model/examModel.js";
import admissionModel from "../model/admissionModel.js";

export const createExam = async (req, res) => {
  try {
    const { group, termName } = req.body;

    let exam = await Exam.findOne({ group });

    if (!exam) {
      exam = new Exam({ group, terms: [{ termName, subjects: [] }] });
    } else {
      const termExists = exam.terms.find((t) => t.termName === termName);
      if (termExists) {
        return res.status(400).json({ message: "Term already exists for this group" });
      }
      exam.terms.push({ termName, subjects: [] });
    }

    await exam.save();
    res.status(201).json({ message: "Exam created successfully", exam });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addSubjectToTerm = async (req, res) => {
  try { 
    const { group, termName, subjectName, maxMarks, passMarks } = req.body;

    const exam = await Exam.findOne({ group });
    if (!exam) return res.status(404).json({ message: "Group not found" });

    const term = exam.terms.find((t) => t.termName === termName);
    if (!term) return res.status(404).json({ message: "Term not found in this group" });

    const subjectExists = term.subjects.some(
      (s) => s.subjectName.toLowerCase() === subjectName.toLowerCase()
    );
    if (subjectExists) {
      return res.status(400).json({ message: "Subject already exists in this term" });
    }

    term.subjects.push({ subjectName, maxMarks, passMarks });
    await exam.save();

    res.status(200).json({ message: "Subject added", exam });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.status(200).json({ exams });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const getGroupStudentsAndSubjects = async (req, res) => {
  const { group, termName } = req.params;
  console.log(group, termName)
  try {
    const test = await admissionModel.find({group})
    console.log(test, "test")
    const students = await admissionModel.find({ group }).select("studentId firstName lastName");
    console.log(students)
    if (!students) return res.status(404).json({ message: "No students data found for group" });
    const exam = await Exam.findOne({ group });
    if (!exam) return res.status(404).json({ message: "No exam data found for group" });

    const term = exam.terms.find(t => t.termName === termName);
    if (!term) return res.status(404).json({ message: "No such term found in this group" });

    res.status(200).json({
      students,
      subjects: term.subjects
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const saveStudentMarks = async (req, res) => {
  try {
    const { studentId, termName, marks } = req.body;
    const student = await admissionModel.findOne({ studentId });
    if (!student) return res.status(404).json({ message: "Student not found" });

    marks.forEach(m => {
      student.marks.push({ termName, ...m });
    });

    await student.save();
    res.status(200).json({ message: "Marks saved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const getStudentMarks = async (req, res) => {
  const { group, termName } = req.body;

  try {
    const students = await admissionModel.find({ group });
    console.log(students)
    const results = students.map((student) => {
      const filteredMarks = student.marks.filter((m) => m.termName === termName);

      return {
        studentId: student.studentId,
        firstName: student.firstName,
        lastName: student.lastName,
        group: student.group,
        termName,
        marks: filteredMarks
      };
    });

    res.status(200).json({ students: results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


