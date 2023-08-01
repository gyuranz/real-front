import { motion } from "framer-motion/dist/framer-motion";
import React from "react";
import { styled } from "styled-components";
import { buttonStyle, reverseColor } from "./Styles";
import { useNavigate } from "react-router-dom";

const MainButton = styled(motion.button)`
    ${buttonStyle}
    ${reverseColor}
    width: 300px;
    cursor: pointer;
`;

function PageRoute() {
    const navigate = useNavigate();
    const storedData = JSON.parse(localStorage.getItem("userData"));
    console.log(storedData);

    const goToMain = () => {
        storedData
            ? navigate(`/${storedData.userId}/finished`)
            : navigate("/auth/login");
    };
    goToMain();
    return <MainButton onClick={goToMain}> move to MAIN</MainButton>;
}

export default PageRoute;
