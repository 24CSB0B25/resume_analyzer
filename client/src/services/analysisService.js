import axios from "axios";

const API =
    "http://localhost:5001/api/resume";

export const getAnalysis =
    async (id) => {

    const response =
        await axios.get(
            `${API}/history/${id}`
        );

    return response.data;
};