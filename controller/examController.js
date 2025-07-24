import Exam from "../model/examModel.js";


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
