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
    border-radius: 30px;
    border: 3px solid #1de9b6;
    width: 390px;
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
