import React, { useEffect, useState } from "react";
// import CreateRoomInputs from "./CreateRoomInputs";
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
import { buttonStyle, inputVariants, mainBgColor } from "../components/Styles";
import { useRecoilState } from "recoil";
import { AuthLogin } from "../atoms";
import { useForm } from "react-hook-form";

const Container = styled.div`
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const CreateForm = styled.form`
    height: "60vh";
    justify-content: "center";
    display: "flex";
    flex-direction: "column";
    align-items: "center";
    width: 90%;
`;

const RoomCreateButton = styled(motion.button)`
    ${buttonStyle}
    ${mainBgColor}
    width: 100%;
    max-width: 400px;
    font-size: 1rem;
    cursor: pointer;
    color: white;
`;
const RoomCreateInput = styled(motion.input)`
    ${buttonStyle}
    max-width: 400px;
    margin-bottom: 10px;
    font-size: 1rem;
    width: 100%;
`;

const LoginWarning = styled.span`
    color: red;
    font-size: 14px;
`;

const CreateRoomContent = (props) => {
    const {
        isRoomHost,
        setConnectOnlyWithAudio,
        connectOnlyWithAudio,
        setIdentityAction,
        setRoomIdAction,
    } = props;

    const [nameValue, setNameValue] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const [userState, setUserState] = useRecoilState(AuthLogin);

    const handleNameValueChange = (event) => {
        setNameValue(event.target.value);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();
    console.log();

    const navigate = useNavigate();

    const onValid = async (room) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/${userState.userId}/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: " Bearer " + userState.token,
                    },
                    body: JSON.stringify({
                        room_name: room.room_name,
                        room_password: room.room_password,
                    }),
                }
            );
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message);
            }
            const { room_id, room_name, room_summary, room_password } =
                responseData;
            setUserState({
                ...userState,
                currentRoom: {
                    room_id,
                    room_name,
                    room_summary,
                    room_password,
                },
            });

            navigate(`/room/${room_id}`);
            // navigate(`/room`);
        } catch (err) {
            console.log(err);
        }
    };
    console.log(userState.userJoinedRoomList, "create");

    return (
        <Container>
            {/* <RoomCreateInput
                placeholder="Enter Room Name"
                value={roomNameValue}
                onChange={handleRoomName}
            />
            <RoomCreateInput
                placeholder="Enter your nickName"
                value={nameValue}
                onChange={handleNameValueChange}
            />
            
            <RoomCreateButton onClick={handleCreateRoom}>
            CREATE
        </RoomCreateButton> */}

            <CreateForm onSubmit={handleSubmit(onValid)}>
                <RoomCreateInput
                    type="text"
                    variants={inputVariants}
                    {...register("room_name", {
                        required: "Room Name is required",
                        minLength: {
                            value: 2,
                            message: "please write at least 2 characters",
                        },
                    })}
                    placeholder="ROOM NAME"
                />
                <LoginWarning>{errors?.room_name?.message}</LoginWarning>

                <RoomCreateInput
                    type="text"
                    variants={inputVariants}
                    {...register("room_password")}
                    placeholder="닉네임"
                />
                <LoginWarning>{errors?.room_password?.message}</LoginWarning>
                <ErrorMessage errorMessage={errorMessage} />
                <OnlyWithAudioCheckbox
                    setConnectOnlyWithAudio={setConnectOnlyWithAudio}
                    connectOnlyWithAudio={connectOnlyWithAudio}
                />
                <RoomCreateButton variants={inputVariants}>
                    CREATE
                </RoomCreateButton>
            </CreateForm>
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
