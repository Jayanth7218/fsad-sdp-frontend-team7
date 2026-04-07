import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import {
  getAllStudents,
  getAllSubjects,
  getSubjectsByFaculty,
  getMarksBySubject,
  addMarks,
} from "../../services/api";
import "../../styles/forms.css";

function StudentMarksPage() {
  const { user } = useContext(AppContext);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [improvementSuggestion, setImprovementSuggestion] = useState("");
  const [subjectMarks, setSubjectMarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getStudentKey = (student) => student.id ?? student._id ?? student.studentId ?? String(student.name);
  const getStudentId = (student) => String(student.id ?? student._id ?? student.studentId ?? "");

  useEffect(() => {
    fetchStudents();
    fetchSubjects();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    const result = await getAllStudents();
    let studentData = [];

    if (result.success && Array.isArray(result.data) && result.data.length > 0) {
      studentData = result.data;
    } else {
      studentData = JSON.parse(localStorage.getItem("students")) || [];
      if (!result.success && studentData.length === 0) {
        setError(result.error || "Unable to load students");
      }
    }

    setStudents(studentData);
    setLoading(false);
  };

  const fetchSubjects = async () => {
    setLoading(true);
    let result;

    if (user?.userType === "lecturer" && user?.id) {
      result = await getSubjectsByFaculty(user.id);
      if (!result.success) {
        result = await getAllSubjects();
      }
    } else {
      result = await getAllSubjects();
    }

    let subjectData = [];
    if (result.success && Array.isArray(result.data) && result.data.length > 0) {
      subjectData = result.data;
    } else {
      subjectData = JSON.parse(localStorage.getItem("subjects")) || [];
      if (!result.success && subjectData.length === 0) {
        setError(result.error || "Unable to load subjects");
      }
    }

    setSubjects(subjectData);
    setLoading(false);
  };

  const fetchMarksForSubject = async (subjectId) => {
    if (!subjectId) {
      setSubjectMarks([]);
      return;
    }

    setLoading(true);
    const result = await getMarksBySubject(subjectId);
    if (result.success && Array.isArray(result.data)) {
      const filtered = result.data.map((item) => ({
        studentName:
          item.studentName ||
          item.student?.name ||
          item.name ||
          item.studentName ||
          "Unknown",
        subjectName:
          item.subject || item.subjectName || item.subjectTitle || subjectId,
        obtainedMarks:
          item.score || item.marksObtained || item.obtainedMarks || item.marks || 0,
        maxMarks: 100,
        improvementSuggestion: item.improvementSuggestion || item.note || "",
      }));
      setSubjectMarks(filtered);
    } else {
      setSubjectMarks([]);
      if (!result.success) {
        setError(result.error || "Unable to load marks for selected subject");
      }
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!selectedStudent || !selectedSubject) {
      setError("Please select both student and subject before submitting.");
      return;
    }

    const parsedStudentId = Number(selectedStudent);
    const parsedSubjectId = Number(selectedSubject);

    const payload = {
      student: {
        id: Number.isNaN(parsedStudentId) ? selectedStudent : parsedStudentId,
      },
      subject: {
        id: Number.isNaN(parsedSubjectId) ? selectedSubject : parsedSubjectId,
      },
      marksObtained: Number(marks),
      maxMarks: 100,
    };

    const result = await addMarks(payload);
    if (!result.success) {
      setError(result.error || "Failed to save marks to server.");
      return;
    }

    const updatedStudents = students.map((student) => {
      const studentId = String(student.id ?? student._id ?? student.studentId ?? "");
      if (studentId === String(selectedStudent)) {
        const newMark = {
          subject: selectedSubject,
          score: Number(marks),
          improvementSuggestion: Number(marks) < 50 ? improvementSuggestion : "",
        };
        student.marks = student.marks ? [...student.marks, newMark] : [newMark];
      }
      return student;
    });

    localStorage.setItem("students", JSON.stringify(updatedStudents));
    setStudents(updatedStudents);
    alert("Marks added successfully.");
    setSelectedStudent("");
    setSelectedSubject("");
    setMarks("");
    setImprovementSuggestion("");
  };

  // aggregate marks for table
  const marksList = [];
  students.forEach((s) => {
    if (Array.isArray(s.marks)) {
      s.marks.forEach((m) => {
        marksList.push({ 
          student: s.name, 
          subject: m.subject, 
          score: m.score,
          improvementSuggestion: m.improvementSuggestion || ""
        });
      });
    }
  });

  return (
    <div className="container">
      <div className="page-grid">
        <div className="listing-card card">
          <h2>Student Marks</h2>
          {error && <div className="error-message">{error}</div>}
          {selectedSubject && subjectMarks.length > 0 ? (
            <table className="list-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Subject</th>
                  <th>Max Marks</th>
                  <th>Obtained Marks</th>
                  <th>Suggestion</th>
                </tr>
              </thead>
              <tbody>
                {subjectMarks.map((m, idx) => (
                  <tr key={idx}>
                    <td>{m.studentName}</td>
                    <td>{m.subjectName}</td>
                    <td>{m.maxMarks}</td>
                    <td>{m.obtainedMarks}</td>
                    <td>{m.improvementSuggestion || "--"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : selectedSubject ? (
            <p>No marks found for the selected subject.</p>
          ) : marksList.length > 0 ? (
            <table className="list-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Subject</th>
                  <th>Score</th>
                  <th>Suggestion</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {marksList.map((m, idx) => (
                  <tr key={idx}>
                    <td>{m.student}</td>
                    <td>{m.subject}</td>
                    <td>{m.score}</td>
                    <td>
                      {m.score < 50 && m.improvementSuggestion ? (
                        <span style={{ fontSize: "0.9rem", color: "#666", maxWidth: "200px", display: "block" }}>
                          {m.improvementSuggestion.substring(0, 50)}...
                        </span>
                      ) : m.score < 50 ? (
                        <span style={{ color: "#999", fontStyle: "italic" }}>No suggestion</span>
                      ) : (
                        <span style={{ color: "#ccc" }}>--</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn-danger"
                        onClick={() => {
                          // remove mark from student data
                          const updated = students.map((st) => {
                            if (st.name === m.student) {
                              st.marks = st.marks.filter(
                                (mk) => !(mk.subject === m.subject && mk.score === m.score)
                              );
                            }
                            return st;
                          });
                          setStudents(updated);
                          localStorage.setItem("students", JSON.stringify(updated));
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No marks recorded yet.</p>
          )}
        </div>
        <div className="form-wrapper card">
          <h2 className="form-title">📝 Add Marks</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="student">Select Student</label>
              <select
                id="student"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                required
              >
                <option value="">-- Choose a student --</option>
                {students.map((s) => {
                  const studentValue = getStudentId(s) || s.name;
                  return (
                    <option key={studentValue} value={studentValue}>{s.name}</option>
                  );
                })}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Select Subject</label>
              <select
                id="subject"
                value={selectedSubject}
                onChange={(e) => {
                  const subject = e.target.value;
                  setSelectedSubject(subject);
                  fetchMarksForSubject(subject);
                }}
                required
              >
                <option value="">-- Choose a subject --</option>
                {subjects.map((sub, i) => {
                  const subjectLabel = typeof sub === "string" ? sub : sub.subjectName || sub.subjectCode || sub.name || `Subject ${i + 1}`;
                  const subjectValue = typeof sub === "string" ? sub : String(sub.id ?? sub._id ?? sub.subjectId ?? subjectLabel);
                  return (
                    <option key={subjectValue} value={subjectValue}>
                      {subjectLabel}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="marks">Marks (0-100)</label>
              <input
                id="marks"
                type="number"
                min="0"
                max="100"
                placeholder="Enter marks"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                required
              />
            </div>

            {Number(marks) < 50 && marks !== "" && (
              <div className="form-group">
                <label htmlFor="suggestion">⚠️ Improvement Suggestion</label>
                <textarea
                  id="suggestion"
                  placeholder="Provide constructive feedback for improvement"
                  value={improvementSuggestion}
                  onChange={(e) => setImprovementSuggestion(e.target.value)}
                  rows="3"
                  style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ddd", fontFamily: "inherit" }}
                  required
                />
              </div>
            )}

            <button type="submit" className="btn-primary form-submit">Submit Marks</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StudentMarksPage;