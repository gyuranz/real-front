import React, { useState } from "react";
import MicButtonImg from "../../resources/images/mic.svg";
import MicButtonImgOff from "../../resources/images/micOff.svg";
import * as webRTCHandler from "../../utils/webRTCHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMicrophone,
    faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";

const MicButton = () => {
    const [isMicMuted, setIsMicMuted] = useState(true);

    const handleMicButtonPressed = () => {
        webRTCHandler.toggleMic(isMicMuted);

        setIsMicMuted(!isMicMuted);
    };

    return (
        <div
            className="video_button_container"
            style={{ marginLeft: "20px" }}
            onClick={handleMicButtonPressed}
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
                    style={{ color: "#1de9b6" }}
                />
            ) : (
                <FontAwesomeIcon
                    icon={faMicrophone}
                    size="xl"
                    style={{ color: "#1de9b6" }}
                />
            )}
        </div>
    );
};

export default MicButton;
