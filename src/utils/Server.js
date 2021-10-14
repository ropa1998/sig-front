import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    ...(localStorage.getItem("token") && {
        headers: {Authorization: `${localStorage.getItem("token")}`},
    }),
});

// LOGIN
export const login = async (data) => await axiosInstance.post("/login", data);

// REGISTER
export const register = async (data) => await axiosInstance.post("/user", data);

export const createRack = async (data) => await axiosInstance.post("/rack", data);
export const deleteRack = async (data) => await axiosInstance.delete("/rack", data);
export const getRacks = async (data) => await axiosInstance.get("/rack", data);

// EDIT PROJECT BY ID
export const editProject = async (id, data) =>
    await axiosInstance.put(`/project/${id}`, data);

// GET PROJECT BY ID
export const getProjectById = async (id) =>
    await axiosInstance.get(`/project/${id}`);

// ADD NEW PROJECT
export const addProject = async (data) =>
    await axiosInstance.post("/project", data);

// GET ALL PROJECTS
export const getAllProject = async () => await axiosInstance.get("/project");

export const getMyProjects = async () =>
    await axiosInstance.get("/project/my-projects");

// DELETE PROJECT BY ID
export const deleteProjectById = async (id) =>
    await axiosInstance.delete(`/project/${id}`);

// RECOVER PASSWORD
export const recoverPassword = async (data) =>
    await axiosInstance.post("/user/recover/request", data);

// RESET PASSWORD
export const resetPassword = async (data) =>
    await axiosInstance.post("/user/recover", data);

// VERIFY EMAIL
export const verifyEmail = async (data) =>
    await axiosInstance.post("/user/confirm", data);

// GET PROJECTS WITH FILTER
export const searchProjectByQuery = async (body) =>
    await axiosInstance.post(`/project/search`, {
        ...body,
        ...{featured: false},
    });

// GET TAGS
export const getTags = async () => await axiosInstance.get("/project/tags");

// GET LANGUAGES
export const getLanguages = async () =>
    await axiosInstance.get("/project/languages");
export const getUserInfoById = async () => await axiosInstance.get("/user");
export const editUserInfo = async (data) =>
    await axiosInstance.put("/user", data);
export const deleteUser = async () => await axiosInstance.delete("/user");
export const getOtherUsersInfoById = async (id) =>
    await axiosInstance.get(`/user/${id}`);
