import { useRecoilState } from "recoil";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { AuthLogin } from "../atoms";
import {
    disabledTextColor,
    mainBgColor,
    primaryColor,
    primaryTextColor,
    reverseTextColor,
} from "../components/Styles";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion/dist/framer-motion";

const Board = styled.div`
    padding: 20px 10px;
    padding-top: 30px;
    border-radius: 30px;
    min-height: 200px;
    max-height: 83vh;
    overflow: auto;
    ${primaryTextColor}
`;

const Card = styled.div`
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 5px;
    padding: 3px 3px;
    position: relative;
`;
const Image = styled.img`
    width: 80%;
`;
const UpdateButton = styled.button`
    ${mainBgColor}
    position: absolute;
    text-align: center;
    width: 80px;
    height: 40px;
    line-height: 40px;
    font-weight: 600;
    top: 0vh;
    border-radius: 10px;
    right: 1vw;
    border: none;
`;
const AddButton = styled.button`
    ${reverseTextColor}
    position: absolute;
    text-align: center;
    width: 80px;
    height: 40px;
    line-height: 40px;
    font-weight: 600;
    top: 5vh;
    border-radius: 10px;
    right: 1vw;
    border: none;
`;

const ModifiedInput = styled.input`
    width: 100%;
    height: fit-content;
    padding: 10px;
    font-size: 1em;
    background-color: transparent;
    border: none;
    overflow: auto;
    ${primaryColor}
`;
const AddInput = styled.input`
    width: 100%;
    height: auto;
    padding: 10px;
    font-size: 1em;
    background-color: white;
    border: none;
`;

const OneLineDiv = styled(motion.div)`
    transition: 0.3s ease-in-out;
    &:hover {
        ${disabledTextColor}
    }
    &:hover ~ .hoverOver {
        opacity: 1;
    }
`;

const ModifyImage = styled.img`
    position: absolute;
    background-color: transparent;
    border: none;
    top: 0;
    right: 50px;
    width: 30px;
    height: 30px;
    opacity: 0;
    &:hover {
        opacity: 1;
    }
    transition: 0.8s ease-in-out;
`;
const DeleteImage = styled.img`
    position: absolute;
    background-color: transparent;
    border: none;
    top: 0;
    right: 10px;
    width: 30px;
    height: 30px;
    opacity: 0;
    &:hover {
        opacity: 1;
    }
    transition: 0.8s ease-in-out;
`;

