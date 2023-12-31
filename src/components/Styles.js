import { motion } from "framer-motion/dist/framer-motion";
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

export const logoVariants = {
    start: { opacity: 0, scale: 0.5, y: -300 },
    end: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            duration: 2,
            bounce: 0.65,
            delayChildren: 0.3,
            staggerChildren: 0.1,
        },
    },
};

export const menuVariants = {
    start: { y: -500 },
    end: {
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            duration: 0.8,
            bounce: 0.5,
            // delayChildren: 0.2,
            // staggerChildren: 0.1,
        },
    },
};

export const containerVariants = {
    start: { y: 100 },
    end: {
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
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
export const sideBoxVariants = {
    start: {
        x: 1000,
    },
    end: {
        x: 1000,
        scale: 1.2,
        transition: {
            duration: 0.5,
        },
    },
};

export const buttonStyle = css`
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.2);
    padding: 20px;
    font-size: 24px;
    font-weight: 600;
    border-radius: 20px;

    border: none;
`;

export const containerStyle = css`
    /* background-color: rgba(0, 0, 0, 0.2); */
    width: 300px;
    border-radius: 30px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const primaryColor = css`
    color: #ffcf22; // Primary (most of the UI)
`;
export const primaryBgColor = css`
    background-color: #303030; // Primary background colour (dialogs, e.t.c)
    /* background-color: #ffffff; */
`;
export const secondaryBgColor = css`
    background-color: #ffc700; // Secondary background colour (main UI background)
`;
export const paperCardBgColor = css`
    background-color: #424242; // Card background colour
`;
export const paperItemIconColor = css`
    color: #ffcf22; // Icon colour
`;
export const primaryTextColor = css`
    color: #ffffff; // Primary text colour
    /* color: #000000; */
`;
export const secondaryTextColor = css`
    /* color: rgba(255, 255, 255, 0.7); // Secondary text colour */
    color: rgba(0, 0, 0, 0.7); // Secondary text colour
`;
export const disabledTextColor = css`
    /* color: rgba(255, 255, 255, 0.5); // Disabled text colour */
    color: rgba(0, 0, 0, 0.5); // Disabled text colour
`;
export const dividerColor = css`
    /* color: rgba(255, 255, 255, 0.12); // Divider colour */
    color: rgba(0, 0, 0, 0.12); // Divider colour
`;
export const toggleButtonColor = css`
    background-color: #ffc700;
`;
export const toggleInkColor = css`
    color: #ffcf22;
`;
export const toggleBarColor = css`
    color: #ffc700;
`;

export const headerColor = css`
    color: #ffffff; // Card header text colour
`;
// Nav Menu
export const listBoxBgColor = css`
    background-color: #424242; // Listbox background colour
`;
export const listBoxColor = css`
    color: #ffffff; // Listbox text colour
`;
export const SelectedBgColor = css`
    background-color: #616161; // Listbox selected item background colour
`;

export const mainBgColor = css`
    /* background-color: #07dfb4;
    background-color: #00d2d3; */
    background-color: #ffc700;
`;

export const reverseColor = css`
    background-color: #fe3411;
`;

export const reverseTextColor = css`
    color: #fe3411;
`;

export const Tabs = styled(motion.div)`
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 100%;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`;
export const Tab = styled(motion.div)`
    ${primaryTextColor}
    height: 50px;
    width: 300px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 1.2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    a {
        padding: 20px;
    }
`;
export const VerticalLine = styled.div`
    height: 100%;
    width: 1px;
    background-color: rgba(0, 0, 0, 0.3);
`;
