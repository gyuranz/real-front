import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AuthLogin, CompleteStudy } from "../atoms";
import { motion } from "framer-motion/dist/framer-motion";
import { styled } from "styled-components";
import {
    Tab,
    Tabs,
    buttonStyle,
    containerStyle,
    containerVariants,
    leftSideBoxVariants,
    mainBgColor,
    reverseColor,
    reverseTextColor,
} from "../components/Styles";
import { useNavigate, Link, Routes, Route } from "react-router-dom";
// import {
//     faMicrophone,
//     faMicrophoneSlash,
//     faVolumeHigh,
//     faVolumeLow,
//     faVolumeXmark,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const Container = styled.div`
    /* background-color: rgba(0, 0, 0, 0.2); */
    height: 80vh;
    width: 1000px;
    /* padding: 10px; */
    //! MVP 끝나고 overflow 삭제
    /* overflow: auto; */
    position: relative;
`;

const InputTextStyle = styled.div`
    display: grid;
    grid-template-columns: 4fr 1fr;
`;

const TextInput = styled(motion.input)`
    ${buttonStyle}
    width: 300px;
    height: 6vh;
    font-size: 1.2rem;
`;
const IOButton = styled.button`
    border: none;
    background-color: transparent;
    position: absolute;
    top: -35px;
    padding: 10px;
    font-size: 1.2em;
    cursor: pointer;
`;
const SideOpenToolBox = styled(motion.div)`
    position: relative;
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
`;

const ChatArea = styled.div`
    width: 400px;
    height: 80vh;
    overflow-y: auto;
    background-color: rgba(255, 255, 255, 0.2);
`;

const ChattingBox = styled(motion.div)`
    margin: 10px 20px;
`;

const Message = styled.div`
    margin-bottom: 0.5rem;
    background: rgba(0, 0, 0, 0.1);
    font-size: 20px;
    font-weight: 600;
    color: white;
    /* max-width: 100%; */
    padding: 5px;
    border-radius: 0.5rem;
    word-break: break-all;
`;

const BaseContainer = styled(motion.div)`
    ${containerStyle}
    width: 1800px;
    height: 90vh;
    display: grid;
    grid-template-columns: 3.5fr 1fr 1.5fr;
`;

const MainContainer = styled.div`
    ${containerStyle}
    background-color: transparent;
    box-shadow: none;
    width: 1000px;
    height: 90vh;
    /* position: relative; */
    /* display: flex; */
    /* align-items: flex-start; */
    /* justify-content: baseline; */
    display: block;
    border-radius: 30px 0 0 30px;
`;

const RoomList = styled(motion.div)`
    ${containerStyle}
    background-color: transparent;
    box-shadow: none;
    width: 400px;
    height: 90vh;
    display: block;
    border-radius: 0 30px 30px 0;
`;

const RoomOutButton = styled(motion.div)`
    ${buttonStyle}
    ${reverseColor}
    color:white;
    padding: 10px;
    border-radius: 10px;
    font-size: 1.2rem;
    z-index: 999;
    position: absolute;
    top: 5vh;
    right: 2.5vw;
    cursor: pointer;
    &:hover {
        ${reverseTextColor}
        background-color: white;
    }
    transition: all 0.3s ease-in-out;
