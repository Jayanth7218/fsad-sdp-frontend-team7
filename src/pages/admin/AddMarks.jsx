import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import {
  getAllStudents,
  getAllSubjects,
  getSubjectsByFaculty,
  getMarksBySubject,
  getAllMarks,
  deleteMarks,
  addMarks,
} from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [allMarks, setAllMarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getStudentKey = (student) => student.id ?? student._id ?? student.studentId ?? String(student.name);
  const getStudentId = (student) => String(student.id ?? student._id ?? student.studentId ?? "");

  useEffect(() => {
    fetchStudents();
    fetchSubjects();
    fetchAllMarks();
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

  const normalizeString = (value) => {
    if (value === null || value === undefined) return "";
    if (typeof value === "string") return value;
    if (typeof value === "number" || typeof value === "boolean") return String(value);
    if (typeof value === "object") {
      if (Array.isArray(value)) return value.map(normalizeString).join(", ");
      if (value.subjectName) return normalizeString(value.subjectName);
      if (value.name) return normalizeString(value.name);
      if (value.subjectCode) return normalizeString(value.subjectCode);
      if (value.facultyName) return normalizeString(value.facultyName);
      if (value.id) return normalizeString(value.id);
      return JSON.stringify(value);
    }
    return String(value);
  };

  const getLocalMarks = () => {
    let storedStudents = [];
    try {
      storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    } catch (err) {
      console.error("Failed to parse students from localStorage:", err);
      storedStudents = [];
    }

    const localMarks = [];

    storedStudents.forEach((student) => {
      if (!Array.isArray(student.marks)) return;
      student.marks.forEach((mark, index) => {
        const localId =
          mark.id ?? mark._id ?? mark.markId ?? `${normalizeString(student.name)}-${normalizeString(mark.subject || mark.subjectName)}-${index}`;
        localMarks.push({
          id: localId,
          studentName: normalizeString(student.name) || "Unknown",
          facultyName: normalizeString(mark.faculty?.name || mark.facultyName) || "Unknown",
          subjectName: normalizeString(mark.subject || mark.subjectName) || "Unknown",
          obtainedMarks: mark.score ?? mark.marksObtained ?? mark.obtainedMarks ?? mark.marks ?? 0,
          maxMarks: mark.maxMarks ?? 100,
          improvementSuggestion: normalizeString(mark.improvementSuggestion || mark.suggestion || mark.note || ""),
        });
      });
    });

    return localMarks;
  };

  const fetchAllMarks = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await getAllMarks();
      if (result.success && Array.isArray(result.data) && result.data.length > 0) {
        const formatted = result.data.map((item) => ({
          id: item.id ?? item._id ?? item.markId ?? null,
          studentName: normalizeString(
            item.student?.name || item.studentName || item.student?.studentName
          ) || "Unknown",
          facultyName: normalizeString(
            item.subject?.faculty?.name || item.subject?.facultyName || item.faculty?.name || item.facultyName || item.faculty
          ) || "Unknown",
          subjectName: normalizeString(
            item.subject?.subjectName || item.subject?.name || item.subjectName || item.subjectCode || item.subject
          ) || "Unknown",
          obtainedMarks:
            item.marksObtained ?? item.score ?? item.obtainedMarks ?? item.marks ?? 0,
          maxMarks: item.maxMarks ?? 100,
          improvementSuggestion: normalizeString(item.improvementSuggestion || item.suggestion || item.note || ""),
        }));
        setAllMarks(formatted);
      } else {
        const localMarks = getLocalMarks();
        setAllMarks(localMarks);
        if (!result.success && localMarks.length === 0) {
          setError(result.error || "Unable to load marks");
        }
      }
    } catch (err) {
      console.error("fetchAllMarks error:", err);
      setError(err.message || "Unable to load marks");
      setAllMarks(getLocalMarks());
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async () => {
    setError("");
    setLoading(true);
    try {
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
    } catch (err) {
      console.error("fetchSubjects error:", err);
      setError(err.message || "Unable to load subjects");
      try {
        setSubjects(JSON.parse(localStorage.getItem("subjects")) || []);
      } catch (storageErr) {
        console.error("Failed to parse subjects from localStorage:", storageErr);
        setSubjects([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchMarksForSubject = async (subjectId) => {
    if (!subjectId) {
      setSubjectMarks([]);
      return;
    }

    setError("");
    setLoading(true);
    try {
      const result = await getMarksBySubject(subjectId);
      if (result.success && Array.isArray(result.data) && result.data.length > 0) {
        const filtered = result.data.map((item) => ({
          id: item.id ?? item._id ?? item.markId ?? null,
          studentName: normalizeString(
            item.studentName || item.student?.name || item.name
          ) || "Unknown",
          facultyName: normalizeString(
            item.subject?.faculty?.name || item.subject?.facultyName || item.faculty?.name || item.facultyName || item.faculty
          ) || "Unknown",
          subjectName: normalizeString(
            item.subject || item.subjectName || item.subjectTitle
          ) || normalizeString(subjectId),
          obtainedMarks:
            item.score || item.marksObtained || item.obtainedMarks || item.marks || 0,
          maxMarks: 100,
          improvementSuggestion: normalizeString(item.improvementSuggestion || item.suggestion || item.note || ""),
        }));
        setSubjectMarks(filtered);
      } else {
        const selectedSubjectObj = subjects.find(
          (sub) => String(sub.id ?? sub._id ?? sub.subjectId ?? sub.subjectCode) === String(subjectId)
        );
        const subjectLabel =
          selectedSubjectObj?.subjectName || selectedSubjectObj?.name || selectedSubjectObj?.subjectCode || subjectId;
        const localMarks = getLocalMarks().filter(
          (mark) => String(mark.subjectName) === String(subjectLabel) || String(mark.subjectName) === String(subjectId)
        );
        setSubjectMarks(localMarks);
        if (!result.success && localMarks.length === 0) {
          setError(result.error || "Unable to load marks for selected subject");
        }
      }
    } catch (err) {
      console.error("fetchMarksForSubject error:", err);
      setError(err.message || "Unable to load marks for selected subject");
      const selectedSubjectObj = subjects.find(
        (sub) => String(sub.id ?? sub._id ?? sub.subjectId ?? sub.subjectCode) === String(subjectId)
      );
      const subjectLabel =
        selectedSubjectObj?.subjectName || selectedSubjectObj?.name || selectedSubjectObj?.subjectCode || subjectId;
      setSubjectMarks(
        getLocalMarks().filter(
          (mark) => String(mark.subjectName) === String(subjectLabel) || String(mark.subjectName) === String(subjectId)
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMark = async (markId) => {
    if (!markId) {
      toast.error("Cannot delete this mark because its id is missing.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this mark?")) {
      return;
    }

    setLoading(true);
    const result = await deleteMarks(markId);
    setLoading(false);

    if (!result.success) {
      toast.error(result.error || "Unable to delete the mark.");
      return;
    }

    setAllMarks((prev) => prev.filter((m) => String(m.id) !== String(markId)));
    setSubjectMarks((prev) => prev.filter((m) => String(m.id) !== String(markId)));
    toast.success(result.message || "Mark deleted successfully.");
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
      improvementSuggestion: improvementSuggestion.trim() || null,
    };

    const result = await addMarks(payload);
    if (!result.success) {
      setError(result.error || "Failed to save marks to server.");
      return;
    }

    const selectedSubjectObj = subjects.find(
      (sub) => String(sub.id ?? sub._id ?? sub.subjectId ?? sub.subjectCode) === String(selectedSubject)
    );
    const subjectLabel =
      selectedSubjectObj?.subjectName || selectedSubjectObj?.name || selectedSubjectObj?.subjectCode || selectedSubject;

    const updatedStudents = students.map((student) => {
      const studentId = String(student.id ?? student._id ?? student.studentId ?? "");
      if (studentId === String(selectedStudent)) {
        const newMark = {
          subject: subjectLabel,
          score: Number(marks),
          improvementSuggestion: Number(marks) < 50 ? improvementSuggestion : "",
        };
        student.marks = student.marks ? [...student.marks, newMark] : [newMark];
      }
      return student;
    });

    localStorage.setItem("students", JSON.stringify(updatedStudents));
    setStudents(updatedStudents);
    await fetchAllMarks();
    toast.success("Marks added successfully.");
    setSelectedStudent("");
    setSelectedSubject("");
    setMarks("");
    setImprovementSuggestion("");
  };


  const marksList = Array.isArray(allMarks) ? allMarks : [];
  const safeSubjectMarks = Array.isArray(subjectMarks) ? subjectMarks : [];

  return (
    <div className="container">
      <div className="page-grid">
        <div className="listing-card card">
          <h2>Student Marks</h2>
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover />
          {error && <div className="error-message">{error}</div>}
          {loading ? (
            <p>Loading marks...</p>
          ) : selectedSubject && safeSubjectMarks.length > 0 ? (
            <table className="list-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Faculty</th>
                  <th>Subject</th>
                  <th>Obtained</th>
                  <th>Max</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {safeSubjectMarks.map((m, idx) => (
                  <React.Fragment key={m.id ?? `subject-${idx}`}>
                    <tr>
                      <td>{m.studentName}</td>
                      <td>{m.facultyName || "--"}</td>
                      <td>{m.subjectName}</td>
                      <td>{m.obtainedMarks}</td>
                      <td>{m.maxMarks}</td>
                      <td style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        {m.id ? (
                          <button
                            type="button"
                            className="btn-danger"
                            style={{ padding: "0.35rem 0.75rem", fontSize: "0.9rem" }}
                            onClick={() => handleDeleteMark(m.id)}
                          >
                            Delete
                          </button>
                        ) : (
                          <span style={{ color: "#999" }}>N/A</span>
                        )}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          ) : selectedSubject ? (
            <p>No marks found for the selected subject.</p>
          ) : marksList.length > 0 ? (
            <table className="list-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Faculty</th>
                  <th>Subject</th>
                  <th>Obtained</th>
                  <th>Max</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {marksList.map((m, idx) => (
                  <React.Fragment key={m.id ?? `mark-${idx}`}>
                    <tr>
                      <td>{m.studentName}</td>
                      <td>{m.facultyName}</td>
                      <td>{m.subjectName}</td>
                      <td>{m.obtainedMarks}</td>
                      <td>{m.maxMarks}</td>
                      <td style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        {m.id ? (
                          <button
                            type="button"
                            className="btn-danger"
                            style={{ padding: "0.35rem 0.75rem", fontSize: "0.9rem" }}
                            onClick={() => handleDeleteMark(m.id)}
                          >
                            Delete
                          </button>
                        ) : (
                          <span style={{ color: "#999" }}>N/A</span>
                        )}
                      </td>
                    </tr>
                  </React.Fragment>
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
                onChange={(e) => {
                  const value = e.target.value;
                  setMarks(value);
                  if (value !== "" && Number(value) > 49) {
                    setImprovementSuggestion("");
                  }
                }}
                required
              />
            </div>

            {marks !== "" && Number(marks) <= 49 && (
              <div className="form-group">
                <label htmlFor="suggestion">Improvement Suggestion</label>
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