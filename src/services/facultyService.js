import API from "../api/api";

export const getAllStudents = async () => {
  const res = await API.get("/faculty/getAllStudents");
  return res.data;
};

export const deleteStudent = async (id) => {
  const res = await API.delete(`/faculty/deleteStudent/${id}`);
  return res.data;
};

export const addFaculty = async (faculty) => {
  const res = await API.post("/faculty/addFaculty", faculty);
  return res.data;
};

export const getAllFaculty = async () => {
  const res = await API.get("/faculty/getAllFaculty");
  return res.data;
};

export const deleteFaculty = async (id) => {
  const res = await API.delete(`/faculty/deleteFaculty/${id}`);
  return res.data;
};

export const addSubject = async (subject) => {
  const res = await API.post("/faculty/addSubject", subject);
  return res.data;
};

export const getSubjectsByFaculty = async (facultyId) => {
  const res = await API.get(`/faculty/getSubjects/${facultyId}`);
  return res.data;
};

export const getAllSubjects = async () => {
  const res = await API.get("/faculty/getAllSubjects");
  return res.data;
};

export const deleteSubject = async (id) => {
  const res = await API.delete(`/faculty/deleteSubject/${id}`);
  return res.data;
};

export const addMarks = async (marks) => {
  const res = await API.post("/faculty/addMarks", marks);
  return res.data;
};

export const updateMarks = async (id, marksObtained) => {
  const res = await API.put(
    `/faculty/updateMarks/${id}?marksObtained=${marksObtained}`
  );
  return res.data;
};

export const getMarksBySubject = async (subjectId) => {
  const res = await API.get(`/faculty/getMarksBySubject/${subjectId}`);
  return res.data;
};

export const getAllMarks = async () => {
  const res = await API.get("/faculty/getAllMarks");
  return res.data;
};

export const deleteMarks = async (id) => {
  const res = await API.delete(`/faculty/deleteMarks/${id}`);
  return res.data;
};