import React, { useEffect } from "react";

import { connect } from "react-redux";
import * as webRTCHandler from "../utils/webRTCHandler";
import Overlay from "./Overlay";

import "./RoomPage.css";
import VideoButtons from "./VideoSection/VideoButtons";
import { useRecoilValue } from "recoil";
import { AuthLogin } from "../atoms";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion/dist/framer-motion";
import { primaryTextColor } from "../components/Styles";

const CopyButton = styled(motion.button)`
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 10px;
    /* z-index: 300; */
`;

const RoomLabel = styled(motion.div)`
    ${primaryTextColor}
    position: absolute;
    font-weight: 600;
    font-size: 1.5em;
    top: 10px;
    right: -200px;
    z-index: 100;
`;

const RoomPage = ({
    roomId,
    identity,
    isRoomHost,
    showOverlay,
    connectOnlyWithAudio,
}) => {
    const userState = useRecoilValue(AuthLogin);
    useEffect(() => {
        //! room ID 바꾸는 것
        // setUserState({
        //     ...userState,
        //     currentRoom: {
        //         room_id: roomId,
        //     },
        // });
        //! 룸 아이디 소켓으로 보내줌
        const sixRoomId = userState.currentRoom.room_id;
        const userNickname = userState.userNickname;

        if (!isRoomHost && !roomId) {
            const siteUrl = window.location.origin;
            window.location.href = siteUrl;
        } else {
            // credential 인증
            webRTCHandler.getLocalPreviewAndInitRoomConnection(
                isRoomHost,
                identity,
                roomId,
                connectOnlyWithAudio,
                sixRoomId,
                userNickname
            );
        }
    }, []);
    const copyRoomId = () => {
        navigator.clipboard.writeText(userState.currentRoom.room_id);
    };

    return (
        <div className="room_container" id="videos_portal">
            <VideoButtons />
            <RoomLabel>
                ID: {roomId}
                <CopyButton
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    onClick={copyRoomId()}
                >
                    <FontAwesomeIcon
                        icon={faCopy}
                        size="xl"
                        style={{ color: "#ffc700", cursor: "pointer" }}
                    />
                </CopyButton>
            </RoomLabel>

            {showOverlay && <Overlay />}
        </div>
    );
};

const mapStoreStateToProps = (state) => {
    return {
        ...state,
    };
};

export default connect(mapStoreStateToProps)(RoomPage);
