import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import RoomPage from "./ChattingPage/RoomPage";
import { connectWithSocketIOServer } from "./utils/wss";
import Main from "./main_components/Main";
import Login from "./login_components/Login";
import Signup from "./login_components/Signup";

import PageRoute from "./components/PageRoute";
import Room from "./room_components/Room";

function App() {
    useEffect(() => {
        connectWithSocketIOServer();
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="auth/login" element={<Login />} />
                <Route path="auth/signup" element={<Signup />} />

                <Route path=":uid/*" element={<Main />} />

                {/* <Route path="/room" element={<RoomPage />}></Route> */}
                <Route path="/room" element={<Room />}></Route>
                {/* <Route path="room/:room_id/*" element={<Room />} /> */}
                <Route path="*" element={<PageRoute />} />
            </Routes>
        </Router>
    );
}

export default App;
