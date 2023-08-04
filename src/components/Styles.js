// import { motion } from "framer-motion/dist/framer-motion";
import styled, { css } from "styled-components";

export const boxVariants = {
    start: { opacity: 0, scale: 0.5 },
    end: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            duration: 2,
            bounce: 0.65,
            delayChildren: 0.3,
            staggerChildren: 0.1,
        },
    },
};

export const containerVariants = {
    start: { y: 100 },
    end: {
        y: 0,
        scale: 1,
        transition: {
            // duration: 0.5,
            delayChildren: 0.2,
            staggerChildren: 0.1,
        },
    },
};

export const inputVariants = {
    start: {
        opacity: 0,
        y: 100,
    },
    end: {
        opacity: 1,
        y: 0,
    },
};
export const scrollVariants = {
    start: {
        opacity: 0,
    },
    end: {
        opacity: 1,
    },
};
export const leftSideBoxVariants = {
    start: {
        opacity: 0,
        x: -300,
    },
    end: {
        opacity: 1,
        x: 0,
    },
};

export const buttonStyle = css`
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.2);
    padding: 20px 10px;
    font-size: 24px;
    font-weight: 600;
    border-radius: 20px;

    border: none;
`;

export const containerStyle = css`
    background-color: rgba(0, 0, 0, 0.2);
    width: 500px;
    border-radius: 30px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const mainBgColor = css`
    background-color: #07dfb4;
    background-color: #00d2d3;
`;

export const reverseColor = css`
    background-color: #fe3411;
`;

export const reverseTextColor = css`
    color: #fe3411;
`;

export const Tabs = styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    justify-content: space-around;
    margin-bottom: 10px;
`;
export const Tab = styled.div`
    height: 50px;
    width: 100%;
    transition: 0.3s all ease-in-out;
    font-weight: 600;
    font-size: 1.2em;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &:hover {
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.2);
        font-size: 1.4em;
    }
    a {
        padding: 20px;
    }
`;
export const VerticalLine = styled.div`
    height: 100%;
    width: 1px;
    background-color: rgba(0, 0, 0, 0.3);
`;
