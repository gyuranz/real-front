import React, { useState } from "react";
import SwitchImg from "../../resources/images/switchToScreenSharing.svg";
import LocalScreenSharingPreview from "./LocalScreenSharingPreview";
import * as webRTCHandler from "../../utils/webRTCHandler";
import { postScreenShot } from "../../utils/api";
import { AuthLogin } from "../../atoms";
import { useRecoilState } from "recoil";

const constraints = {
    audio: false,
    video: true,
};

const SwitchToScreenSharingButton = () => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
    const [screenSharingStream, setScreenSharingStream] = useState(null);
    const [userState, setUserState] = useRecoilState(AuthLogin);

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
                // console.log(stream.getVideoTracks());
                const track = await stream.getVideoTracks()[0];
                const imageCapture = new ImageCapture(track);
                // console.log(imageCapture);
                const bitmap = await imageCapture.grabFrame();
                track.stop();
                const canvas = document.getElementById("screenshot");

                canvas.width = bitmap.width;
                canvas.height = bitmap.height;

                const context = canvas.getContext("2d");
                context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);
                const image = canvas.toDataURL();

                const res = await fetch(image);
                const buff = await res.arrayBuffer();

                const file = [
                    new File([buff], `photo_${new Date()}.jpg`, {
                        type: "image/jpeg",
                    }),
                ];
                console.log(userState, "❌");
                console.log(buff, "❌");
                // const file = new FormData();
                // file.append("file", buff); // 파일, 파일 이름 추가
                // console.log(file, "❌❌❌");
                postScreenShot(userState.currentRoom.room_id, file);
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
