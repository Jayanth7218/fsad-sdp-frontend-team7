import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  addSubject,
  getSubjectsByFaculty,
  deleteSubject,
} from "../../services/facultyService";
import { useAuth } from "../../context/AuthContext";

const Subjects = () => {
  const { auth } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({ subjectName: "", subjectCode: "" });

  const load = async () => {
    const data = await getSubjectsByFaculty(auth.userId);
    setSubjects(data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async () => {
    await addSubject({ ...form, faculty: { id: auth.userId } });
    setForm({ subjectName: "", subjectCode: "" });
    load();
  };

  return (
    <DashboardLayout>
      <input
        placeholder="Name"
        value={form.subjectName}
        onChange={(e) =>
          setForm({ ...form, subjectName: e.target.value })
        }
      />
      <input
        placeholder="Code"
        value={form.subjectCode}
        onChange={(e) =>
          setForm({ ...form, subjectCode: e.target.value })
        }
      />
      <button onClick={handleAdd}>Add</button>

      {subjects.map((s) => (
        <div key={s.id}>
          {s.subjectName}
          <button onClick={() => deleteSubject(s.id)}>Delete</button>
        </div>
      ))}
    </DashboardLayout>
  );
};

export default Subjects;