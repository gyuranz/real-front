import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { getQuiz } from "../utils/api";
import { AuthLogin } from "../atoms";
import { useRecoilValue } from "recoil";
import Overlay from "../ChattingPage/Overlay";

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
    color: #1de9b6;
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
    const userState = useRecoilValue(AuthLogin);
    const [isLoading, setIsLoading] = useState(false);
    const [quiz, setQuiz] = useState([]);
    useEffect(() => {
        async function abc() {
            setIsLoading(true);
            const quizData = await getQuiz(userState.currentRoom.room_id);
            setIsLoading(false);
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
                {isLoading && <Overlay />}
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
