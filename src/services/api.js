const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:2929";

const extractArray = (value) => {
  if (Array.isArray(value)) return value;
  if (!value || typeof value !== "object") return [];
  const keys = ["data", "students", "subjects", "marks", "result", "payload"];
  for (const key of keys) {
    if (Array.isArray(value[key])) return value[key];
  }
  return [];
};

// Admin authentication
export const adminLogin = async (username, password) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/admin/login?username=${username}&password=${password}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Admin login failed: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, user: data };
  } catch (error) {
    console.error("Admin login error:", error);
    return { success: false, error: error.message };
  }
};

// Faculty authentication
export const facultyLogin = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/faculty/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Faculty login failed: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, user: data };
  } catch (error) {
    console.error("Faculty login error:", error);
    return { success: false, error: error.message };
  }
};

// Student authentication
export const studentLogin = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/student/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Student login failed: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, user: data };
  } catch (error) {
    console.error("Student login error:", error);
    return { success: false, error: error.message };
  }
};

// Admin Faculty Management
export const addFaculty = async (facultyData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/addFaculty`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(facultyData),
    });

    if (!response.ok) {
      throw new Error(`Failed to add faculty: ${response.statusText}`);
    }

    return { success: true, message: "Faculty added successfully" };
  } catch (error) {
    console.error("Add faculty error:", error);
    return { success: false, error: error.message };
  }
};

export const getAllFaculty = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/getAllFaculty`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch faculty: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Get all faculty error:", error);
    return { success: false, error: error.message };
  }
};

export const deleteFaculty = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/deleteFaculty/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete faculty: ${response.statusText}`);
    }

    return { success: true, message: "Faculty deleted successfully" };
  } catch (error) {
    console.error("Delete faculty error:", error);
    return { success: false, error: error.message };
  }
};

// Admin Student Management
export const getAllStudents = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/getAllStudents`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch students: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, data: extractArray(data).length ? extractArray(data) : data };
  } catch (error) {
    console.error("Get all students error:", error);
    return { success: false, error: error.message };
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/deleteStudent/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete student: ${response.statusText}`);
    }

    return { success: true, message: "Student deleted successfully" };
  } catch (error) {
    console.error("Delete student error:", error);
    return { success: false, error: error.message };
  }
};

// Faculty Subject Management
export const addSubject = async (subjectData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/faculty/addSubject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subjectData),
    });

    if (!response.ok) {
      throw new Error(`Failed to add subject: ${response.statusText}`);
    }

    return { success: true, message: "Subject added successfully" };
  } catch (error) {
    console.error("Add subject error:", error);
    return { success: false, error: error.message };
  }
};

export const getSubjectsByFaculty = async (facultyId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/faculty/getSubjects/${facultyId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch subjects: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, data: extractArray(data).length ? extractArray(data) : data };
  } catch (error) {
    console.error("Get subjects error:", error);
    return { success: false, error: error.message };
  }
};

export const deleteSubject = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/faculty/deleteSubject/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete subject: ${response.statusText} ${errorText}`);
    }

    return { success: true, message: "Subject deleted successfully" };
  } catch (error) {
    console.error("Delete subject error:", error);
    return { success: false, error: error.message };
  }
};

export const deleteMarks = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/faculty/deleteMarks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete marks: ${response.statusText} ${errorText}`);
    }

    return { success: true, message: "Marks deleted successfully" };
  } catch (error) {
    console.error("Delete marks error:", error);
    return { success: false, error: error.message };
  }
};

// Marks Management
export const updateMarks = async (id, marksObtained) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/faculty/updateMarks/${id}?marksObtained=${marksObtained}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update marks: ${response.statusText}`);
    }

    return { success: true, message: "Marks updated successfully" };
  } catch (error) {
    console.error("Update marks error:", error);
    return { success: false, error: error.message };
  }
};

export const addMarks = async (payload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/faculty/addMarks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to add marks: ${response.statusText} ${errorText}`);
    }

    let data = null;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    }

    return { success: true, data };
  } catch (error) {
    console.error("Add marks error:", error);
    return { success: false, error: error.message };
  }
};

export const getMarksBySubject = async (subjectId) => {
  try {
    const encodedSubjectId = encodeURIComponent(String(subjectId));
    const response = await fetch(`${API_BASE_URL}/faculty/getMarksBySubject/${encodedSubjectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 204) {
      return { success: true, data: [] };
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch marks: ${response.status} ${response.statusText} ${errorText}`);
    }

    const data = await response.json();
    return { success: true, data: extractArray(data).length ? extractArray(data) : data };
  } catch (error) {
    console.error("Get marks error:", error);
    return { success: false, error: error.message };
  }
};

export const getAllMarks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/faculty/getAllMarks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 204) {
      return { success: true, data: [] };
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch marks: ${response.status} ${response.statusText} ${errorText}`);
    }

    const data = await response.json();
    return { success: true, data: extractArray(data).length ? extractArray(data) : data };
  } catch (error) {
    console.error("Get all marks error:", error);
    return { success: false, error: error.message };
  }
};

// Student endpoints
export const getAllSubjects = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/student/getAllSubjects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 204) {
      return { success: true, data: [] };
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch subjects: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, data: extractArray(data).length ? extractArray(data) : data };
  } catch (error) {
    console.error("Get all subjects error:", error);
    return { success: false, error: error.message };
  }
};

export const getStudentMarks = async (studentId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/student/getMarks/${studentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch marks: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Get student marks error:", error);
    return { success: false, error: error.message };
  }
};

// Student signup
export const studentSignup = async (studentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/student/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    });

    if (response.status !== 201) {
      const errorText = await response.text();
      throw new Error(`Student signup failed: ${response.status} ${response.statusText} ${errorText}`);
    }

    let data = null;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    }

    return { success: true, user: data || null };
  } catch (error) {
    console.error("Student signup error:", error);
    return { success: false, error: error.message };
  }
};
