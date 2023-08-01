import React, { useEffect, useState } from "react";
import RoomPage from "../ChattingPage/RoomPage";

function Playground() {
    const [currentRecognition, setCurrentRecognition] = useState();
    const [STTMessage, setSTTMessage] = useState([]);
    useEffect(() => {
        setCurrentRecognition("...");
        setSTTMessage((prev) => [...prev, " "]);
    }, [setSTTMessage, currentRecognition]);
    return (
        <>
            <RoomPage />
        </>
    );
}

export default Playground;
