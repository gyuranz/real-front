import React, { useState } from "react";
import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion/dist/framer-motion";
import { buttonStyle, mainBgColor } from "../components/Styles";
import { useRecoilValue } from "recoil";
import { AuthLogin } from "../atoms";
import { postQuestion } from "../utils/api";

import Overlay from "../ChattingPage/Overlay";

const Board = styled.div`
    height: 87vh;
    width: 1400px;
    overflow-y: auto;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 20px 20px 0 0;
`;

const QuestionInput = styled(motion.input)`
    ${buttonStyle}
    width: 1200px;
    height: 70px;
    font-size: 1.4em;
    border-radius: 0 0 0 20px;
`;

const QuestionInputButton = styled(motion.button)`
    ${buttonStyle}
    ${mainBgColor}
    border-radius: 0 0 20px 0;
    font-size: 1.4rem;
    width: 200px;
    height: 70px;
    cursor: pointer;
    color: white;
`;
const ChattingBox = styled(motion.div)`
    margin: 10px 20px;
`;
const Message = styled.div`
    margin: 3px 0 10px 0;
    background: rgba(0, 0, 0, 0.1);
    font-size: 32px;
    font-weight: 600;
    color: white;
    /* max-width: 100%; */
    padding: 7px;
    border-radius: 0.5rem;
    word-break: break-all;
    display: inline-block;
`;

function Question() {
    const userState = useRecoilValue(AuthLogin);
    const [qna, setQna] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, setValue } = useForm();

    //! 답변이 오기 전에 질문을 또하면 터지기 때문에
    //! 글을 쓰면 답변올떄까지 전송버튼 막아놓기
    async function onSendQuestion({ question }) {
        const userQuestion = {
            user_nickname: userState.userNickname,
            message: question,
        };
        setQna((prev) => [...prev, userQuestion]);
        setValue("question", "");

        setIsLoading(true);
        const res = await postQuestion(userState.currentRoom.room_id, question);
        setIsLoading(false);
        // res =  { result: "answer" }
        console.log(res);
        const answer = {
            user_nickname: "토란이",
            message: res.data.result,
        };
        setQna((prev) => [...prev, answer]);
    }
    return (
        <>
            <Board>
                {isLoading && <Overlay />}
                {qna.map((reply, index) => (
                    <ChattingBox key={index}>
                        {reply.user_nickname === "토란이" ? (
                            <div
                                style={{
                                    color: `#ffd43b`,
                                    fontSize: "24px",
                                    fontWeight: "600",
                                }}
                            >
                                {reply.user_nickname}
                            </div>
                        ) : (
                            <div
                                style={{
                                    color: `#ffc700`,
                                    fontSize: "24px",
                                    fontWeight: "600",
                                }}
                            >
                                {reply.user_nickname}
                            </div>
                        )}

                        <Message>{reply.message}</Message>
                    </ChattingBox>
                ))}
            </Board>

            <form onSubmit={handleSubmit(onSendQuestion)}>
                <QuestionInput
                    type="text"
                    {...register("question")} // useForm의 register 메소드로 폼 입력과 연결
                    placeholder="궁금한 건 무엇이든 물어보세요.   스터디하신 내용을 기반으로 저 토란이가! 답변드려요~"
                />
                <QuestionInputButton type="submit">
                    질문하기
                </QuestionInputButton>
            </form>
        </>
    );
}

export default Question;
