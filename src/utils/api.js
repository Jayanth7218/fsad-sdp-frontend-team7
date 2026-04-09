const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

async function handleResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  let body = null;

  if (contentType.includes("application/json")) {
    body = await response.json();
  } else {
    const text = await response.text();
    body = text ? text : null;
  }

  if (!response.ok) {
    const message = body?.message || body || response.statusText || "Server error";
    throw new Error(message);
  }

  return body;
}

export async function adminLogin(username, password) {
  const url = new URL(`${BASE_URL}/admin/login`);
  url.searchParams.append("username", username);
  url.searchParams.append("password", password);

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  });

  return handleResponse(response);
}

export async function facultyLogin(email, password) {
  const response = await fetch(`${BASE_URL}/faculty/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  return handleResponse(response);
}

export async function studentLogin(email, password) {
  const response = await fetch(`${BASE_URL}/student/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  return handleResponse(response);
}

export async function getAllFaculty() {
  const response = await fetch(`${BASE_URL}/admin/getAllFaculty`, {
    method: "GET"
  });
  return handleResponse(response);
}

export async function addFaculty(faculty) {
  const response = await fetch(`${BASE_URL}/admin/addFaculty`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(faculty)
  });
  return handleResponse(response);
}

export async function deleteFaculty(id) {
  const response = await fetch(`${BASE_URL}/admin/deleteFaculty/${id}`, {
    method: "DELETE"
  });
  return handleResponse(response);
}

export async function getAllStudents() {
  const response = await fetch(`${BASE_URL}/admin/getAllStudents`, {
    method: "GET"
  });
  return handleResponse(response);
}

export async function deleteStudent(id) {
  const response = await fetch(`${BASE_URL}/admin/deleteStudent/${id}`, {
    method: "DELETE"
  });
  return handleResponse(response);
}

export async function getStudentMarks(studentId) {
  const response = await fetch(`${BASE_URL}/student/getMarks/${studentId}`, {
    method: "GET"
  });
  return handleResponse(response);
}

export async function getStudentSubjects() {
  const response = await fetch(`${BASE_URL}/student/getAllSubjects`, {
    method: "GET"
  });
  return handleResponse(response);
}

export async function addSubjectForFaculty(subject) {
  const response = await fetch(`${BASE_URL}/faculty/addSubject`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(subject)
  });
  return handleResponse(response);
}

export async function getFacultySubjects(facultyId) {
  const response = await fetch(`${BASE_URL}/faculty/getSubjects/${facultyId}`, {
    method: "GET"
  });
  return handleResponse(response);
}

export async function deleteSubject(id) {
  const response = await fetch(`${BASE_URL}/faculty/deleteSubject/${id}`, {
    method: "DELETE"
  });
  return handleResponse(response);
}

export async function updateMarks(markId, marksObtained) {
  const url = new URL(`${BASE_URL}/faculty/updateMarks/${markId}`);
  url.searchParams.append("marksObtained", marksObtained);
  const response = await fetch(url.toString(), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    }
  });
  return handleResponse(response);
}

export default {
  adminLogin,
  facultyLogin,
  studentLogin,
  getAllFaculty,
  addFaculty,
  deleteFaculty,
  getAllStudents,
  deleteStudent,
  getStudentMarks,
  getStudentSubjects,
  addSubjectForFaculty,
  getFacultySubjects,
  deleteSubject,
  updateMarks
};
