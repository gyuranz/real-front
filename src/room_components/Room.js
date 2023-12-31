import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AuthLogin, CompleteStudy } from "../atoms";
import { motion } from "framer-motion/dist/framer-motion";
import { styled } from "styled-components";
import {
    buttonStyle,
    containerStyle,
    containerVariants,
    disabledTextColor,
    listBoxBgColor,
    mainBgColor,
    paperCardBgColor,
    primaryBgColor,
    primaryTextColor,
    reverseTextColor,
    secondaryBgColor,
    secondaryTextColor,
} from "../components/Styles";
import { useNavigate, Link, Routes, Route } from "react-router-dom";
import {
    faBars,
    faComment,
    faCommentSlash,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useForm } from "react-hook-form";
import * as wss from "../utils/wss";
import Playground from "./Playground";
import Summary from "./Summary";
import Question from "./Question";
import Quiz from "./Quiz";
import PageRoute from "../components/PageRoute";
//!
//! 룸 finish 상태를 서버로부터 받아와 종료방인지 아닌지 확인 후 처리작업 진행
//!
//! STT
const sampleRate = 16000;

const getMediaStream = () =>
    navigator.mediaDevices.getUserMedia({
        audio: {
            deviceId: "default",
            sampleRate: sampleRate,
            sampleSize: 16,
            channelCount: 1,
        },
        video: false,
    });
// const getMediaStream = localStream;

//! STT

// const ToggleClose = styled.div`
//     position: absolute;
//     top: 20px;
//     width: 50px;
//     height: 50px;
//     right: 0;
// `;
// const BaseToggle = styled.div`
//     transition: 0.5s ease-in-out;
//     position: absolute;
//     top: 0;
//     bottom: 0;
//     ${primaryBgColor}
//     z-index: 9;
// `;

const BaseContainer = styled(motion.div)`
    ${containerStyle}
    width: 100vw;
    height: 100vh;
    border-radius: 0;
`;

const MainContainer = styled.div`
    ${containerStyle}
    box-shadow: none;
    //! 1400px
    /* width: 1200px; */
    width: ${(props) => (props.finished ? "1400px" : "1200px")};
    height: 95vh;
    display: block;
    margin-right: 30px;
    position: relative;
`;

const Container = styled.div`
    background-color: #454545;
    border-radius: 20px;
    height: 95vh;
    //! 1400px
    /* width: 1200px; */
    width: ${(props) => (props.finished ? "1400px" : "1200px")};
    position: relative;
`;

const IOButton = styled.button`
    border: none;
    padding: 16px;
    font-size: 24px;
    ${secondaryBgColor}
    cursor: pointer;
    border-radius: 30px;
`;
const SideOpenToolBox = styled(motion.div)`
    z-index: 11;
    position: absolute;
    bottom: 0;
    left: 33%;
`;

const RoomList = styled(motion.div)`
    ${containerStyle}
    box-shadow: none;
    //! 400px
    /* width: 600px; */
    width: ${(props) => (props.finished ? "400px" : "600px")};
    height: 95vh;
    display: block;
    text-align: center;
    position: relative;
`;
const InputTextStyle = styled.div`
    display: grid;
    grid-template-columns: 4fr 1fr;
`;

const TextInput = styled(motion.input)`
    ${buttonStyle}
    //! 300px
    /* width: 500px; */
    width: ${(props) => (props.finished ? "300px" : "500px")};
    height: 6vh;
    font-size: 1.2rem;
    border-radius: 0 0 0 20px;
`;
const TextInputButton = styled(motion.button)`
    ${buttonStyle}
    ${mainBgColor}
    font-size: 1.2rem;
    /* line-height: 1.2rem; */
    width: 100px;
    height: 6vh;
    cursor: pointer;
    color: white;
    border-radius: 0 0 20px 0;
`;

const ChatArea = styled.div`
    //! 400px
    /* width: 600px; */
    width: ${(props) => (props.finished ? "400px" : "600px")};
    height: 84vh;
    overflow-y: auto;
    border-radius: 20px 20px 0 0;
    transition: 0.3s ease-in-out;
    ${paperCardBgColor}
`;

