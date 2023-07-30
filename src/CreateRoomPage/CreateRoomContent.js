import React, { useState } from "react";
import CreateRoomInputs from "./CreateRoomInputs";
import { connect } from "react-redux";
import OnlyWithAudioCheckbox from "../JoinRoomPage/OnlyWithAudioCheckbox";
import {
    setConnectOnlyWithAudio,
    setIdentity,
    setRoomId,
} from "../store/actions";
import ErrorMessage from "../JoinRoomPage/ErrorMessage";

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

const RoomCreateButton = styled(motion.button)`
    ${buttonStyle}
    ${mainBgColor}
    width: 90%;
    max-width: 400px;
    font-size: 1rem;
    cursor: pointer;
    color: white;
`;

const CreateRoomContent = (props) => {
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

    const handleCreateRoom = async () => {
        setIdentityAction(nameValue);
        //! 이렇게 받아와야 되는데, 서버에서 생성해서 보내주는 걸로 받아야 할듯. post 사용
        // navigate(`/room/${roomIdValue}`);
        navigate(`/room`);
    };

    return (
        <Container>
            <CreateRoomInputs
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
            <RoomCreateButton onClick={handleCreateRoom}>
                CREATE
            </RoomCreateButton>
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
)(CreateRoomContent);
