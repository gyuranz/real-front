import axios from "axios";

const serverApi = `${process.env.REACT_APP_BACKEND_URL}`;

export const getRoomExists = async (roomId) => {
    const response = await axios.get(`${serverApi}/room/${roomId}`);
    return response.data;
};

export const getTURNCredentials = async () => {
    const response = await axios.get(`${serverApi}/get-turn-credentials`);
    return response.data;
};
