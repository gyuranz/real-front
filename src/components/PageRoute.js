import { motion } from "framer-motion/dist/framer-motion";
import React from "react";
import { styled } from "styled-components";
import { buttonStyle, reverseColor } from "./Styles";
import { useNavigate, Navigate } from "react-router-dom";

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

    // const goToMain = () => {
    //     storedData
    //         ? navigate(`/${storedData.userId}/finished`)
    //         : navigate("/auth/login");
    // };
    // goToMain();
    // return <MainButton onClick={goToMain}> move to MAIN</MainButton>;
    return (
        <>
            {storedData ? (
                <Navigate to={`/${storedData.userId}/finished`} />
            ) : (
                <Navigate to={"/auth/login"} />
            )}
        </>
    );
}

export default PageRoute;
