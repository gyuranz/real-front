import React, { useEffect, useState } from "react";
import RoomPage from "../ChattingPage/RoomPage";

function Playground(sttConnect, sttDisconnect) {
    const [currentRecognition, setCurrentRecognition] = useState();
    const [STTMessage, setSTTMessage] = useState([]);
    useEffect(() => {
        setCurrentRecognition("...");
        setSTTMessage((prev) => [...prev, " "]);
    }, [setSTTMessage, currentRecognition]);
    return (
        <>
            <RoomPage sttConnect={sttConnect} sttDisconnect={sttDisconnect} />
        </>
    );
}

export default Playground;
