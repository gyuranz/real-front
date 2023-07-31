import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { buttonStyle, reverseColor } from "../../components/Styles";
import { useRecoilState } from "recoil";
import { AuthLogin } from "../../atoms";

const VideoButtonEnd = styled.button`
    ${buttonStyle}
    ${reverseColor}
    position: absolute;
    top: 0;
    right: 0;
    margin: 20px;
    padding: 10px;
    font-weight: 400;
    font-size: 16px;
    color: white;
    transition: 0.4s;
    &:hover {
        background-color: #ff7b00;
    }
`;

const LeaveRoomButton = () => {
    const navigate = useNavigate();
    const [userState, setUserState] = useRecoilState(AuthLogin);

    const handleRoomDisconnection = () => {
        setUserState({
            ...userState,
            currentRoom: {
                room_id: "",
                room_name: "",
                room_summary: "",
                room_password: "",
            },
        });
        const siteUrl = window.location.origin;
        window.location.href = `${siteUrl}`;
        // navigate(-1);
    };
    console.log(window.location.origin);

    return (
        <VideoButtonEnd onClick={handleRoomDisconnection}>
            FINISH
        </VideoButtonEnd>
    );
};

export default LeaveRoomButton;
