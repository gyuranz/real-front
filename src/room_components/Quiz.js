import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { getQuiz } from "../utils/api";
import { AuthLogin } from "../atoms";
import { useRecoilValue } from "recoil";
import Overlay from "../ChattingPage/Overlay";
import { primaryColor, primaryTextColor } from "../components/Styles";
import "./Quiz.css";

const Board = styled.div`
    background-color: rgba(255, 255, 255, 0.1);
    ${primaryTextColor}
    height: 95vh;
    overflow-y: auto;
    border-radius: 10px;
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
    ${primaryColor}
    font-size: 1.5em;
    display: flex;
    justify-content: center;
    span {
        transition: 0.3s ease-in-out;
        line-height: 70px;
        text-align: center;
        display: block;
        color: transparent;
        width: 100px;
        height: 50px;
        border-radius: 10px;
        font-weight: 400;
        font-size: 40px;
        margin-left: 20px;
    }
`;

const OX = styled.div`
    display: inline-block;
    margin-left: 30px;
    color: #303030;
    font-size: 60px;
    font-weight: 900;
    cursor: pointer;
    &:hover {
        ${primaryColor}
        scale: 1.2;
    }
    &:active {
        scale: 0.8;
    }
    transition: 0.2s ease-in-out;
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
        const Oanswer = event.target.parentElement.children[0];
        const Xanswer = event.target.parentElement.children[1];
        const answer = event.target.parentElement.children[2];
        const isCorrect = answer.innerText.search(event.target.innerText); // 정답 + , 오답 -
        Oanswer.style.display = "none";
        Xanswer.style.display = "none";
        event.target.style = "color:inherit";

        const answerText = document.createElement("span");
        if (isCorrect === -1) {
            answer.style = "color: #fe3411";
            event.target.style = "color: #424242";
        }
        answerText.classList.add("answerText");
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
                              <div>
                                  <Answer key={index}>
                                      <OX onClick={showAnswer}>O</OX>
                                      <OX onClick={showAnswer}>X</OX>
                                      <span id={`answer${index}`}>{quiz}</span>
                                  </Answer>
                              </div>
                          )
                      )
                    : "로딩중..."}
            </Board>
        </>
    );
}

export default Quiz;
