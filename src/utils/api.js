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
    console.log(room_id, file, "💪");
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

export const postQuestion = async (room_id, question) => {
    try {
        const response = await axios.post(
            `${serverApi}/room/${room_id}/question`,
            {
                uesr_request: question.message,
            }
        );
        return response;
    } catch (e) {
        console.log(e);
        alert(`${e} 발생, 질문하지 못했습니다.`);
    }
};

export const getQuiz = async (roomId) => {
    const response = await axios.get(`${serverApi}/room/${roomId}/quiz`);
    console.log(response, "😅");
    return response;
};
