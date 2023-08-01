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

const LeaveRoomButton = () => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
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
        if (storedData.token) {
            navigate(-1);
            // navigate(`/${storedData.userId}`);
        } else {
        }
        const siteUrl = window.location.origin;
        window.location.href = `${siteUrl}`;
    };
    console.log(window.location.origin);

    return (
        <VideoButtonEnd onClick={handleRoomDisconnection}>
            FINISH
        </VideoButtonEnd>
    );
};

export default LeaveRoomButton;
