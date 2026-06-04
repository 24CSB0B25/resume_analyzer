import axios from "axios";

const API =
  "http://localhost:5001/api/resume";

export const analyzeResume = async (
    formData
    ) => {
    const response = await axios.post(
        `${API}/analyze`,
        formData,
        {
        headers: {
            "Content-Type":
            "multipart/form-data",
        },
        }
    );

    return response.data;
    };

export const getHistory =
    async () => {
        const response =
        await axios.get(
            `${API}/history`
        );

        return response.data;
    };