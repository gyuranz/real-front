import axios from "axios";

const serverApi = `${process.env.REACT_APP_BACKEND_URL}`;

export const getRoomExists = async (roomId) => {
    const response = await axios.get(`${serverApi}/room/api/${roomId}`);
    return response.data;
};

export const getTURNCredentials = async () => {
    const response = await axios.get(`${serverApi}/get-turn-credentials`);
    console.log(response.data);
    return response.data;
};

export const postScreenShot = async (room_id, file) => {
    const response = await axios.post(
        `${serverApi}/room/${room_id}/upload`,
        file,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                charset: "utf-8",
            },
        }
    );
    console.log(response.data);
    return response.data;
};
