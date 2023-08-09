import React from "react";
import CameraButton from "./CameraButton";
import LeaveRoomButton from "./LeaveRoomButton";
import MicButton from "./MicButton";
import SwitchToScreenSharingButton from "./SwitchToScreenSharingButton";
import { connect } from "react-redux";
import { styled } from "styled-components";
import { motion } from "framer-motion/dist/framer-motion";

const VideoButtonsConainter = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 40%;
    height: 60px;
    border-radius: 30px;
    border: 3px solid #ffc700;
    width: 440px;
    z-index: 3;
`;

const VideoButtons = (props) => {
    const { connectOnlyWithAudio } = props;

    return (
        <>
            <VideoButtonsConainter>
                <MicButton />
                {!connectOnlyWithAudio && <CameraButton />}
                {!connectOnlyWithAudio && <SwitchToScreenSharingButton />}
                <LeaveRoomButton />
            </VideoButtonsConainter>
        </>
    );
};

const mapStoreStateToProps = (state) => {
    return {
        ...state,
    };
};

export default connect(mapStoreStateToProps)(VideoButtons);
