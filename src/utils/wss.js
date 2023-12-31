import io from "socket.io-client";
import { setRoomId, setParticipants, setSocketId } from "../store/actions";
import store from "../store/store";
import * as webRTCHandler from "./webRTCHandler";
import { appendNewMessageToChatHistory } from "./directMessages";

// const SERVER = process.env.REACT_APP_BACKEND_URL;

export let socket = null;

export const connectWithSocketIOServer = () => {
    // socket = io(`https://hyunsunghwang.shop`);
    // socket = io(`${process.env.REACT_APP_BACKEND_URL}/room`);
    socket = io(`${process.env.REACT_APP_BACKEND_URL}`);

    socket.on("connect", () => {
        console.log("successfully connected with socket io server");
        console.log(socket.id);
        store.dispatch(setSocketId(socket.id));
    });

    socket.on("room-id", (data) => {
        const { roomId } = data;
        console.log(roomId, "a");
        store.dispatch(setRoomId(roomId));
    });

    socket.on("room-update", (data) => {
        const { connectedUsers } = data;
        store.dispatch(setParticipants(connectedUsers));
    });

    socket.on("conn-prepare", (data) => {
        const { connUserSocketId, connUserNickname } = data;
        console.log(connUserNickname);

        webRTCHandler.prepareNewPeerConnection(
            connUserSocketId,
            connUserNickname,
            false
        );

        // inform the user which just join the room that we have prepared for incoming connection
        socket.emit("conn-init", {
            connUserSocketId: connUserSocketId,
            connUserNickname,
        });
    });

    socket.on("conn-signal", (data) => {
        webRTCHandler.handleSignalingData(data);
    });

    socket.on("conn-init", (data) => {
        const { connUserSocketId, connUserNickname } = data;
        webRTCHandler.prepareNewPeerConnection(
            connUserSocketId,
            connUserNickname,
            true
        );
    });

    socket.on("user-disconnected", (data) => {
        webRTCHandler.removePeerConnection(data);
    });
};

export const textMessageSender = ({ user_nickname, message, room_id }) => {
    socket.emit("message", {
        user_nickname,
        message,
        room_id,
    });
};

export const createNewRoom = (identity, onlyAudio, sixRoomId, userNickname) => {
    // emit an event to server that we would like to create new room
    const data = {
        identity,
        onlyAudio,
        sixRoomId,
        userNickname,
    };
    console.log("you are a host");

    socket.emit("create-new-room", data);
};

export const joinRoom = (identity, roomId, onlyAudio, userNickname) => {
    //emit an event to server that we would to join a room
    const data = {
        roomId,
        identity,
        onlyAudio,
        userNickname,
    };
    console.log("you are a joiner");

    socket.emit("join-room", data);
};

export const signalPeerData = (data) => {
    socket.emit("conn-signal", data);
};

// export const sendDirectMessage = (data) => {
//     socket.emit("direct-message", data);
// };
