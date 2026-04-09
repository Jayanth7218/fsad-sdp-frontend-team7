import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { addSubject, deleteSubject, getSubjectsByFaculty, getAllSubjects } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/forms.css";

function Subjects() {
  const { user } = useContext(AppContext);
  const [subjects, setSubjects] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSubjects();
  }, [user]);

  const loadSubjects = async () => {
    setLoading(true);
    setError("");

    let result;
    if (user?.userType === "lecturer" && user?.id) {
      result = await getSubjectsByFaculty(user.id);
      if (!result.success) {
        result = await getAllSubjects();
      }
    } else {
      result = await getAllSubjects();
    }

    if (result.success && Array.isArray(result.data)) {
      setSubjects(result.data);
    } else {
      const stored = JSON.parse(localStorage.getItem("subjects")) || [];
      setSubjects(stored);
      if (!result.success && stored.length === 0) {
        setError(result.error || "Unable to load subjects.");
      }
    }

    setLoading(false);
  };

  const handleDeleteSubject = async (subjectId) => {
    if (!window.confirm("Are you sure you want to delete this subject?")) {
      return;
    }

    setLoading(true);
    const result = await deleteSubject(subjectId);
    setLoading(false);

    if (!result.success) {
      toast.error(result.error || "Unable to delete subject.");
      return;
    }

    setSubjects((prev) =>
      prev.filter(
        (sub) => String(sub.id ?? sub._id ?? sub.subjectId ?? sub.subjectCode) !== String(subjectId)
      )
    );
    toast.success(result.message || "Subject deleted successfully.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!subjectName.trim() || !subjectCode.trim()) {
      setError("Please provide both subject name and code.");
      return;
    }

    const facultyId = user?.id ?? user?._id;
    if (!facultyId) {
      setError("Faculty must be logged in to add a subject.");
      return;
    }

    const payload = {
      subjectName: subjectName.trim(),
      subjectCode: subjectCode.trim(),
      faculty: {
        id: Number(facultyId) || facultyId,
      },
    };

    setLoading(true);
    const result = await addSubject(payload);
    setLoading(false);

    if (!result.success) {
      setError(result.error || "Failed to add subject.");
      return;
    }

    const newSubject = result.data || payload;
    setSubjects((prev) => [...prev, newSubject]);
    setSubjectName("");
    setSubjectCode("");
    setSuccessMessage("Subject added successfully.");
  };

  return (
    <div className="container">
      <div className="page-grid">
        <div className="listing-card card">
          <h2>Subjects</h2>
          {subjects.length > 0 ? (
            <ul className="list-simple">
              {subjects.map((sub, i) => {
                const subjectId = sub.id ?? sub._id ?? sub.subjectId ?? sub.subjectCode ?? i;
                const label =
                  typeof sub === "string"
                    ? sub
                    : `${sub.subjectName || sub.name || "Untitled"}${sub.subjectCode ? ` (${sub.subjectCode})` : ""}`;
                return (
                  <li key={subjectId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{label}</span>
                    <button
                      type="button"
                      className="btn-danger"
                      style={{ padding: "0.4rem 0.8rem", fontSize: "0.9rem" }}
                      onClick={() => handleDeleteSubject(subjectId)}
                    >
                      Delete
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No subjects added yet.</p>
          )}
        </div>
        <div className="form-wrapper card" style={{ maxWidth: "500px" }}>
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover />
          <h2 className="form-title">📚 Add Subject</h2>
          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="subjectName">Subject Name</label>
              <input
                id="subjectName"
                type="text"
                placeholder="Enter subject name"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subjectCode">Subject Code</label>
              <input
                id="subjectCode"
                type="text"
                placeholder="Enter subject code"
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-primary form-submit" disabled={loading}>
              {loading ? "Saving..." : "Add Subject"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Subjects;