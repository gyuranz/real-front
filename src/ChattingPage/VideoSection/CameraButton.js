import React, { useState } from "react";

import CameraButtonImg from "../../resources/images/camera.svg";
import CameraButtonImgOff from "../../resources/images/cameraOff.svg";
import * as webRTCHandler from "../../utils/webRTCHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faVideoSlash } from "@fortawesome/free-solid-svg-icons";

const CameraButton = () => {
    const [isLocalVideoDisabled, setIsLocalVideoDisabled] = useState(false);

    const handleCameraButtonPressed = () => {
        webRTCHandler.toggleCamera(isLocalVideoDisabled);

        setIsLocalVideoDisabled(!isLocalVideoDisabled);
    };

    return (
        <div
            className="video_button_container"
            onClick={handleCameraButtonPressed}
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
                <FontAwesomeIcon icon={faVideo} size="xl" />
            ) : (
                <FontAwesomeIcon icon={faVideoSlash} size="xl" />
            )}
        </div>
    );
};

export default CameraButton;
