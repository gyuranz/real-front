import React from "react";
import CheckImg from "../resources/images/check.png";

import { styled } from "styled-components";

const CheckboxContainer = styled.div`
    display: flex;
    margin-top: 5px;
    align-items: center;
    margin-bottom: 40px;
`;

const CheckBoxConnection = styled.div`
    width: 25px;
    height: 25px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 8px;
    backdrop-filter: blur(80px);
    display: flex;
    align-items: center;
    justify-content: center;
`;
const CheckboxP = styled.p`
    font-weight: 400;
    margin-left: 15px;
`;

const CheckboxImg = styled.img`
    max-width: 100%;
    max-height: 100%;
`;

const OnlyWithAudioCheckbox = ({
    connectOnlyWithAudio,
    setConnectOnlyWithAudio,
}) => {
    const handleConnectionTypeChange = () => {
        setConnectOnlyWithAudio(!connectOnlyWithAudio);
    };

    return (
        <CheckboxContainer>
            <CheckBoxConnection onClick={handleConnectionTypeChange}>
                {connectOnlyWithAudio && (
                    <CheckboxImg src={CheckImg}></CheckboxImg>
                )}
            </CheckBoxConnection>
            <CheckboxP>Only audio</CheckboxP>
        </CheckboxContainer>
    );
};

export default OnlyWithAudioCheckbox;
