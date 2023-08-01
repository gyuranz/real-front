import React, { useRef, useEffect } from "react";
import { styled } from "styled-components";

const ScreenShare = styled.video`
    width: 80px;
    position: absolute;
    left: 180px;
`;

const LocalScreenSharingPreview = ({ stream }) => {
    const localPreviewRef = useRef();

    useEffect(() => {
        const video = localPreviewRef.current;

        video.srcObject = stream;

        video.onloadedmetadata = () => {
            video.play();
        };
    }, [stream]);

    return (
        // <div className="local_screen_share_preview">
        <ScreenShare muted ref={localPreviewRef}></ScreenShare>
        // </div>
    );
};

export default LocalScreenSharingPreview;
