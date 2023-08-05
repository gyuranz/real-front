import React, { useState } from "react";
import SwitchImg from "../../resources/images/switchToScreenSharing.svg";
import LocalScreenSharingPreview from "./LocalScreenSharingPreview";
import * as webRTCHandler from "../../utils/webRTCHandler";
import { postScreenShot } from "../../utils/api";
import { AuthLogin } from "../../atoms";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";
// import { useNavigate } from "react-router-dom";

const constraints = {
    audio: false,
    video: true,
};
const ScreenshareButton = styled.button`
    position: absolute;
    top: 0;
    left: 35vw;
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
        // event.preventDefault();
        try {
            // const track = await stream.getVideoTracks()[0];
            // const track = await screenSharingStream.getVideoTracks()[0];
            // const copyTrack = track.clone();
            // console.log("✅", track);

            // const imageCapture = new ImageCapture(track);
            // const imageCapture = new ImageCapture(copyTrack);
            // const bitmap = await imageCapture.grabFrame();
            // await track.stop();
            // await copyTrack.stop();
            // stream.removeTrack(copyTrack);
            // const canvas = document.getElementById("screenshot");

            // canvas.width = bitmap.width;
            // canvas.height = bitmap.height;

            // const context = canvas.getContext("2d");
            // context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);
            // const image = canvas.toDataURL();
            // const res = await fetch(image);
            // const buff = await res.arrayBuffer();

            // const jpg = [
            //     new File([buff], `photo_${new Date()}.jpg`, {
            //         type: "image/jpeg",
            //     }),
            // ];
            // const file = new FormData();
            // file.append("file", jpg[0]); // 파일, 파일 이름 추가

            // postScreenShot(userState.currentRoom.room_id, file);

            const video = document.createElement("video");
            video.srcObject = screenSharingStream;

            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext("2d");

            video.onloadedmetadata = async () => {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const image = canvas.toDataURL();
                const res = await fetch(image);
                const buff = await res.arrayBuffer();

                const jpg = [
                    new File([buff], `photo_${new Date()}.jpg`, {
                        type: "image/jpeg",
                    }),
                ];
                const file = new FormData();
                file.append("file", jpg[0]);

                postScreenShot(userState.currentRoom.room_id, file);
            };
        } catch (error) {
            console.log("❌", error);
            // navigate("/");
        }
    }

    return (
        <>
            <ScreenshareButton onClick={screenshare}>
                스크린쉐어
            </ScreenshareButton>
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
