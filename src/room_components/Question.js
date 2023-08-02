import React, { useState } from "react";
import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion/dist/framer-motion";
import { buttonStyle, mainBgColor } from "../components/Styles";
import { useRecoilState } from "recoil";
import { AuthLogin } from "../atoms";

const Board = styled.div`
    height: 75.4vh;
    overflow-y: auto;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
`;

const InputTextStyle = styled.div`
    display: grid;
    grid-template-columns: 4fr 1fr;
`;

const QuestionInput = styled(motion.input)`
    ${buttonStyle}
    width: 60.5vw;
    height: 6vh;
    font-size: 1.2rem;
    border-radius: 10px 0 0 10px;
`;

const QuestionInputButton = styled(motion.button)`
    ${buttonStyle}
    ${mainBgColor}
    border-radius: 0 10px 10px 0;
    font-size: 1.2rem;
    /* line-height: 1.2rem; */
    width: 5vw;
    height: 6vh;
    cursor: pointer;
    color: white;
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

function Question() {
    const [userState, setUserState] = useRecoilState(AuthLogin);
    const [qna, setqna] = useState([]);
    const { register, handleSubmit, setValue } = useForm();

    function onSendMessage(e) {
        console.log(e);
    }
    return (
        <>
            <Board>
                {qna.map((reply, index) => (
                    <ChattingBox key={index}>
                        <span style={{ color: `#00d2d3` }}>
                            {reply.user_nickname === userState.userNickname
                                ? reply.user_nickname
                                : "토란이"}
                        </span>
                        <Message>{reply.message}</Message>
                    </ChattingBox>
                ))}
            </Board>
            ;
            <form onSubmit={handleSubmit(onSendMessage)}>
                <InputTextStyle>
                    <QuestionInput
                        type="text"
                        {...register("question")} // useForm의 register 메소드로 폼 입력과 연결
                        placeholder="궁금한 건 무엇이든 물어보세요."
                    />
                    <QuestionInputButton type="submit">
                        질문하기
                    </QuestionInputButton>
                </InputTextStyle>
            </form>
        </>
    );
}

export default Question;
