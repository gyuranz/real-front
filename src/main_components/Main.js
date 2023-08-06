import { styled } from "styled-components";
import {
    Tab,
    Tabs,
    buttonStyle,
    containerStyle,
    containerVariants,
    disabledTextColor,
    paperCardBgColor,
    reverseColor,
} from "../components/Styles";

import { useRecoilState } from "recoil";
import { AuthLogin } from "../atoms";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion/dist/framer-motion";
import Finished from "./Finished";

import JoinRoomPage from "../JoinRoomPage/JoinRoomPage";
import CreateRoomPage from "../CreateRoomPage/CreateRoomPage";
import PageRoute from "../components/PageRoute";

const BaseContainer = styled(motion.div)`
    ${containerStyle}
    width: 100vw;
    height: 100vh;
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start; */
    /* display: grid;
    grid-template-columns: 3.5fr 1fr 1.5fr; */
`;

const MainContainer = styled.div`
    ${containerStyle}
    /* ${paperCardBgColor} */
    /* background-color: transparent; */
    box-shadow: none;
    width: 1000px;
    height: 100%;
    position: relative;
    overflow: auto;
`;

const RoomList = styled(motion.div)`
    ${containerStyle}
    box-shadow: none;
    width: 500px;
    height: 100%;
    display: block;
    /* border-radius: 30px; */
    overflow: none;
    position: relative;
`;

const LogoutButton = styled(motion.div)`
    /* ${buttonStyle} */
    /* ${paperCardBgColor} */
    padding: 10px;
    font-size: 1rem;
    ${disabledTextColor}
    font-weight: 600;
    z-index: 999;
    width: 100px;
    /* position: absolute;
    bottom: -220px;
    right: 200px; */
    text-align: center;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    &:hover {
        scale: 1.1;
    }
`;

const HelloUser = styled(motion.div)`
    font-size: 32px;
    top: -200px;
    right: 200px;
    position: absolute;
`;

function Main() {
    const [click, setClick] = useState("finished");
    const { uid } = useParams();
    const navigate = useNavigate();
    // const [isLoading, setIsLoading] = useState(false);
    const [loadedUsers, setLoadedUsers] = useState([]);
    const storedData = JSON.parse(localStorage.getItem("userData"));
    const [userState, setUserState] = useRecoilState(AuthLogin);
    // const authFunc = useRecoilValue(AuthAtom);
    // console.log(authFunc);

    const LogoutHandler = () => {
        localStorage.removeItem("userData");

        console.log(userState);
        navigate("/auth/login");
    };

    useEffect(() => {
        //! 임시 코드

        if (storedData && uid === storedData.userId) {
            console.log("hello, you are right user");
            console.log(userState.userJoinedRoomList);
        } else {
            navigate("/auth/login");
        }

        const sendRequest = async () => {
            try {
                if (storedData) {
                    const response = await fetch(
                        `${process.env.REACT_APP_BACKEND_URL}/${storedData.userId}`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: " Bearer " + storedData.token,
                            },
                        }
                    );

                    const responseData = await response.json();
                    if (!response.ok) {
                        throw new Error(responseData.message);
                    }

                    setLoadedUsers(responseData.user.user_joined_room_list);
                    setUserState({
                        ...userState,
                        isLoggedIn: true,
                        userId: responseData.user.user_id,
                        userNickname: responseData.user.user_nickname,
                        userJoinedRoomList:
                            responseData.user.user_joined_room_list,
                    });
                } else {
                    navigate("/auth/login");
                }
            } catch (error) {
                console.log("❌", error);
                // console.log("❌", error.data.message);
            }
        };

        sendRequest();
    }, []);

    return (
        <>
            <BaseContainer
                variants={containerVariants}
                initial="start"
                animate="end"
            >
                <RoomList>
                    {/* <HelloUser>
                        {storedData && storedData.userNickname}님, 반가워요!
                    </HelloUser> */}
                    <Tabs>
                        <Tab>
                            <Link
                                to={`/${userState.userId}/finished`}
                                onClick={() => {
                                    setClick("finished");
                                }}
                            >
                                {click === "finished" ? (
                                    <span style={{ color: "#1de9b6" }}>
                                        FINISHED
                                    </span>
                                ) : (
                                    <span>FINISHED</span>
                                )}
                            </Link>
                        </Tab>
                        <Tab>
                            <Link
                                to={`/${userState.userId}/join`}
                                onClick={() => {
                                    setClick("join");
                                }}
                            >
                                {click === "join" ? (
                                    <span style={{ color: "#1de9b6" }}>
                                        JOIN
                                    </span>
                                ) : (
                                    <span>JOIN</span>
                                )}
                            </Link>
                        </Tab>
                        <Tab>
                            <Link
                                to={`/${userState.userId}/create`}
                                onClick={() => {
                                    setClick("create");
                                }}
                            >
                                {click === "create" ? (
                                    <span style={{ color: "#1de9b6" }}>
                                        CREATE
                                    </span>
                                ) : (
                                    <span>CREATE</span>
                                )}
                            </Link>
                        </Tab>
                    </Tabs>
                    {/* <LogoutButton onClick={LogoutHandler}>LOG OUT</LogoutButton> */}
                </RoomList>
                <MainContainer>
                    <Routes>
                        <Route path="finished" element={<Finished />} />
                        <Route path="join" element={<JoinRoomPage />} />
                        <Route path="create" element={<CreateRoomPage />} />
                        <Route path="*" element={<PageRoute />} />
                    </Routes>
                </MainContainer>
                {/* <VerticalLine /> */}
            </BaseContainer>
        </>
    );
}

export default Main;
