import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { getQuiz } from "../utils/api";
import { AuthLogin } from "../atoms";
import { useRecoilState } from "recoil";

const fakeData = [
    "퀴즈 1: Amazon S3는 블록 수준의 영구 스토리지이다.",
    "답: X",
    "퀴즈 2: 아이스크림은 물체이다.",
    "답: O",
    "퀴즈 3: 서울은 한국의 수도이다.",
    "답: O",
    "퀴즈 4: 열대 우림은 한국에 존재하는 지형이다.",
    "답: X",
    "퀴즈 5: 버섯은 동물이다.",
    "답: X",
    "퀴즈 6: 대한민국은 한자로 작성된 국가명이다.",
    "답: O",
    "퀴즈 7: 1미터는 100센티미터이다.",
    "답: O",
    "퀴즈 8: 밤하늘에 별은 나비 같다.",
    "답: X",
    "퀴즈 9: 거북이는 느린 동물이다.",
    "답: O",
    "퀴즈 10: 하늘은 파란색이다.",
    "답: O",
];

const Board = styled.div`
    height: 74.3vh;
    overflow-y: auto;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    margin: 1vh 1vh 2vh 0;
    display: grid;
    grid-template-columns: 4fr 1fr;
    justify-content: center;
    align-items: center;
`;

const Question = styled.div`
    margin-left: 30px;
    font-size: 2em;
    font-weight: 600;
`;

const Answer = styled.div`
    color: #00d2d3;
    font-size: 1.5em;
    display: flex;
    justify-content: center;
    span {
        cursor: pointer;
        transition: 0.3s ease-in-out;
        line-height: 50px;
        text-align: center;
        display: block;
        color: transparent;
        width: 100px;
        height: 50px;
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.2);
        font-weight: 400;
    }
`;

function Quiz() {
    const [userState, setUserState] = useRecoilState(AuthLogin);
    const [quiz, setQuiz] = useState([]);
    useEffect(() => {
        async function abc() {
            const quizData = await getQuiz(userState.currentRoom.room_id);
            const quizArray = quizData.data.result.split(/[.]\s+/g);
            console.log(quizArray);
            setQuiz((prev) => [...prev, ...quizArray]);
        }
        abc();
    }, []);
    console.log("✅", quiz);

    const showAnswer = (event) => {
        event.target.style = "color:inherit";
    };
    return (
        <>
            <Board>
                {quiz !== []
                    ? quiz.map((quiz, index) =>
                          index % 2 === 0 ? (
                              <Question key={index}>{quiz}</Question>
                          ) : (
                              <Answer key={index} onClick={showAnswer}>
                                  <span id={`answer${index}`}>{quiz}</span>
                              </Answer>
                          )
                      )
                    : "로딩중..."}
            </Board>
        </>
    );
}

export default Quiz;
