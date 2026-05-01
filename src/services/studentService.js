import API from "../api/api";

export const registerStudent = async (student) => {
  const res = await API.post("/student/register", student);
  return res.data;
};

export const getAllSubjects = async () => {
  const res = await API.get("/student/getAllSubjects");
  return res.data;
};

export const getMarksByStudent = async (studentId) => {
  const res = await API.get(`/student/getMarks/${studentId}`);
  return res.data;
};