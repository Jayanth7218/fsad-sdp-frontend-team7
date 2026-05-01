import API from "../api/api";

export const loginUser = async (username, password) => {
  const response = await API.post("/auth/login", {
    username,
    password,
  });

  const data = response.data;

  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);
  localStorage.setItem("userId", data.userId);
  localStorage.setItem("username", data.username);

  return data;
};

export const logoutUser = () => {
  localStorage.clear();
};

export const getAuthData = () => {
  return {
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
    userId: localStorage.getItem("userId"),
    username: localStorage.getItem("username"),
  };
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};