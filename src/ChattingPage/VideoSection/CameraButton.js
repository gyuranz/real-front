import React, { useState } from "react";

import CameraButtonImg from "../../resources/images/camera.svg";
import CameraButtonImgOff from "../../resources/images/cameraOff.svg";
import * as webRTCHandler from "../../utils/webRTCHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion/dist/framer-motion";

const CameraButton = () => {
    const [isLocalVideoDisabled, setIsLocalVideoDisabled] = useState(false);

    const handleCameraButtonPressed = () => {
        webRTCHandler.toggleCamera(isLocalVideoDisabled);

        setIsLocalVideoDisabled(!isLocalVideoDisabled);
    };

    return (
        <motion.div
            className="video_button_container"
            onClick={handleCameraButtonPressed}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            {/* <img
                alt="VIDEO"
                src={
                    isLocalVideoDisabled ? CameraButtonImgOff : CameraButtonImg
                }
                className="video_button_image"
                onClick={handleCameraButtonPressed}
            /> */}
            {isLocalVideoDisabled ? (
                <FontAwesomeIcon
                    icon={faVideoSlash}
                    size="xl"
                    style={{ color: "#ffc700", cursor: "pointer" }}
                />
            ) : (
                <FontAwesomeIcon
                    icon={faVideo}
                    size="xl"
                    style={{ color: "#ffc700", cursor: "pointer" }}
                />
            )}
        </motion.div>
    );
};

export default CameraButton;
