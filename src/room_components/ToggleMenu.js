import { useState } from "react";
import { motion } from "framer-motion/dist/framer-motion";
import { styled } from "styled-components";
import { secondaryBgColor } from "../components/Styles";

const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const Ul = styled(motion.ul)`
    display: flex;
    flex-direction: column;
    background: var(--accent);
    list-style: none;
    margin: 0;
`;

const Li = styled(motion.li)`
    color: var(--background);
    display: block;
    list-style: none;
    margin: 0;
    padding: 10px;
    width: 300px;
    ${secondaryBgColor}
`;
const MotionBtn = styled(motion.button)`
    /* -webkit-appearance: button; */
    ${secondaryBgColor}
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    margin-bottom: 10px;
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
`;

export default function ToggleMenu() {
    const [isToggle, setIsToggle] = useState(false);

    return (
        <motion.nav
            initial={false}
            animate={isToggle ? "open" : "closed"}
            style={{
                filter: "drop-shadow(1px 1px 1px #4700b3)",
            }}
        >
            <MotionBtn
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsToggle(!isToggle)}
            >
                Menu
                <motion.div
                    variants={{
                        open: { rotate: 180 },
                        closed: { rotate: 0 },
                    }}
                    transition={{ duration: 0.2 }}
                    style={{ originY: 0.55 }}
                >
                    <svg width="15" height="15" viewBox="0 0 20 20">
                        <path d="M0 7 L 20 7 L 10 16" />
                    </svg>
                </motion.div>
            </MotionBtn>
            <Ul
                variants={{
                    open: {
                        clipPath: "inset(0% 0% 0% 0% round 10px)",
                        transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.7,
                            delayChildren: 0.3,
                            staggerChildren: 0.05,
                        },
                    },
                    closed: {
                        clipPath: "inset(10% 50% 90% 50% round 10px)",
                        transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.3,
                        },
                    },
                }}
                style={{ pointerEvents: isToggle ? "auto" : "none" }}
            >
                <Li variants={itemVariants}>Item 1 </Li>
                <Li variants={itemVariants}>Item 2 </Li>
                <Li variants={itemVariants}>Item 3 </Li>
                <Li variants={itemVariants}>Item 4 </Li>
                <Li variants={itemVariants}>Item 5 </Li>
            </Ul>
        </motion.nav>
    );
}
