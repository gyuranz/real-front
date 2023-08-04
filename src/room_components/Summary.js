import { useRecoilState } from "recoil";
import React, { useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { AuthLogin, SummaryAtom } from "../atoms";
import { mainBgColor } from "../components/Styles";
import { useNavigate } from "react-router-dom";

const Board = styled.div`
    padding: 20px 10px;
    padding-top: 30px;
    /* background-color: rgba(0, 0, 0, 0.2); */
    border-radius: 30px;
    min-height: 200px;
    max-height: 83vh;
    overflow: auto;
`;

const Card = styled.div`
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 5px;
    /* background-color: rgba(0, 0, 0, 0.2); */
    padding: 3px 3px;
`;
const Image = styled.img`
    width: 90%;
`;
const SaveButton = styled.div`
    ${mainBgColor}
    position: absolute;
    text-align: center;
    width: 80px;
    height: 80px;
    line-height: 80px;
    font-size: 24px;
    font-weight: 600;
    top: 0vh;
    border-radius: 50px;
    right: 1vw;
`;

//! summay 클릭시 fetch로 summary 데이터를 가져옴.
//! 가져온 데이터를 배열로 바꾼후 (. 기준 혹은 다른 기준을 정해야 할듯)
function Summary() {
    //! 추가 및 삭제는 summaryArray를 통해서 하자.
    const [userState, setUserState] = useRecoilState(AuthLogin);
    const [summaryArray, summaryArraySet] = useRecoilState(SummaryAtom);
    const navigate = useNavigate();

    const onDragEnd = ({ draggableId, destination, source }) => {
        if (!destination) return;
        summaryArraySet((oneLine) => {
            const copySummary = [...oneLine];
            const copyObject = copySummary[source.index];
            // 1. delete item in source.index
            copySummary.splice(source.index, 1);
            // 2. insert item in destination.index
            copySummary.splice(destination?.index, 0, copyObject);

            return copySummary;
        });
    };
    const modifyText = (event) => {
        // console.log(event.target);
    };
    useEffect(() => {
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
                if (responseData.summaryfromDB[0].img_url) {
                    const img_url = responseData.summaryfromDB[0].img_url;
                    console.log(img_url);
                    const img_object = {
                        id: Date.now().toString(),
                        text: img_url,
                    };

                    summaryArraySet((prev) => [...prev, img_object]);
                }

                const summaryOneLine =
                    responseData.summaryfromDB[0].message_summary;
                for (const item of summaryOneLine) {
                    const item_object = {
                        id: Date.now().toString(),
                        text: item,
                    };
                    summaryArraySet((prev) => [...prev, item_object]);
                }
            } catch (error) {
                console.log("❌", error);

                navigate("/");
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
                                    oneLine.text.slice(-5) === "Hello" ? (
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
                                                    onDoubleClick={modifyText}
                                                >
                                                    <Image
                                                        alt="image"
                                                        src={`https://aitolearn.s3.ap-northeast-2.amazonaws.com/${oneLine.text}`}
                                                    />
                                                </Card>
                                            )}
                                        </Draggable>
                                    ) : (
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
                                                    onDoubleClick={modifyText}
                                                >
                                                    {oneLine.text}
                                                </Card>
                                            )}
                                        </Draggable>
                                    )
                                )}
                                {provided.placeholder}
                            </Board>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
            <SaveButton>SAVE</SaveButton>
        </>
    );
}

export default React.memo(Summary);
