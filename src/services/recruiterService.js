import api from "../services/api";


// Get recruiter profile
export const getRecruiterProfile = async () => {

    const response = await api.get(
        "/recruiter/profile"
    );

    return response.data;
};


// Update recruiter profile
export const updateRecruiterProfile = async (profileData) => {

    const response = await api.put(
        "/recruiter/profile",
        profileData
    );

    return response.data;
};