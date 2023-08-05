import React, { useState } from "react";
import SwitchImg from "../../resources/images/switchToScreenSharing.svg";
import LocalScreenSharingPreview from "./LocalScreenSharingPreview";
import * as webRTCHandler from "../../utils/webRTCHandler";
import { postScreenShot } from "../../utils/api";
import { AuthLogin } from "../../atoms";
import { useRecoilValue } from "recoil";
// import { useNavigate } from "react-router-dom";

const constraints = {
    audio: false,
    video: true,
};

const SwitchToScreenSharingButton = () => {
    // const storedData = JSON.parse(localStorage.getItem("userData"));
    const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
    const [screenSharingStream, setScreenSharingStream] = useState(null);
    const userState = useRecoilValue(AuthLogin);
    // const navigate = useNavigate();

    const handleScreenShareToggle = async () => {
        if (!isScreenSharingActive) {
            let stream = null;
            try {
                stream = await navigator.mediaDevices.getDisplayMedia(
                    constraints
                );
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
            //! capture ~ alt(18) + a(65)
            const sharedVideo = document.querySelectorAll("#room_host")[0];

            sharedVideo.addEventListener("contextmenu", async function (event) {
                event.preventDefault();
                try {
                    const track = await stream.getVideoTracks()[0];
                    const imageCapture = new ImageCapture(track.clone());
                    // const copyTrack = track.clone();
                    // const imageCapture = new ImageCapture(copyTrack);

                    const bitmap = await imageCapture.grabFrame();
                    await track.clone().stop();
                    // await copyTrack.stop();
                    // stream.removeTrack(copyTrack);
                    const canvas = document.getElementById("screenshot");

                    canvas.width = bitmap.width;
                    canvas.height = bitmap.height;

                    const context = canvas.getContext("2d");
                    context.drawImage(
                        bitmap,
                        0,
                        0,
                        bitmap.width,
                        bitmap.height
                    );
                    const image = canvas.toDataURL();
                    const res = await fetch(image);
                    const buff = await res.arrayBuffer();

                    const jpg = [
                        new File([buff], `photo_${new Date()}.jpg`, {
                            type: "image/jpeg",
                        }),
                    ];
                    const file = new FormData();
                    file.append("file", jpg[0]); // 파일, 파일 이름 추가

                    postScreenShot(userState.currentRoom.room_id, file);
                } catch (error) {
                    console.log("❌", error);
                    // navigate("/");
                }
            });
        } else {
            webRTCHandler.toggleScreenShare(isScreenSharingActive);
            setIsScreenSharingActive(false);

            // stop screen share stream
            screenSharingStream.getTracks().forEach((t) => t.stop());
            setScreenSharingStream(null);
        }
    };

    return (
        <>
            <div className="video_button_container">
                <img
                    alt="SCREEN SHARE"
                    src={SwitchImg}
                    onClick={handleScreenShareToggle}
                    className="video_button_image"
                />
            </div>
            {isScreenSharingActive && (
                <LocalScreenSharingPreview stream={screenSharingStream} />
            )}
        </>
    );
};

export default SwitchToScreenSharingButton;