//! summay 클릭시 fetch로 summary 데이터를 가져옴.
//! 가져온 데이터를 배열로 바꾼후 (. 기준 혹은 다른 기준을 정해야 할듯)
function Summary() {
    // const navigate = useNavigate();
    // const [summaryArray, setSummaryArray] = useRecoilState(SummaryAtom);
    //! 추가 및 삭제는 summaryArray를 통해서 하자. useState사용으로 변경
    const [isSave, setIsSave] = useState(false);
    const [userState, setUserState] = useRecoilState(AuthLogin);
    const [idNumber, setIdNumber] = useState(0);
    const [summaryArray, setSummaryArray] = useState([]);
    const [isAdd, setIsAdd] = useState(false);
    const [isModify, setIsModify] = useState("");
    const [modifiedText, setModifiedText] = useState("");
    const [addText, setAddText] = useState("");
    const [sendSummary, setSendSummary] = useState([]);

    const onChange = (event) => {
        // console.log(event.target);
        const text = event.target.value;
        setModifiedText(text);
        console.log(modifiedText);
    };
    const onAddChange = (event) => {
        const text = event.target.value;
        setAddText(text);
        console.log(addText);
    };
    const onAddSubmit = (event) => {
        event.preventDefault();
        const inputValue = document.getElementById("inputValue");
        setSummaryArray([
            ...summaryArray,
            {
                id: (Date.now() + Math.random()).toString(),
                text: inputValue.value,
            },
        ]);
        setIdNumber((prev) => prev + 1);
        setAddText("");
    };

    const onModify = (event) => {
        console.log(event);
        // console.log(event.target.parentElement.children[0]);
        setModifiedText(event.target.parentElement.children[0].innerText);
        event.target.parentElement.children[0].innerText = "";
        setIsModify(event.target.id);
    };
    const onSubmit = (event) => {
        event.preventDefault();
        const textId = event.target.parentElement.children[0].id;
        const inputValue = document.getElementById(`${textId}Input`);
        setSummaryArray(
            summaryArray.map((oneLine) => {
                if (oneLine.id === textId) {
                    return {
                        ...oneLine,
                        text: inputValue.value,
                    };
                }
                return oneLine;
            })
        );
        setIsModify("");
    };
    const onDelete = (event) => {
        console.log(event);
        const textId = event.target.parentElement.children[0].id;
        setSummaryArray(
            summaryArray.filter((oneLine) => oneLine.id !== textId)
        );
    };
    const onAdd = () => {
        setIsAdd((prev) => !prev);
    };

    const updateInfo = async () => {
        summaryArray.map(({ id, text }) =>
            setSendSummary((prev) => [...prev, text])
        );
    };

    const onSave = () => {
        updateInfo();
        setIsSave(true);
    };

    const onDragEnd = ({ draggableId, destination, source }) => {
        if (!destination) return;
        setSummaryArray((oneLine) => {
            const copySummary = [...oneLine];
            const copyObject = copySummary[source.index];
            // 1. delete item in source.index
            copySummary.splice(source.index, 1);
            // 2. insert item in destination.index
            copySummary.splice(destination?.index, 0, copyObject);

            return copySummary;
        });
    };
    const updateSummary = async () => {
        await updateInfo();
        console.log(sendSummary, "✅");
        if (sendSummary !== []) {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_BACKEND_URL}/room/${userState.currentRoom.room_id}/update`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: " Bearer " + userState.token,
                        },
                        body: JSON.stringify({
                            user_nickname: userState.userNickname,
                            message_summary: sendSummary,
                        }),
                    }
                );
                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                }
            } catch (error) {
                console.log("❌", error);
            }
        }
    };

    useEffect(() => {
        //! 페이지 이동마다 새로 뜸, 수정 요망
        const sendRequest = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_BACKEND_URL}/room/${userState.currentRoom.room_id}/summary`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: " Bearer " + userState.token,
                        },
                        body: JSON.stringify({
                            user_nickname: userState.userNickname,
                        }),
                    }
                );

                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                // https://aitolearn.s3.ap-northeast-2.amazonaws.com/
                // for (let i = 0; )
                console.log(responseData);
                for (const line of responseData.summaryfromDB) {
                    // if (responseData.summaryfromDB[0].img_url) {
                    //     const img_url = responseData.summaryfromDB[0].img_url;
                    //     // console.log(img_url);
                    //     const img_object = {
                    //         id: Date.now().toString(),
                    //         text: img_url,
                    //     };

                    //     setSummaryArray((prev) => [...prev, img_object]);
                    // }

                    const summaryOneLine = line.message_summary;
                    for (const item of summaryOneLine) {
                        const item_object = {
                            id: (Date.now() + Math.random()).toString(),
                            text: item,
                        };
                        setSummaryArray((prev) => [...prev, item_object]);
                    }
                }
            } catch (error) {
                console.log("❌", error);

                // navigate("/");
                // console.log("❌", error.data.message);
            }
        };
        sendRequest();
    }, []);
    console.log("✅", summaryArray);
    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <div>
                    <Droppable droppableId="one">
                        {(provided) => (
                            <Board
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {summaryArray.map((oneLine, index) =>
                                    // draggable 에서 key와 draggableId는 동일해야함
                                    // 그렇지 않으면 버그 발생
                                    oneLine.text !== "" &&
                                    oneLine.text.slice(-10) === "learnHello" ? (
                                        <Draggable
                                            key={oneLine.id}
                                            draggableId={oneLine.id}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <Card
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    id={oneLine.id}
                                                >
                                                    <Image
                                                        alt="image"
                                                        src={`https://aitolearn.s3.ap-northeast-2.amazonaws.com/${oneLine.text}`}
                                                    />
                                                </Card>
                                            )}
                                        </Draggable>
                                    ) : (
                                        oneLine.text !== "" && (
                                            <Draggable
                                                key={oneLine.id}
                                                draggableId={oneLine.id}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <Card
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <OneLineDiv
                                                            id={oneLine.id}
                                                        >
                                                            {oneLine.text}
                                                        </OneLineDiv>

                                                        <ModifyImage
                                                            alt="MODIFY"
                                                            className="hoverOver"
                                                            src="/img/modify_main.png"
                                                            id={`${oneLine.id}Modify`}
                                                            onClick={onModify}
                                                        />
                                                        <DeleteImage
                                                            alt="DELETE"
                                                            className="hoverOver"
                                                            src="/img/delete_main.png"
                                                            id={`${oneLine.id}Modify`}
                                                            onClick={onDelete}
                                                        />

                                                        {isModify ===
                                                            `${oneLine.id}Modify` && (
                                                            <form
                                                                id={`${oneLine.id}Form`}
                                                                onSubmit={
                                                                    onSubmit
                                                                }
                                                            >
                                                                <ModifiedInput
                                                                    id={`${oneLine.id}Input`}
                                                                    value={
                                                                        modifiedText
                                                                    }
                                                                    onChange={
                                                                        onChange
                                                                    }
                                                                />
                                                            </form>
                                                        )}
                                                    </Card>
                                                )}
                                            </Draggable>
                                        )
                                    )
                                )}
                                {provided.placeholder}
                            </Board>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
            {isSave ? (
                <UpdateButton onClick={updateSummary}>UPDATE</UpdateButton>
            ) : (
                <UpdateButton onClick={onSave}>SAVE</UpdateButton>
            )}

            <AddButton onClick={onAdd}>ADD</AddButton>
            {isAdd && (
                <form onSubmit={onAddSubmit}>
                    <AddInput
                        id="inputValue"
                        value={addText}
                        onChange={onAddChange}
                    />
                </form>
            )}
        </>
    );
}

export default React.memo(Summary);
