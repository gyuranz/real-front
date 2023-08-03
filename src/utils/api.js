import axios from "axios";

const serverApi = `${process.env.REACT_APP_BACKEND_URL}`;

export const getRoomExists = async (roomId) => {
    try {
        const response = await axios.get(`${serverApi}/room/api/${roomId}`);
        return response.data;
    } catch (error) {
        console.log("❌", error);
    }
};

export const getTURNCredentials = async () => {
    try {
        const response = await axios.get(`${serverApi}/get-turn-credentials`);
        console.log("✅", response.data);
        return response.data;
    } catch (error) {
        console.log("❌", error);
    }
};

export const postScreenShot = async (room_id, file) => {
    // console.log(room_id, file, "💪");
    try {
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
        console.log("✅", response.data);
        return response.data;
    } catch (error) {
        console.log("❌", error);
    }
};

export const postQuestion = async (room_id, question) => {
    console.log(question);
    const user_request = {
        user_request: question,
    };
    console.log(user_request);
    try {
        const response = await axios.post(
            `${serverApi}/room/${room_id}/question`,
            user_request
        );
        return response;
    } catch (error) {
        console.log("❌", error);
        alert(`${error} 발생, 질문하지 못했습니다.`);
    }
};

export const getQuiz = async (roomId) => {
    try {
        const response = await axios.get(`${serverApi}/room/${roomId}/quiz`);
        console.log(response, "😅");
        return response;
    } catch (error) {
        console.log("❌", error);
    }
};
