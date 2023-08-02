import React from "react";
import { connect } from "react-redux";
import { AuthLogin } from "../atoms";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { motion } from "framer-motion/dist/framer-motion";
import { buttonStyle, mainBgColor, scrollVariants } from "../components/Styles";
import { setIdentity, setRoomId } from "../store/actions";

const Room = styled(motion.div)`
    ${buttonStyle}
    box-shadow: none;
    background-color: rgba(0, 0, 0, 0.2);
    margin: 10px auto;
    font-size: 1rem;
    width: 90%;
    max-width: 400px;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    &:hover {
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.2);
        /* color: #00d2d3; */
        ${mainBgColor}
    }
`;

function Finished(props) {
    const { setIdentityAction, setRoomIdAction } = props;
    const navigate = useNavigate();
    const [userState, setUserState] = useRecoilState(AuthLogin);

    const moveToRoom = (e) => {
        console.log(e.target.id);
        // post로 정보 보내줌. 보내주는 것은 없고 url로 백에서 찾아줄 것으로 판단함
        // response로 룸 클릭한 룸 정보를 받아옴
        //! 그 정보를 기준으로 userState에 current room을 설정

        // navigate(`/room/${e.target.id}`);
    };
    const onValid = async (e) => {
        console.log(e.target.id);
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
        } catch (err) {
            console.log(err);
        }
    };

    // console.log(userState.userJoinedRoomList);
    return (
        <>
            {userState.userJoinedRoomList.map(
                ({ room_id, room_name, room_summary }) => (
                    <Room
                        variants={scrollVariants}
                        key={room_id}
                        onClick={onValid}
                        id={room_id}
                    >
                        {room_name}
                    </Room>
                )
            )}
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
