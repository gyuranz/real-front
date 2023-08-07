import React, { memo, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { buttonStyle, reverseColor } from "../../components/Styles";
import { useRecoilState, useRecoilValue } from "recoil";
import { AuthLogin, CompleteStudy } from "../../atoms";
import axios from "axios";
import Overlay from "../Overlay";

const VideoButtonEnd = styled.button`
    ${buttonStyle}
    ${reverseColor}
    margin: 10px 0 10px 60px;
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
    const [isLoading, setIsLoading] = useState(false);
    const [completeStudy, setCompleteStudy] = useRecoilState(CompleteStudy);
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
        setIsLoading(true);
        studyFinished(userState.currentRoom.room_id, setCompleteStudy);
        setIsLoading(false);
    };
    console.log(window.location.origin);

    return (
        <>
            {isLoading && <Overlay />}
            {completeStudy || (
                <VideoButtonEnd onClick={handleRoomFinished}>
                    {isLoading ? "LOADING..." : "FINISH"}
                </VideoButtonEnd>
            )}
        </>
    );
};

export default memo(LeaveRoomButton);
