import React, { useState } from "react";
import SwitchImg from "../../resources/images/switchToScreenSharing.svg";
import LocalScreenSharingPreview from "./LocalScreenSharingPreview";
import * as webRTCHandler from "../../utils/webRTCHandler";
import { postScreenShot } from "../../utils/api";
import { AuthLogin } from "../../atoms";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDisplay,
    faUsersViewfinder,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion/dist/framer-motion";
// import { useNavigate } from "react-router-dom";

const constraints = {
    audio: false,
    video: true,
};
const ScreenshareButton = styled(motion.div)`
    border: none;
    padding: 3px;
`;
const CaptureImg = styled(motion.img)`
    width: 30px;
    height: 30px;
    cursor: pointer;
`;

const SwitchToScreenSharingButton = () => {
    // const storedData = JSON.parse(localStorage.getItem("userData"));
    const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
    const [screenSharingStream, setScreenSharingStream] = useState(null);
    const userState = useRecoilValue(AuthLogin);
    // const navigate = useNavigate();

    let stream = null;
    const handleScreenShareToggle = async () => {
        if (!isScreenSharingActive) {
            try {
                stream = await navigator.mediaDevices.getDisplayMedia(
                    constraints
                );
                console.log(stream);
            } catch (err) {
                console.log(
                    "error occurred when trying to get an access to screen share stream"
                );
            }
            if (stream) {
                setScreenSharingStream(stream);

                webRTCHandler.toggleScreenShare(isScreenSharingActive, stream);
                setIsScreenSharingActive(true);
                // execute here function to switch the video track which we are sending to other users
            }
        } else {
            webRTCHandler.toggleScreenShare(isScreenSharingActive);
            setIsScreenSharingActive(false);

            // stop screen share stream
            screenSharingStream.getTracks().forEach((t) => t.stop());
            setScreenSharingStream(null);
        }
    };
    //! capture ~ alt(18) + a(65)
    console.log("✅", stream);

    // sharedVideo.addEventListener("contextmenu", async function (event) {
    async function screenshare() {
        try {
            const video = document.createElement("video");
            video.srcObject = screenSharingStream;

            video.onloadedmetadata = async () => {
                const canvas = document.getElementById("screenshot");

                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                const context = canvas.getContext("2d");
                context.drawImage(
                    video,
                    0,
                    0,
                    video.videoWidth,
                    video.videoHeight
                );

                const image = canvas.toDataURL();
                const res = await fetch(image);
                const buff = await res.arrayBuffer();

                const jpg = [
                    new File([buff], `photo_${new Date()}.png`, {
                        type: "image/png",
                    }),
                ];
                const file = new FormData();
                file.append("file", jpg[0]); // 파일, 파일 이름 추가

                postScreenShot(userState.currentRoom.room_id, file);
            };

            video.play();
        } catch (error) {
            console.log("❌", error);
            // navigate("/");
        }
    }

    return (
        <>
            <ScreenshareButton
                onClick={screenshare}
                className="video_button_container"
            >
                {/* <FontAwesomeIcon
                    icon={faUsersViewfinder}
                    style={{ fontSize: "40px" }}
                /> */}
                <CaptureImg
                    src="/img/capture_main.png"
                    alt="CAPTURE"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                />
            </ScreenshareButton>
            <div
                className="video_button_container"
                onClick={handleScreenShareToggle}
            >
                <ScreenshareButton
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                    <FontAwesomeIcon
                        icon={faDisplay}
                        size="xl"
                        style={{ color: "#ffc700", cursor: "pointer" }}
                    />
                </ScreenshareButton>
            </div>
            {isScreenSharingActive && (
                <LocalScreenSharingPreview stream={screenSharingStream} />
            )}
        </>
    );
};

export default SwitchToScreenSharingButton;
