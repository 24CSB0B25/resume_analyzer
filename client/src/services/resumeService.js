import axios from "axios";

const API =
    "http://localhost:5001/api/resume";

export const analyzeResume =
    async (formData) => {

        const token =
            localStorage.getItem(
                "token"
            );

        const response =
            await axios.post(
                `${API}/analyze`,
                formData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );

        return response.data;
    };