import React from "react";
import { useRecoilState } from "recoil";
import { AlarmAtom } from "../atoms";
import { styled } from "styled-components";

const AlarmDiv = styled.div`
    position: absolute;
    width: 300px;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.3);
    color: #00d2d3;
`;

function Alarm(text) {
    const { alarm, setAlarm } = useRecoilState(AlarmAtom);
    return <>{alarm && <AlarmDiv>${text}</AlarmDiv>}</>;
}

export default Alarm;