const ChattingBox = styled(motion.div)`
    margin: 10px 20px;
    text-align: left;
`;

const Message = styled.div`
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 0.5rem;
    font-size: 28px;
    font-weight: 600;
    width: 100%;
    padding: 5px;
    border-radius: 0.5rem;
    word-break: break-all;
    ${primaryTextColor}
`;

const RoomOutButton = styled(motion.div)`
    z-index: 0;
    ${buttonStyle}
    box-shadow: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
        ${reverseTextColor}
    }
`;

const ToggleContainer = styled(motion.div)`
    height: 5vh;
    display: flex;
    justify-content: flex-end;
`;
const ChatToggle = styled(motion.button)`
    border: none;
    background-color: transparent;
    position: relative;
    left: 340px;
    z-index: 2;
    font-size: 36px;
    cursor: pointer;
`;
const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const Ul = styled(motion.ul)`
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.5);
    padding-top: 50px;
`;

const Li = styled(motion.li)`
    transition: 0.3s ease-in-out;
    display: block;
    list-style: none;
    margin: 0;
    padding: 30px;
    width: 400px;
    font-size: 24px;
    font-weight: 600;
    ${primaryTextColor}
    &:hover {
        background-color: #ffffff;
        color: #424242;
        scale: 1.3;
    }
    &:last-child {
        padding: 0px;
        scale: 1;
        background-color: inherit;
    }
    a {
        padding: 30px;
    }
`;
const MotionBtn = styled(motion.button)`
    /* -webkit-appearance: button; */
    background-color: transparent;
    border: none;
    padding: 10px 20px;
    font-size: 36px;
    cursor: pointer;
    position: relative;
    left: 170px;
    top: -5px;
`;

//! 소켓 api 꼭 같이 수정해주기

