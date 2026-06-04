import axios from "axios";

const API =
    "http://localhost:5001/api/resume";

export const getHistory =
    async () => {

        const token =
            localStorage.getItem(
                "token"
            );

        const response =
            await axios.get(
                `${API}/history`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        return response.data;
    };