import React from "react";
import { motion } from "framer-motion/dist/framer-motion";

function Logo() {
    return (
        <>
            <div
                className="example"
                style={{
                    border: "none",
                    padding: "0",
                    marginLeft: "auto",
                    marginRight: "auto",
                    height: "min-content",
                    stroke: "#ffc700",
                }}
            >
                <motion.svg
                    style={{
                        width: "100%",
                        height: "100%",
                        scale: "2",
                    }}
                    viewBox="0 0 530 100"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                            duration: 2,
                            ease: "ease-in-out",
                        }}
                        strokeWidth={5}
                        strokeDasharray="0 1"
                        fill="none"
                        d="m68,73.8h-11.3l-7.4-20.1h-30.3l-7.7,20.1H0L27.9,0h12.7l27.4,73.8Zm-22.2-29.3l-11.5-31.1-11.9,31.1h23.4Z"
                    />
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                            duration: 2,
                            ease: "ease-in-out",
                            delay: 0.2,
                        }}
                        strokeWidth={5}
                        strokeDasharray="0 1"
                        fill="none"
                        d="m92,0v73.8h-10.6V0h10.6Z"
                    />
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                            duration: 2,
                            ease: "ease-in-out",
                            delay: 0.4,
                        }}
                        strokeWidth={5}
                        strokeDasharray="0 1"
                        fill="none"
                        d="m136.4,35.3h-9v-9.2h9V9.4h10.6v16.7h11.3v9.2h-11.3v38.6h-10.6v-38.6Z"
                    />
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                            duration: 2,
                            ease: "ease-in-out",
                            delay: 0.6,
                        }}
                        strokeWidth={5}
                        strokeDasharray="0 1"
                        fill="none"
                        d="m168.75,37.75c1.97-3.63,4.68-6.48,8.15-8.55,3.47-2.07,7.43-3.1,11.9-3.1s8.43,1.04,11.9,3.1c3.47,2.07,6.18,4.92,8.15,8.55,1.97,3.63,2.95,7.78,2.95,12.45s-.98,8.73-2.95,12.4c-1.97,3.67-4.68,6.54-8.15,8.6-3.47,2.07-7.43,3.1-11.9,3.1s-8.43-1.03-11.9-3.1c-3.47-2.07-6.18-4.93-8.15-8.6-1.97-3.67-2.95-7.8-2.95-12.4s.98-8.81,2.95-12.45Zm29.05,23.35c2.27-2.73,3.4-6.37,3.4-10.9s-1.13-8.08-3.4-10.85c-2.27-2.77-5.27-4.15-9-4.15s-6.73,1.37-9,4.1c-2.27,2.73-3.4,6.37-3.4,10.9s1.13,8.17,3.4,10.9c2.27,2.73,5.27,4.1,9,4.1s6.73-1.37,9-4.1Z"
                    />
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                            duration: 2,
                            ease: "ease-in-out",
                            delay: 0.8,
                        }}
                        strokeWidth={5}
                        strokeDasharray="0 1"
                        fill="none"
                        d="m258.7,64.5h33.4v9.3h-44V0h10.6v64.5Z"
                    />
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                            duration: 2,
                            ease: "ease-in-out",
                            delay: 1,
                        }}
                        strokeWidth={5}
                        strokeDasharray="0 1"
                        fill="none"
                        d="m308.6,71.05c-3.47-2.03-6.18-4.87-8.15-8.5-1.97-3.63-2.95-7.75-2.95-12.35s.98-8.81,2.95-12.45c1.97-3.63,4.68-6.47,8.15-8.5,3.47-2.03,7.43-3.05,11.9-3.05,6.2,0,10.83,1.55,13.9,4.65,3.07,3.1,5.03,5.85,5.9,8.25,1.4,3.27,2.1,7.17,2.1,11.7,0,1.2-.02,2.05-.05,2.55-.03.5-.05.82-.05.95h-34.4c.6,3.2,2.1,5.8,4.5,7.8s5.1,3,8.1,3c3.4,0,6.03-.67,7.9-2,1.87-1.33,3.2-2.67,4-4l8.5,3.8c-1.33,3.07-3.75,5.7-7.25,7.9s-7.88,3.3-13.15,3.3c-4.47,0-8.43-1.02-11.9-3.05Zm23.7-25.15c-.54-3.2-1.77-5.78-3.7-7.75-1.93-1.97-4.63-2.95-8.1-2.95-3.13,0-5.87,1-8.2,3-2.33,2-3.8,4.57-4.4,7.7h24.4Z"
                    />
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                            duration: 2,
                            ease: "ease-in-out",
                            delay: 1.2,
                        }}
                        strokeWidth={5}
                        strokeDasharray="0 1"
                        fill="none"
                        d="m363.05,71.2c-3.43-2.07-6.12-4.92-8.05-8.55-1.93-3.63-2.9-7.75-2.9-12.35s.96-8.72,2.9-12.35c1.93-3.63,4.62-6.48,8.05-8.55s7.32-3.1,11.65-3.1c2.47,0,4.9.57,7.3,1.7,2.4,1.13,4.53,2.8,6.4,5v-6.8h10.6v47.7h-10.6v-6.4c-1.8,2.27-3.9,3.97-6.3,5.1-2.4,1.13-4.87,1.7-7.4,1.7-4.33,0-8.22-1.03-11.65-3.1Zm3.15-10.05c2.33,2.77,5.4,4.15,9.2,4.15,2.33,0,4.5-.65,6.5-1.95,2-1.3,3.6-3.1,4.8-5.4s1.8-4.85,1.8-7.65-.6-5.35-1.8-7.65c-1.2-2.3-2.8-4.1-4.8-5.4s-4.17-1.95-6.5-1.95c-3.8,0-6.87,1.37-9.2,4.1-2.33,2.73-3.5,6.37-3.5,10.9s1.17,8.08,3.5,10.85Z"
                    />
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                            duration: 2,
                            ease: "ease-in-out",
                            delay: 1.4,
                        }}
                        strokeWidth={5}
                        strokeDasharray="0 1"
                        fill="none"
                        d="m411.5,26.2h10.6v7c1.6-2.27,3.73-4.07,6.4-5.4,2.67-1.33,5.4-1.93,8.2-1.8v9.8c-2.73-.13-5.22.48-7.45,1.85-2.23,1.37-3.98,3.18-5.25,5.45-1.27,2.27-1.9,4.63-1.9,7.1v23.7h-10.6V26.2Z"
                    />
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                            duration: 2,
                            ease: "ease-in-out",
                            delay: 1.6,
                        }}
                        strokeWidth={5}
                        strokeDasharray="0 1"
                        fill="none"
                        d="m477.7,38.65c-1.87-2.17-4.43-3.25-7.7-3.25-3.27.07-6,1.25-8.2,3.55s-3.27,5.18-3.2,8.65v26.3h-10.6V26.2h10.6v6.5c1.53-1.87,3.47-3.4,5.8-4.6,2.33-1.2,4.63-1.8,6.9-1.8,3.27,0,6.4.73,9.4,2.2,3,1.47,5.48,3.77,7.45,6.9,1.96,3.13,2.95,7.07,2.95,11.8v26.7h-10.6v-26.3c0-3.8-.93-6.78-2.8-8.95Z"
                    />
                </motion.svg>
            </div>
        </>
    );
}

export default Logo;