// const current_room_id = window.location.pathname.split("/")[2];
// socket = io(`${process.env.REACT_APP_BACKEND_URL}/room`, {
//     query: { user: JSON.stringify(storedData.userNickname) },
// });
function Room() {
    const [isToggle, setIsToggle] = useState(false);
    const [isChatToggle, setIsChatToggle] = useState(true);
    const storedData = JSON.parse(localStorage.getItem("userData"));
    const completeStudy = useRecoilValue(CompleteStudy);
    const [click, setClick] = useState("playground");
    const [connection, setConnection] = useState();
    const [currentRecognition, setCurrentRecognition] = useState();
    const [recognitionHistory, setRecognitionHistory] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [recorder, setRecorder] = useState();
    const processorRef = useRef();
    const audioContextRef = useRef();
    const audioInputRef = useRef();
    const { register, handleSubmit, setValue } = useForm();
    //! STT
    const navigate = useNavigate();

    const [userState, setUserState] = useRecoilState(AuthLogin);
    const [chats, setChats] = useState([]);
    const [message, setMessage] = useState("");
    const chatContainerEl = useRef(null);

    const [STTMessage, setSTTMessage] = useState([]);

    //! message event listener
    const messageHandler = (chat) => {
        setChats((prevChats) => [...prevChats, chat]);
    };

    useEffect(() => {
        wss.socket.on("message", messageHandler);
        return () => {
            wss.socket.off("message", messageHandler);
        };
    }, []);
    console.log(userState);

    // ! STT

    //! STT
    // * 서버로 부터 받은 음성 인식 결과를 처리하는 함수
    const speechRecognized = useCallback((data) => {
        console.log("abc");
        if (data.isFinal) {
            setCurrentRecognition("...");
            //*
            setRecognitionHistory((old) => [...old, data.text]);
            setSTTMessage((prev) => [...prev, data.text]);
            const sttInfo = {
                user_nickname: data.user_nickname + "(STT)",
                message: data.text,
                room_id: userState.currentRoom.room_id,
            };
            setChats((prev) => [...prev, sttInfo]);
            console.log(STTMessage, "✅");
            console.log(chats, "✅");
            console.log(recognitionHistory);
        } else setCurrentRecognition(data.text + "...");
        console.log(currentRecognition);
        wss.socket.on("broadcastAudio", (audioData) => {
            // Handle received audio data and play it back using the Web Audio API or Audio element
            // For simplicity, this example doesn't include the playback implementation.
            console.log("Received audio data:", audioData);
        });
    }, []);

    //! audio

    //* 서버로부터 받은 음성 인식 결과를 처리하는 speechRecognized 함수에서
    //* recognitionHistory를 변경하기에 실행되는 함수. console.log로 보여줌
    useEffect(() => {
        console.log("\n\nrecognitionHistory", recognitionHistory);
    }, [recognitionHistory]);

    //* 서버와의 연결을 설정하고, 음성 녹음 및 전송을 위한 준비를 한다.
    const connect = () => {
        if (!connection) {
            setConnection(wss.socket);
        }

        wss.socket.emit("send_message", "hello world");

        wss.socket.emit("startGoogleCloudStream", {
            user_nickname: storedData.userNickname,
            message: message,
            room_id: userState.currentRoom.room_id,
        });

        wss.socket.on("disconnect", () => {
            console.log("disconnected", wss.socket.id);
        });
    };

    useEffect(() => {
        // 이벤트 핸들러 등록
        wss.socket.on("receive_audio_text", speechRecognized);
        console.log("✅");

        // cleanup function: 컴포넌트가 언마운트 될 때 실행
        return () => {
            // 이벤트 핸들러 해제
            wss.socket.off("receive_audio_text", speechRecognized);
        };
    }, [connection, isRecording, speechRecognized]);

    //* 서버와의 연결의 해제하는 함수, 녹음과 관련된 상태와 객체들을 초기화하고 연결을 해제
    const disconnect = () => {
        if (!connection) return;
        connection?.emit("endGoogleCloudStream");
        processorRef.current?.disconnect();
        audioInputRef.current?.disconnect();
        audioContextRef.current?.close();
        setConnection(undefined);
        setRecorder(undefined);
        setIsRecording(false);
    };

    //* 컴포넌트가 렌더링 될 때마다 실행되는 훅, 클라이언트 측에서 음성 녹음과 서버 전송을 처리
    //* connection과 isRecording 상태, 그리고 recorder를 의존성 배열로 지정하여
    //* 이들 값이 변경될 때마다 해당 코드 블록이 실행됩니다.
    useEffect(() => {
        (async () => {
            if (connection) {
                if (isRecording) {
                    return;
                }
                //* 브라우져의 미디어 스트림을 가져옴, 사용자의 마이크에서 오디오 데이터를 제공
                const stream = await getMediaStream();
                // const stream = getMediaStream;
                //* 오디오 스트림을 처리하고 녹음 작업을 진행
                audioContextRef.current = new window.AudioContext();
                //* audioWorklet을 사용하여 워크렛(worklet)을 추가합니다.
                //* 워크렛은 오디오 데이터를 처리하는 커스텀 프로세서입니다.
                //*여기서는 recorderWorkletProcessor.js 파일에 정의된 워크렛을 추가합니다.
                await audioContextRef.current.audioWorklet.addModule(
                    "/src/worklets/recorderWorkletProcessor.js"
                );
                //* 오디오 컨텍스트를 재개합니다. 브라우저는 보안 이슈로 인해
                //* 사용자 인터랙션 이전에 오디오 컨텍스트를 재개하지 못하도록 막고 있습니다.
                //* 오디오 컨텍스트를 직접 재개합니다.
                audioContextRef.current.resume();
                //* 미디어 스트림에서 오디오 입력 소스를 만듭니다.
                audioInputRef.current =
                    audioContextRef.current.createMediaStreamSource(stream);
                //* 워크렛 노드를 생성하여 오디오 스트림을 처리하는 커스텀 워크렛과 연결합니다.
                processorRef.current = new AudioWorkletNode(
                    audioContextRef.current,
                    "recorder.worklet"
                );
                //* 오디오워크렛 노드를 컨텍스트의 출력(destination)과 연결
                //* 이를 통해 오디오 데이터를 처리한 뒤 컨텍스트의 출력으로 보낼 수 있음
                processorRef.current.connect(
                    audioContextRef.current.destination
                );
                audioContextRef.current.resume();

                //* 워크렛 노드와 오디오 입력 소스를 연결합니다.
                audioInputRef.current.connect(processorRef.current);
                //* 워크렛 노드의 port.onmessage 이벤트 핸들러를 정의합니다.
                //* 이 핸들러는 워크렛으로부터 오디오 데이터를 전달받아 서버로 전송하는 역할을 합니다.
                //! 실제 녹음은 processorRef.current.port.onmessage 핸들러를 통해 이루어지며,
                //! 워크렛은 오디오 데이터를 처리하여 실시간으로 서버로 전송합니다.
                processorRef.current.port.onmessage = (event) => {
                    const audioData = event.data;
                    //! 서버로 음성 데이터는 보내는 부분. 이부분을 통해서 전체에 음성을 보내주면 될듯
                    connection.emit("send_audio_data", { audio: audioData });
                };
                //* setIsRecording(true)를 호출하여 녹음 상태를 설정합니다.
                setIsRecording(true);
            } else {
                console.error("No connection");
            }
        })();
        return () => {
            if (isRecording) {
                processorRef.current?.disconnect();
                audioInputRef.current?.disconnect();
                if (audioContextRef.current?.state !== "closed") {
                    audioContextRef.current?.close();
                }
            }
        };
    }, [connection, isRecording, recorder]);

    //! 스크롤의 위치를 최근 메시지에 위치
    useEffect(() => {
        if (!chatContainerEl.current) return;

        const chatContainer = chatContainerEl.current;
        const { scrollHeight, clientHeight } = chatContainer;

        if (scrollHeight > clientHeight) {
            chatContainer.scrollTop = scrollHeight - clientHeight;
        }
    }, [chats.length, STTMessage.length, currentRecognition]);

    const onSendMessage = handleSubmit((data) => {
        const { message } = data;
        if (!message) return alert("메시지를 입력해 주세요.");
        const chatTextMessage = {
            user_nickname: storedData.userNickname,
            message: message,
            // room_id: current_room_id,
            room_id: userState.currentRoom.room_id,
        };
        wss.textMessageSender(chatTextMessage);
        setChats((prevChats) => [...prevChats, chatTextMessage]);
        console.log(chats);

        // 폼 데이터 전송 후 폼 리셋
        setValue("message", "");
    });
    //!

    //! 룸 나가기를 하면 userState의 current room 을 {}로 설정
    const RoomOutHandler = () => {
        // ! 소켓 룸에서도 나가는 기능 해야함
        wss.socket.emit(
            "leave-room",
            { room_id: userState.currentRoom.room_id },
            () => {
                console.log(
                    `${storedData.userNickname} 님이 ${userState.currentRoom.room_id}에서 나가셨습니다.`
                );
            }
        );
        setUserState({
            ...userState,
            currentRoom: {
                room_id: "",
                room_name: "",
                room_summary: "",
                room_password: "",
            },
        });

        console.log(userState);
        const siteUrl = window.location.origin;
        window.location.href = `${siteUrl}/${userState.userId}/finished`;
        navigate(`/${userState.userId}`);
    };

    return (
        <>
            <BaseContainer
                variants={containerVariants}
                initial="start"
                animate="end"
            >
                <MainContainer finished={completeStudy}>
                    <SideOpenToolBox>
                        {completeStudy || (
                            <>
                                <IOButton
                                    className={
                                        isRecording
                                            ? "btn-danger"
                                            : "btn-outline-light"
                                    }
                                    onClick={connect}
                                    disabled={isRecording}
                                    style={{ borderRadius: "30px 0 0 30px" }}
                                >
                                    Start
                                </IOButton>
                                <IOButton
                                    className="btn-outline-light"
                                    onClick={disconnect}
                                    disabled={!isRecording}
                                    style={{ borderRadius: " 0 30px 30px 0" }}
                                >
                                    Stop
                                </IOButton>
                            </>
                        )}
                    </SideOpenToolBox>

                    <Container finished={completeStudy}>
                        <Routes>
                            <Route path="playground" element={<Playground />} />
                            <Route path="summary" element={<Summary />} />
                            <Route path="question" element={<Question />} />
                            <Route path="quiz" element={<Quiz />} />
                            <Route path="*" element={<PageRoute />} />
                        </Routes>

                        {/* //! 영상 및 스크린쉐어 페이지 */}
                    </Container>
                </MainContainer>

                <RoomList finished={completeStudy}>
                    <ToggleContainer>
                        <ChatToggle
                            onClick={() => {
                                setIsChatToggle((prev) => !prev);
                            }}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 17,
                            }}
                        >
                            {isChatToggle ? (
                                <FontAwesomeIcon
                                    icon={faComment}
                                    style={{ color: "#ffc700" }}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faCommentSlash}
                                    style={{ color: "#ffc700" }}
                                />
                            )}
                        </ChatToggle>
                        <motion.nav
                            initial={false}
                            animate={isToggle ? "open" : "closed"}
                        >
                            <MotionBtn
                                onClick={() => {
                                    setIsToggle(!isToggle);
                                    setIsChatToggle((prev) => !prev);
                                }}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 17,
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faBars}
                                    color="#ffc700"
                                />
                            </MotionBtn>
                            <Ul
                                variants={{
                                    open: {
                                        clipPath:
                                            "inset(0% 0% 0% 0% round 10px)",
                                        transition: {
                                            type: "spring",
                                            bounce: 0,
                                            duration: 0.7,
                                            delayChildren: 0.3,
                                            staggerChildren: 0.05,
                                        },
                                    },
                                    closed: {
                                        clipPath:
                                            "inset(10% 50% 90% 50% round 10px)",
                                        transition: {
                                            type: "spring",
                                            bounce: 0,
                                            duration: 0.3,
                                        },
                                    },
                                }}
                                style={{
                                    pointerEvents: isToggle ? "auto" : "none",
                                }}
                            >
                                <Li variants={itemVariants}>
                                    <Link
                                        to={"playground"}
                                        onClick={() => {
                                            setClick("playground");
                                        }}
                                    >
                                        {click === "playground" ? (
                                            <span style={{ color: "#ffc700" }}>
                                                PLAYGROUND
                                            </span>
                                        ) : (
                                            <span>PLAYGROUND</span>
                                        )}
                                    </Link>
                                </Li>
                                <Li variants={itemVariants}>
                                    {completeStudy ? (
                                        <Link
                                            to={"summary"}
                                            onClick={() => {
                                                setClick("summary");
                                            }}
                                        >
                                            {click === "summary" ? (
                                                <span
                                                    style={{
                                                        color: "#ffc700",
                                                    }}
                                                >
                                                    SUMMARY
                                                </span>
                                            ) : (
                                                <span>SUMMARY</span>
                                            )}
                                        </Link>
                                    ) : (
                                        <span style={{ color: "#828282" }}>
                                            SUMMARY
                                        </span>
                                    )}
                                </Li>
                                <Li variants={itemVariants}>
                                    {completeStudy ? (
                                        <Link
                                            to={"question"}
                                            onClick={() => {
                                                setClick("question");
                                            }}
                                            className={
                                                completeStudy
                                                    ? ""
                                                    : "disabled-link"
                                            }
                                        >
                                            {click === "question" ? (
                                                <span
                                                    style={{
                                                        color: "#ffc700",
                                                    }}
                                                >
                                                    ASK to 토란
                                                </span>
                                            ) : (
                                                <span>ASK to 토란</span>
                                            )}
                                        </Link>
                                    ) : (
                                        <span style={{ color: "#828282" }}>
                                            ASK to 토란
                                        </span>
                                    )}
                                </Li>
                                <Li variants={itemVariants}>
                                    {completeStudy ? (
                                        <Link
                                            to={"quiz"}
                                            onClick={() => {
                                                setClick("quiz");
                                            }}
                                            className={
                                                completeStudy
                                                    ? ""
                                                    : "disabled-link"
                                            }
                                        >
                                            {click === "quiz" ? (
                                                <span
                                                    style={{
                                                        color: "#ffc700",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            fontSize: "32px",
                                                            color: "#ffcf22",
                                                        }}
                                                    >
                                                        OX
                                                    </span>
                                                    QUIZ
                                                </span>
                                            ) : (
                                                <span>
                                                    <span
                                                        style={{
                                                            fontSize: "32px",
                                                            color: "#ffcf22",
                                                        }}
                                                    >
                                                        O X
                                                    </span>
                                                    QUIZ
                                                </span>
                                            )}
                                        </Link>
                                    ) : (
                                        <span style={{ color: "#828282" }}>
                                            <span
                                                style={{
                                                    fontSize: "32px",
                                                }}
                                            >
                                                OX
                                            </span>
                                            QUIZ
                                        </span>
                                    )}
                                </Li>
                                <Li variants={itemVariants}>
                                    <RoomOutButton onClick={RoomOutHandler}>
                                        <FontAwesomeIcon
                                            icon={faRightFromBracket}
                                            fontSize={"30px"}
                                        />
                                    </RoomOutButton>
                                </Li>
                            </Ul>
                        </motion.nav>
                    </ToggleContainer>
                    {isChatToggle && (
                        <>
                            <ChatArea
                                ref={chatContainerEl}
                                finished={completeStudy}
                            >
                                {/*//! text 메세지 나오는 부분 */}
                                {chats.map((chat, index) => (
                                    <ChattingBox key={index}>
                                        {chat.user_nickname === "" ? (
                                            <div
                                                style={{
                                                    color: `#ffc700`,
                                                    fontWeight: "600",
                                                    fontSize: "20px",
                                                }}
                                            >
                                                발표자(STT)
                                            </div>
                                        ) : chat.user_nickname !==
                                          storedData.userNickname ? (
                                            <div
                                                style={{
                                                    color: `#ffc700`,
                                                    fontWeight: "600",
                                                    fontSize: "20px",
                                                }}
                                            >
                                                {chat.user_nickname}
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                        {chat.user_nickname === "" ? (
                                            <Message
                                                style={{
                                                    backgroundColor: "#424242",
                                                }}
                                            >
                                                {chat.message}
                                            </Message>
                                        ) : chat.user_nickname !==
                                          storedData.userNickname ? (
                                            <Message>{chat.message}</Message>
                                        ) : (
                                            <Message
                                                style={{
                                                    marginLeft: "30%",
                                                    width: "70%",
                                                    backgroundColor: "#FFD43B",
                                                    color: "#000000",
                                                }}
                                            >
                                                {chat.message}
                                            </Message>
                                        )}
                                    </ChattingBox>
                                ))}
                                {/*//! STT 메세지 나오는 부분 */}
                                {/* {STTMessage.map((message, idx) => (
                            <ChattingBox key={idx}>
                                <span style={{ color: `#ffc700` }}>발표자</span>
                                <Message>{message}</Message>
                            </ChattingBox>
                        ))} */}
                                <Message
                                    style={{
                                        width: "100%",
                                    }}
                                >
                                    {currentRecognition}
                                </Message>
                            </ChatArea>

                            <form onSubmit={onSendMessage}>
                                <InputTextStyle>
                                    <TextInput
                                        finished={completeStudy}
                                        type="text"
                                        {...register("message")} // useForm의 register 메소드로 폼 입력과 연결
                                    />
                                    <TextInputButton type="submit">
                                        SEND
                                    </TextInputButton>
                                </InputTextStyle>
                            </form>
                        </>
                    )}
                </RoomList>
            </BaseContainer>
        </>
    );
}

export default memo(Room);
