import React, { memo } from "react";
// import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { buttonStyle, reverseColor } from "../../components/Styles";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AuthLogin, CompleteStudy } from "../../atoms";
import axios from "axios";

const VideoButtonEnd = styled.button`
    ${buttonStyle}
    ${reverseColor}
    position: absolute;
    top: -5px;
    right: 0;
    margin: 10px 10px 0 0;
    padding: 10px;
    font-weight: 400;
    font-size: 16px;
    color: white;
    transition: 0.4s;
    cursor: pointer;
    &:hover {
        background-color: #ff7b00;
    }
`;

const studyFinished = async (room_id, setCompleteStudy) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/room/${room_id}/finished`
        );
        console.log(response.data);
        setCompleteStudy(true);
        return response.data;
    } catch (error) {
        alert(`스터디 종료 중 ${error} 문제가 발생했습니다.`);
    }
};

const LeaveRoomButton = () => {
    const setCompleteStudy = useSetRecoilState(CompleteStudy);
    // const storedData = JSON.parse(localStorage.getItem("userData"));
    // const navigate = useNavigate();
    const userState = useRecoilValue(AuthLogin);

    const handleRoomFinished = (event) => {
        // setUserState({
        //     ...userState,
        //     currentRoom: {
        //         room_id: "",
        //         room_name: "",
        //         room_summary: "",
        //         room_password: "",
        //     },
        // });
        // if (storedData.token) {
        //     navigate(-1);
        //     // navigate(`/${storedData.userId}`);
        // } else {
        //     const siteUrl = window.location.origin;
        //     window.location.href = `${siteUrl}`;
        // }

        studyFinished(userState.currentRoom.room_id, setCompleteStudy);
    };
    console.log(window.location.origin);

    return <VideoButtonEnd onClick={handleRoomFinished}>FINISH</VideoButtonEnd>;
};

export default memo(LeaveRoomButton);