`;
//! 소켓 api 꼭 같이 수정해주기

// const current_room_id = window.location.pathname.split("/")[2];
// socket = io(`${process.env.REACT_APP_BACKEND_URL}/room`, {
//     query: { user: JSON.stringify(storedData.userNickname) },
// });
function Room() {
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
        if (data.isFinal) {
            setCurrentRecognition("...");
            //*
            setRecognitionHistory((old) => [...old, data.text]);
            setSTTMessage((prev) => [...prev, data.text]);
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
    }, [chats.length, STTMessage.length]);

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
        navigate(`/${userState.userId}`);
    };
    // console.log(userState);
    //! 현재 접속한 방이 유저가(db) 들어온 방에 있는지 확인
    // const current_room = useParams();

    // const room = userState.userJoinedRoomList.filter(
    //     (room) => room.room_id === current_room.room_id
    // );
    // // console.log(room[0]);
    // useEffect(() => {
    //     setUserState({
    //         ...userState,
    //         currentRoom: room[0],
    //     });
    // }, []);
    // console.log(userState);

    return (
        <>
            <RoomOutButton onClick={RoomOutHandler}>QUIT</RoomOutButton>
            <BaseContainer
                variants={containerVariants}
                initial="start"
                animate="end"
            >
                <Tabs style={{ margin: "0" }}>
                    <Tab>
                        <Link
                            to={"playground"}
                            onClick={() => {
                                setClick("playground");
                            }}
                        >
                            {click === "playground" ? (
                                <span style={{ color: "#1de9b6" }}>
                                    PLAYGROUND
                                </span>
                            ) : (
                                <span>PLAYGROUND</span>
                            )}
                        </Link>
                    </Tab>

                    <Tab>
                        {completeStudy ? (
                            <Link
                                to={"summary"}
                                onClick={() => {
                                    setClick("summary");
                                }}
                            >
                                {click === "summary" ? (
                                    <span style={{ color: "#1de9b6" }}>
                                        SUMMARY
                                    </span>
                                ) : (
                                    <span>SUMMARY</span>
                                )}
                            </Link>
                        ) : (
                            <span style={{ color: "#828282" }}>SUMMARY</span>
                        )}
                    </Tab>

                    <Tab>
                        {completeStudy ? (
                            <Link
                                to={"question"}
                                onClick={() => {
                                    setClick("question");
                                }}
                                className={completeStudy ? "" : "disabled-link"}
                            >
                                {click === "question" ? (
                                    <span style={{ color: "#1de9b6" }}>
                                        QUESTION
                                    </span>
                                ) : (
                                    <span>QUESTION</span>
                                )}
                            </Link>
                        ) : (
                            <span style={{ color: "#828282" }}>QUESTION</span>
                        )}
                    </Tab>

                    <Tab>
                        {completeStudy ? (
                            <Link
                                to={"quiz"}
                                onClick={() => {
                                    setClick("quiz");
                                }}
                                className={completeStudy ? "" : "disabled-link"}
                            >
                                {click === "quiz" ? (
                                    <span style={{ color: "#1de9b6" }}>
                                        QUIZ
                                    </span>
                                ) : (
                                    <span>QUIZ</span>
                                )}
                            </Link>
                        ) : (
                            <span style={{ color: "#828282" }}>QUIZ</span>
                        )}
                    </Tab>
                </Tabs>
                <MainContainer>
                    <SideOpenToolBox variants={leftSideBoxVariants}>
                        <IOButton
                            className={
                                isRecording ? "btn-danger" : "btn-outline-light"
                            }
                            onClick={connect}
                            disabled={isRecording}
                        >
                            Start
                        </IOButton>
                        <IOButton
                            className="btn-outline-light"
                            onClick={disconnect}
                            disabled={!isRecording}
                            style={{ left: "60px" }}
                        >
                            Stop
                        </IOButton>
                    </SideOpenToolBox>

                    <Container>
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

                <RoomList>
                    <ChatArea ref={chatContainerEl}>
                        {/*//! text 메세지 나오는 부분 */}
                        {chats.map((chat, index) => (
                            <ChattingBox key={index}>
                                <span style={{ color: `#1de9b6` }}>
                                    {chat.user_nickname !==
                                    storedData.userNickname
                                        ? chat.user_nickname
                                        : "ME"}
                                </span>
                                <Message>{chat.message}</Message>
                            </ChattingBox>
                        ))}
                        {/*//! STT 메세지 나오는 부분 */}
                        {STTMessage.map((message, idx) => (
                            <ChattingBox key={idx}>
                                <span style={{ color: `#1de9b6` }}>발표자</span>
                                <Message>{message}</Message>
                            </ChattingBox>
                        ))}
                        {/* <p>{currentRecognition}</p> */}
                    </ChatArea>

                    <form onSubmit={onSendMessage}>
                        <InputTextStyle>
                            <TextInput
                                type="text"
                                {...register("message")} // useForm의 register 메소드로 폼 입력과 연결
                            />
                            <TextInputButton type="submit">
                                SEND
                            </TextInputButton>
                        </InputTextStyle>
                    </form>
                </RoomList>
            </BaseContainer>
        </>
    );
}

export default memo(Room);
