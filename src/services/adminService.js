import API from "../api/api";

export const getAllFaculty = async () => {
  const res = await API.get("/admin/getAllFaculty");
  return res.data;
};

export const addFaculty = async (faculty) => {
  const res = await API.post("/admin/addFaculty", faculty);
  return res.data;
};

export const deleteFaculty = async (id) => {
  const res = await API.delete(`/admin/deleteFaculty/${id}`);
  return res.data;
};

export const getAllStudents = async () => {
  const res = await API.get("/admin/getAllStudents");
  return res.data;
};

export const deleteStudent = async (id) => {
  const res = await API.delete(`/admin/deleteStudent/${id}`);
  return res.data;
};

export const getMarksByStudent = async (studentId) => {
  const res = await API.get(`/admin/getMarksByStudent/${studentId}`);
  return res.data;
};