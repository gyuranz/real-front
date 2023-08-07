import React from "react";
import { connect } from "react-redux";
import { AuthLogin } from "../atoms";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { motion, Variants } from "framer-motion/dist/framer-motion";
import {
    buttonStyle,
    scrollVariants,
    secondaryBgColor,
    secondaryTextColor,
} from "../components/Styles";
import { setIdentity, setRoomId } from "../store/actions";
import "./Finished.css";

const cardVariants = {
    offscreen: {
        y: 300,
    },
    onscreen: {
        y: 50,
        rotate: 10,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
        },
    },
};

function Card({ date, title, onClick, roomId }) {
    return (
        <motion.div
            className="card-container"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
        >
            <img className="splash" src="/img/file.png" alt="" />
            <motion.div
                className="card"
                id={roomId}
                variants={cardVariants}
                onClick={onClick}
            >
                <div>{date}</div>
                {title}
            </motion.div>
            <img className="splashOpen" src="/img/fileOpen.png" alt="" />
        </motion.div>
    );
}

const Container = styled.div`
    width: 900px;
    height: 80vh;
    overflow: auto;
`;

const Room = styled(motion.div)`
    ${buttonStyle}
    ${secondaryTextColor}
    box-shadow: none;
    display: inline-block;
    /* background-color: rgba(0, 0, 0, 0.2); */
    margin: 10px auto;

    text-align: center;
    font-size: 1rem;
    width: 450px;
    cursor: pointer;
    transition: 0.3s ease-in-out;
`;

function Finished(props) {
    const { setIdentityAction, setRoomIdAction } = props;
    const navigate = useNavigate();
    const [userState, setUserState] = useRecoilState(AuthLogin);

    // const moveToRoom = (e) => {
    //     console.log(e.target.id);
    //     // post로 정보 보내줌. 보내주는 것은 없고 url로 백에서 찾아줄 것으로 판단함
    //     // response로 룸 클릭한 룸 정보를 받아옴
    //     //! 그 정보를 기준으로 userState에 current room을 설정

    //     // navigate(`/room/${e.target.id}`);
    // };
    const onValid = async (e) => {
        console.log(e.target);
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/${userState.userId}/finished`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: " Bearer " + userState.token,
                    },
                    body: JSON.stringify({
                        room_id: e.target.id,
                    }),
                }
            );
            const responseData = await response.json();

            setRoomIdAction(responseData.room_id);
            setIdentityAction(userState.userId);
            if (!response.ok) {
                throw new Error(responseData.message);
            }

            setUserState({
                ...userState,
                currentRoom: {
                    room_id: responseData.room_id,
                    room_name: responseData.room_name,
                    room_summary: responseData.room_summary,
                    room_password: responseData.room_password,
                },
            });

            navigate(`/room/${responseData.room_id}/playground`);
        } catch (error) {
            console.log("❌", error);
            // console.log("❌", error.data.message);
        }
    };

    // console.log(userState.userJoinedRoomList);
    return (
        <>
            <Container>
                {userState.userJoinedRoomList.map(
                    ({ room_id, room_name, room_summary }) => (
                        <Room
                            variants={scrollVariants}
                            // key={room_id}
                            // onClick={onValid}
                            key={room_id}
                        >
                            <Card
                                onClick={onValid}
                                id={`${room_id}Card`}
                                // id={room_id}
                                date="2023.08.12."
                                title={room_name}
                                roomId={room_id}
                            />
                        </Room>
                    )
                )}
                {/* {food.map(([emoji, hueA, hueB]) => (
                    <Card emoji="abc" hueA="0" hueB="0" key="abc" />
                ))} */}
            </Container>
        </>
    );
}

const mapStoreStateToProps = (state) => {
    return {
        ...state,
    };
};

const mapActionsToProps = (dispatch) => {
    return {
        setIdentityAction: (identity) => dispatch(setIdentity(identity)),
        setRoomIdAction: (roomId) => dispatch(setRoomId(roomId)),
    };
};
// export default Finished;
export default connect(mapStoreStateToProps, mapActionsToProps)(Finished);
