import React, { useState } from "react";
import MicButtonImg from "../../resources/images/mic.svg";
import MicButtonImgOff from "../../resources/images/micOff.svg";
import * as webRTCHandler from "../../utils/webRTCHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMicrophone,
    faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion/dist/framer-motion";

const MicButton = () => {
    const [isMicMuted, setIsMicMuted] = useState(true);

    const handleMicButtonPressed = () => {
        webRTCHandler.toggleMic(isMicMuted);

        setIsMicMuted(!isMicMuted);
    };

    return (
        <motion.div
            className="video_button_container"
            style={{ marginLeft: "50px" }}
            onClick={handleMicButtonPressed}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            {/* <img
                alt="MIC button"
                src={isMicMuted ? MicButtonImgOff : MicButtonImg}
                onClick={handleMicButtonPressed}
                className="video_button_image"
            /> */}

            {isMicMuted ? (
                <FontAwesomeIcon
                    icon={faMicrophoneSlash}
                    size="xl"
                    style={{ color: "#ffc700", cursor: "pointer" }}
                />
            ) : (
                <FontAwesomeIcon
                    icon={faMicrophone}
                    size="xl"
                    style={{ color: "#ffc700", cursor: "pointer" }}
                />
            )}
        </motion.div>
    );
};

export default MicButton;
