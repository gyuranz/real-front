import React, { useEffect } from "react";

import { connect } from "react-redux";
import * as webRTCHandler from "../utils/webRTCHandler";
import Overlay from "./Overlay";

import "./RoomPage.css";
import VideoButtons from "./VideoSection/VideoButtons";

const RoomPage = ({
    roomId,
    identity,
    isRoomHost,
    showOverlay,
    connectOnlyWithAudio,
}) => {
    useEffect(() => {
        if (!isRoomHost && !roomId) {
            const siteUrl = window.location.origin;
            window.location.href = siteUrl;
        } else {
            // credential 인증
            webRTCHandler.getLocalPreviewAndInitRoomConnection(
                isRoomHost,
                identity,
                roomId,
                connectOnlyWithAudio
            );
        }
    }, []);

    return (
        <div className="room_container">
            <VideoButtons />
            <div className="room_label">ID: {roomId}</div>
            {showOverlay && <Overlay />}
        </div>
    );
};

const mapStoreStateToProps = (state) => {
    return {
        ...state,
    };
};

export default connect(mapStoreStateToProps)(RoomPage);
