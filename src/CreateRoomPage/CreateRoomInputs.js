import React, { useEffect, useState } from "react";

import { styled } from "styled-components";
import { motion } from "framer-motion/dist/framer-motion";
import { buttonStyle, mainBgColor } from "../components/Styles";
import { AuthLogin } from "../atoms";
import { useRecoilState } from "recoil";

const RoomCreateInput = styled(motion.input)`
    ${buttonStyle}
    max-width: 400px;
    margin-bottom: 10px;
    font-size: 1rem;
    width: 90%;
`;

const CreateRoomInputs = (props) => {
    const { nameValue, setNameValue } = props;
    const [roomNameValue, setRoomNameValue] = useState("");
    const [userState, setUserState] = useRecoilState(AuthLogin);

    const handleNameValueChange = (event) => {
        setNameValue(event.target.value);
    };
    const handleRoomName = (event) => {
        setRoomNameValue(event.target.value);
    };
    // useEffect(() => {
    //     setUserState({
    //         ...userState,
    //         currentRoom: {
    //             ...userState.currentRoom,
    //             room_name: roomNameValue,
    //         },
    //     });
    //     console.log(userState);
    // }, [roomNameValue]);

    return (
        // <div className="join_room_inputs_container">
        <>
            <RoomCreateInput
                placeholder="Enter Room Name"
                value={roomNameValue}
                onChange={handleRoomName}
            />
            <RoomCreateInput
                placeholder="Enter your nickName"
                value={nameValue}
                onChange={handleNameValueChange}
            />
        </>
        // </div>
    );
};

export default CreateRoomInputs;
