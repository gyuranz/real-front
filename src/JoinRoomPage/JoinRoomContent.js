import React, { useState } from "react";
import JoinRoomInputs from "./JoinRoomInputs";
import { connect } from "react-redux";
import OnlyWithAudioCheckbox from "./OnlyWithAudioCheckbox";
import {
    setConnectOnlyWithAudio,
    setIdentity,
    setRoomId,
} from "../store/actions";
import ErrorMessage from "./ErrorMessage";
import { useNavigate } from "react-router-dom";
import { getRoomExists } from "../utils/api";
import { styled } from "styled-components";
import { motion } from "framer-motion/dist/framer-motion";
import { buttonStyle, mainBgColor } from "../components/Styles";

const Container = styled.div`
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const RoomJoinButton = styled(motion.button)`
    ${buttonStyle}
    ${mainBgColor}
    width: 90%;
    max-width: 400px;
    font-size: 1rem;
    cursor: pointer;
    color: white;
`;

const JoinRoomContent = (props) => {
    const {
        isRoomHost,
        setConnectOnlyWithAudio,
        connectOnlyWithAudio,
        setIdentityAction,
        setRoomIdAction,
    } = props;

    const [roomIdValue, setRoomIdValue] = useState("");
    const [nameValue, setNameValue] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const handleJoinRoom = async () => {
        setIdentityAction(nameValue);
        if (isRoomHost) {
            createRoom();
        } else {
            await joinRoom();
        }
    };

    const joinRoom = async () => {
        const responseMessage = await getRoomExists(roomIdValue);

        const { roomExists, full } = responseMessage;

        if (roomExists) {
            if (full) {
                setErrorMessage("Meeting is full. Please try again later.");
            } else {
                // join a room !
                setRoomIdAction(roomIdValue);
                //! Create에서 roomId 먼저 해결하고 시작
                // navigate(`/room/${roomIdValue}`);
                navigate("/room");
            }
        } else {
            setErrorMessage("Meeting not found. Check your meeting id.");
        }
    };

    const createRoom = () => {
        navigate(`/room/${roomIdValue}`);
    };

    return (
        <Container>
            <JoinRoomInputs
                roomIdValue={roomIdValue}
                setRoomIdValue={setRoomIdValue}
                nameValue={nameValue}
                setNameValue={setNameValue}
                isRoomHost={isRoomHost}
            />
            <OnlyWithAudioCheckbox
                setConnectOnlyWithAudio={setConnectOnlyWithAudio}
                connectOnlyWithAudio={connectOnlyWithAudio}
            />
            <ErrorMessage errorMessage={errorMessage} />
            <RoomJoinButton onClick={handleJoinRoom}>JOIN</RoomJoinButton>
        </Container>
    );
};

const mapStoreStateToProps = (state) => {
    return {
        ...state,
    };
};

const mapActionsToProps = (dispatch) => {
    return {
        setConnectOnlyWithAudio: (onlyWithAudio) =>
            dispatch(setConnectOnlyWithAudio(onlyWithAudio)),
        setIdentityAction: (identity) => dispatch(setIdentity(identity)),
        setRoomIdAction: (roomId) => dispatch(setRoomId(roomId)),
    };
};

export default connect(
    mapStoreStateToProps,
    mapActionsToProps
)(JoinRoomContent);
