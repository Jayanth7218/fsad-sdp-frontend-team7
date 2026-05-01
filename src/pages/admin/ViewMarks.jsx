import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getMarksByStudent } from "../../services/adminService";

const ViewMarks = () => {
  const [id, setId] = useState("");
  const [marks, setMarks] = useState([]);

  const fetchMarks = async () => {
    const data = await getMarksByStudent(id);
    setMarks(data || []);
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl mb-4">View Marks</h1>

      <input
        placeholder="Student ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="border p-2 mr-2"
      />

      <button
        onClick={fetchMarks}
        className="bg-blue-600 text-white px-4 py-2"
      >
        Fetch
      </button>

      <table className="w-full mt-4 bg-white">
        <tbody>
          {marks.map((m) => (
            <tr key={m.id}>
              <td>{m.subject.subjectName}</td>
              <td>{m.marksObtained}</td>
              <td>{m.feedback}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
};

export default ViewMarks;