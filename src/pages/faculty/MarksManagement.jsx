import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  getAllStudents,
  getAllSubjects,
  addMarks,
} from "../../services/facultyService";

const MarksManagement = () => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [form, setForm] = useState({
    subjectId: "",
    marks: "",
    feedback: "",
  });

  useEffect(() => {
    getAllStudents().then(setStudents);
    getAllSubjects().then(setSubjects);
  }, []);

  const handleSubmit = async () => {
    if (!selectedStudent) return;

    await addMarks({
      student: { id: selectedStudent.id },
      subject: { id: form.subjectId },
      marksObtained: form.marks,
      feedback: form.feedback,
    });

    alert("Marks added!");
  };

  return (
    <DashboardLayout>
      <h1 className="title">📝 Marks Management</h1>

      {/* STUDENT TABLE */}
      <div className="card mb-6">
        <h2 className="font-semibold mb-4">Select Student</h2>

        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th>Name</th>
              <th>Email</th>
              <th>Select</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-b">
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>
                  <button
                    onClick={() => setSelectedStudent(s)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FORM */}
      {selectedStudent && (
        <div className="card">
          <h2 className="mb-3">
            Adding marks for:{" "}
            <span className="font-bold">{selectedStudent.name}</span>
          </h2>

          <select
            onChange={(e) =>
              setForm({ ...form, subjectId: e.target.value })
            }
            className="border p-2 mb-3 w-full"
          >
            <option>Select Subject</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.subjectName}
              </option>
            ))}
          </select>

          <input
            placeholder="Marks"
            className="border p-2 mb-3 w-full"
            onChange={(e) =>
              setForm({ ...form, marks: e.target.value })
            }
          />

          <input
            placeholder="Feedback"
            className="border p-2 mb-3 w-full"
            onChange={(e) =>
              setForm({ ...form, feedback: e.target.value })
            }
          />

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      )}
    </DashboardLayout>
  );
};

export default MarksManagement;