import { atom } from "recoil";

export const identityState = atom({
    key: "identityState",
    default: "",
});

export const isRoomHostState = atom({
    key: "isRoomHostState",
    default: false,
});

export const connectOnlyWithAudioState = atom({
    key: "connectOnlyWithAudioState",
    default: false,
});

export const roomIdState = atom({
    key: "roomIdState",
    default: null,
});

export const showOverlayState = atom({
    key: "showOverlayState",
    default: true,
});

export const participantsState = atom({
    key: "participantsState",
    default: [],
});

export const messagesState = atom({
    key: "messagesState",
    default: [],
});

export const activeConversationState = atom({
    key: "activeConversationState",
    default: null,
});

export const directChatHistoryState = atom({
    key: "directChatHistoryState",
    default: [],
});

export const socketIdState = atom({
    key: "socketIdState",
    default: null,
});
