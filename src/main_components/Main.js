import { styled } from "styled-components";
import {
    Tab,
    Tabs,
    VerticalLine,
    buttonStyle,
    containerStyle,
    containerVariants,
    reverseColor,
} from "../components/Styles";

import { useRecoilState } from "recoil";
import { AuthLogin, MicCondition, VolumeContidion } from "../atoms";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion/dist/framer-motion";
import Finished from "./Finished";

import JoinRoomPage from "../JoinRoomPage/JoinRoomPage";
import CreateRoomPage from "../CreateRoomPage/CreateRoomPage";

const BaseContainer = styled(motion.div)`
    ${containerStyle}
    width: 95vw;
    height: 90vh;
    display: grid;
    grid-template-columns: 3.5fr 1fr 1.5fr;
`;

const MainContainer = styled.div`
    ${containerStyle}
    background-color: transparent;
    box-shadow: none;
    width: 66.5vw;
    height: 90vh;
    position: relative;
    border-radius: 30px 0 0 30px;
`;

const RoomList = styled(motion.div)`
    ${containerStyle}
    background-color: transparent;
    box-shadow: none;
    width: 28.5vw;
    height: 90vh;
    display: block;
    border-radius: 0 30px 30px 0;
`;

const LogoutButton = styled(motion.div)`
    ${buttonStyle}
    ${reverseColor}
    font-size: 1rem;
    color: white;
    z-index: 999;
    position: absolute;
    top: 5vh;
    cursor: pointer;
`;

function Main() {
    const { uid } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
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
        /*
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
            } catch (err) {
                console.log(err);
            }
        };
        
        sendRequest(); */
    }, []);

    return (
        <>
            <LogoutButton onClick={LogoutHandler}>LOG OUT</LogoutButton>
            <BaseContainer
                variants={containerVariants}
                initial="start"
                animate="end"
            >
                <MainContainer>
                    <h1>{storedData && storedData.userNickname}</h1>
                </MainContainer>
                <VerticalLine />

                <RoomList>
                    <Tabs>
                        <Tab>
                            <Link to={"finished"}>FINISHED</Link>
                        </Tab>
                        <VerticalLine />
                        <Tab>
                            <Link to={"join"}>JOIN</Link>
                        </Tab>
                        <VerticalLine />
                        <Tab style={{ borderRadius: "0 30px 0 0" }}>
                            <Link to={"create"}>CREATE</Link>
                        </Tab>
                    </Tabs>

                    {/* <Outlet /> */}
                    <Routes>
                        <Route path="finished" element={<Finished />} />
                        <Route path="join" element={<JoinRoomPage />} />
                        <Route path="create" element={<CreateRoomPage />} />
                    </Routes>
                </RoomList>
            </BaseContainer>
        </>
    );
}

export default Main;