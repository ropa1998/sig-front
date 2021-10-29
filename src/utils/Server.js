import axios from "axios";

const backendAxiosInstance = axios.create({
    // baseURL: "http://localhost:8080"
    baseURL: "https://sig-back.herokuapp.com/"
});

const pickerAxiosInstance = axios.create({
    // baseURL: "http://localhost:8081"
    baseURL: "https://sig-utils.herokuapp.com/"
});

backendAxiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token;
    console.log(token)
    return config;
}, function (error) {
    return Promise.reject(error);
});

// LOGIN
export const login = async (data) => await backendAxiosInstance.post("/login", data);

// REGISTER
export const register = async (data) => await backendAxiosInstance.post("/user", data);

export const createRack = async (data) => await backendAxiosInstance.post("/rack", data);
export const deleteRack = async (data) => await backendAxiosInstance.delete("/rack", data);
export const getRacks = async (data) => await backendAxiosInstance.get("/rack", data);

export const createPallet = async (data) => await backendAxiosInstance.post("/pallet", data);
export const createTransaction = async (data) => await backendAxiosInstance.put("/pallet", data);
export const getPallets = async () => await backendAxiosInstance.get("/pallet");
export const getActivePallets = async () => await backendAxiosInstance.get("/pallet/active");

export const getTransactions = async () => await backendAxiosInstance.get("/transaction");

export const getPickerData = async () => await pickerAxiosInstance.get("/picker");
export const getScaleData = async () => await pickerAxiosInstance.get("/scale");


// EDIT PROJECT BY ID
export const editProject = async (id, data) =>
    await backendAxiosInstance.put(`/project/${id}`, data);

// GET PROJECT BY ID
export const getProjectById = async (id) =>
    await backendAxiosInstance.get(`/project/${id}`);

// ADD NEW PROJECT
export const addProject = async (data) =>
    await backendAxiosInstance.post("/project", data);

// GET ALL PROJECTS
export const getAllProject = async () => await backendAxiosInstance.get("/project");

export const getMyProjects = async () =>
    await backendAxiosInstance.get("/project/my-projects");

// DELETE PROJECT BY ID
export const deleteProjectById = async (id) =>
    await backendAxiosInstance.delete(`/project/${id}`);

// RECOVER PASSWORD
export const recoverPassword = async (data) =>
    await backendAxiosInstance.post("/user/recover/request", data);

// RESET PASSWORD
export const resetPassword = async (data) =>
    await backendAxiosInstance.post("/user/recover", data);

// VERIFY EMAIL
export const verifyEmail = async (data) =>
    await backendAxiosInstance.post("/user/confirm", data);

// GET PROJECTS WITH FILTER
export const searchProjectByQuery = async (body) =>
    await backendAxiosInstance.post(`/project/search`, {
        ...body,
        ...{featured: false},
    });

// GET TAGS
export const getTags = async () => await backendAxiosInstance.get("/project/tags");

// GET LANGUAGES
export const getLanguages = async () =>
    await backendAxiosInstance.get("/project/languages");
export const getUserInfoById = async () => await backendAxiosInstance.get("/user");
export const getAvailableResources = async () => await backendAxiosInstance.get("/pallet/resources");
export const editUserInfo = async (data) =>
    await backendAxiosInstance.put("/user", data);
export const deleteUser = async () => await backendAxiosInstance.delete("/user");
export const getOtherUsersInfoById = async (id) =>
    await backendAxiosInstance.get(`/user/${id}`);
