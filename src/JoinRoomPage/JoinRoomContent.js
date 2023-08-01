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

const JoinForm = styled.form`
    height: "60vh";
    text-align: center;
    width: 90%;
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
const RoomJoinInput = styled(motion.input)`
    ${buttonStyle}
    max-width: 400px;
    margin-bottom: 10px;
    font-size: 1rem;
    width: 90%;
`;
const LoginWarning = styled.span`
    color: red;
    font-size: 14px;
`;

const JoinRoomContent = (props) => {
    const {
        setIdentityAction,
        setRoomIdAction,
        setConnectOnlyWithAudio,
        connectOnlyWithAudio,
    } = props;

    const [userState, setUserState] = useRecoilState(AuthLogin);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const navigate = useNavigate();

    // const handleJoinRoom = async () => {
    //     setIdentityAction(nameValue);

    //     await joinRoom();
    // };

    // const joinRoom = async () => {
    //     const responseMessage = await getRoomExists(roomIdValue);
    //     console.log(roomIdValue);

    //     const { roomExists, full } = responseMessage;

    //     if (roomExists) {
    //         if (full) {
    //             setErrorMessage("Meeting is full. Please try again later.");
    //         } else {
    //             // join a room !
    //             setRoomIdAction(roomIdValue);
    //             //! Create에서 roomId 먼저 해결하고 시작
    //             // navigate(`/room/${roomIdValue}`);
    //             navigate(`/room/${roomId}`);
    //         }
    //     } else {
    //         setErrorMessage("Meeting not found. Check your meeting id.");
    //     }
    // };
    const onValid = async (room) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/${userState.userId}/join`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: " Bearer " + userState.token,
                    },
                    body: JSON.stringify({
                        room_id: room.room_id,
                        room_password: room.room_password,
                    }),
                }
            );
            const responseData = await response.json();

            setRoomIdAction(responseData.room_id);
            setIdentityAction(userState.userId);
            if (!response.ok) {
                throw new Error(responseData.message);
            }

            setUserState({
                ...userState,
                currentRoom: {
                    room_id: responseData.room_id,
                    room_name: responseData.room_name,
                    room_summary: responseData.room_summary,
                    room_password: responseData.room_password,
                },
            });

            navigate(`/room/${responseData.room_id}`);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container>
            <JoinForm onSubmit={handleSubmit(onValid)}>
                <RoomJoinInput
                    type="text"
                    variants={inputVariants}
                    {...register("room_id", {
                        required: "ROOM ID is required",
                        minLength: {
                            value: 6,
                            message: "please write at least 6 numbers",
                        },
                    })}
                    placeholder="ROOM ID"
                />
                <LoginWarning>{errors?.room_id?.message}</LoginWarning>

                <RoomJoinInput
                    type="text"
                    variants={inputVariants}
                    {...register("room_password")}
                    placeholder="PASSWORD: NOT required"
                />
                <LoginWarning>{errors?.room_password?.message}</LoginWarning>
                <OnlyWithAudioCheckbox
                    setConnectOnlyWithAudio={setConnectOnlyWithAudio}
                    connectOnlyWithAudio={connectOnlyWithAudio}
                />
                <RoomJoinButton variants={inputVariants}>JOIN</RoomJoinButton>
            </JoinForm>
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
