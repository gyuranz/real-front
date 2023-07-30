import React from "react";
import { styled } from "styled-components";
import { motion } from "framer-motion/dist/framer-motion";
import { buttonStyle, mainBgColor } from "../components/Styles";

const RoomJoinInput = styled(motion.input)`
    ${buttonStyle}
    max-width: 400px;
    margin-bottom: 10px;
    font-size: 1rem;
    width: 90%;
`;

const JoinRoomInputs = (props) => {
    const { roomIdValue, setRoomIdValue, nameValue, setNameValue, isRoomHost } =
        props;

    const handleRoomIdValueChange = (event) => {
        setRoomIdValue(event.target.value);
    };

    const handleNameValueChange = (event) => {
        setNameValue(event.target.value);
    };

    return (
        // <div className="join_room_inputs_container">
        <>
            <RoomJoinInput
                placeholder="Enter meeting ID"
                value={roomIdValue}
                onChange={handleRoomIdValueChange}
            />
            <RoomJoinInput
                placeholder="Enter your Name"
                value={nameValue}
                onChange={handleNameValueChange}
            />
        </>
        // </div>
    );
};

export default JoinRoomInputs;
