import React from "react";
import { AuthLogin } from "../atoms";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { buttonStyle, inputVariants, mainBgColor } from "../components/Styles";
import { styled } from "styled-components";
import { motion } from "framer-motion/dist/framer-motion";
const RoomJoinInput = styled(motion.input)`
    ${buttonStyle}
    max-width: 400px;
    margin-bottom: 10px;
    font-size: 1rem;
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

const LoginWarning = styled.span`
    color: red;
    font-size: 14px;
`;

function Create() {
    const navigate = useNavigate();
    const [userState, setUserState] = useRecoilState(AuthLogin);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

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
        } catch (err) {
            console.log(err);
        }
    };
    console.log(userState.userJoinedRoomList, "create");
    return (
        <>
            {/* <div>hello, {userState.userNickname}</div>
            <div>{userState.userJoinedRoomList}</div> */}
            <form
                onSubmit={handleSubmit(onValid)}
                style={{
                    height: "60vh",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <RoomJoinInput
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

                <RoomJoinInput
                    type="password"
                    variants={inputVariants}
                    {...register("room_password")}
                    placeholder="PASSWORD: not required"
                />
                <LoginWarning>{errors?.room_password?.message}</LoginWarning>

                <RoomJoinButton variants={inputVariants}>CREATE</RoomJoinButton>
                {/* <LoginWarning>{loginError}</LoginWarning> */}
            </form>
        </>
    );
}

export default Create;
