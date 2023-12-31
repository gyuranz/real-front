import { motion } from "framer-motion/dist/framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
    boxVariants,
    buttonStyle,
    containerStyle,
    disabledTextColor,
    inputVariants,
    logoVariants,
    reverseTextColor,
    secondaryBgColor,
    secondaryTextColor,
} from "../components/Styles";
import { Link, useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import { AuthLogin } from "../atoms";

const TextLogo = styled.div`
    font-size: 160px;
    color: #303030;
`;

const ImageLogo = styled(motion.div)`
    /* width: 300px; */
    /* height: 300px; */
    position: relative;
    bottom: -500px;
    z-index: -1;
`;
const CircleBg = styled(motion.div)`
    /* z-index: -1; */
    width: 10px;
    height: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 50%;
    ${secondaryBgColor}
`;

const BaseContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: #ffc700; */
`;
const Container = styled(motion.div)`
    ${containerStyle}
    box-shadow: none;
    height: 280px;
    width: 500px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    a {
        ${secondaryTextColor}
        flex: none;
        position: absolute;
        bottom: -30px;
        right: 55px;
        padding: 10px;
        font-weight: 600;
    }
`;

const LoginInput = styled(motion.input)`
    ${buttonStyle}
    width: 300px;
    margin-bottom: 10px;
`;

const GridLoginStyle = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    width: 415px;
    gap: 10px;
`;

const LoginButton = styled(motion.button)`
    ${buttonStyle}
    ${secondaryBgColor}
    width: 100px;
    height: 145px;
    cursor: pointer;
    ${disabledTextColor}
`;

const LoginWarning = styled.span`
    ${reverseTextColor}
    font-size: 14px;
`;

function Login() {
    const navigate = useNavigate();

    const [loginError, setLoginError] = useState("");
    // const [isLoading, setIsLoaging] = useState(false);
    // const authFunc = useRecoilValue(AuthAtom);
    const [userState, setUserState] = useRecoilState(AuthLogin);

    const {
        register,
        handleSubmit,
        formState: { errors },
        // setValue,
    } = useForm();
    // console.log(userState);

    //url 이동을 위한 useHistory? useNavigate
    const onValid = async ({ user_id, user_password }) => {
        //! 임시 코드
        // navigate(`/${user_id}`);
        // setValue("user_id", "");
        // setValue("user_password", "");

        try {
            // setIsLoaging(true);
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: " Bearer " + userState.token,
                    },
                    body: JSON.stringify({
                        user_id,
                        user_password,
                    }),
                }
            );
            const responseData = await response.json();

            // setIsLoaging(false);
            setLoginError(responseData.message);
            // responseData.message
            //     ? alert(responseData.message)
            //     : alert(`${responseData.userNickname}님, 반갑습니다.`);

            if (!response.ok) {
                throw new Error(responseData.message);
            }
            setUserState({
                ...userState,
                isLoggedIn: true,
                userId: responseData.userId,
                userNickname: responseData.userNickname,
                token: responseData.token,
            });

            // console.log(userState);
            localStorage.setItem(
                "userData",
                JSON.stringify({
                    userId: responseData.userId,
                    userNickname: responseData.userNickname,
                    token: responseData.token,
                })
            );
            // authFunc.login(responseData.userId, responseData.token);

            navigate(`/${user_id}/finished`);
        } catch (error) {
            console.log("❌", error);
            // console.log("❌", error.data.message);
        }
    };

    return (
        <>
            {/* <CircleBg
                initial={{ scale: 0, opacity: 0 }}
                transition={{ duration: 2, delay: 1.9 }}
                animate={{
                    borderRaduis: 10,
                    opacity: 1,
                    scale: 90,
                }}
            ></CircleBg> */}
            <BaseContainer>
                <Container variants={boxVariants} initial="start" animate="end">
                    <ImageLogo
                        variants={logoVariants}
                        initial="start"
                        animate="end"
                    >
                        <img
                            width={1000}
                            height={1000}
                            alt="계란"
                            src="/img/gyuranz2.gif"
                        ></img>
                    </ImageLogo>
                    {/* <TextLogo>AItoLearn</TextLogo> */}
                    <form onSubmit={handleSubmit(onValid)}>
                        <GridLoginStyle>
                            <div>
                                <LoginInput
                                    type="text"
                                    variants={inputVariants}
                                    {...register("user_id", {
                                        required: "please write right form",
                                    })}
                                    placeholder="ID"
                                />
                                <LoginWarning>
                                    {errors?.user_id?.message}
                                </LoginWarning>

                                <LoginInput
                                    type="password"
                                    variants={inputVariants}
                                    {...register("user_password", {
                                        required: "Password is Required",
                                        minLength: {
                                            value: 6,
                                            message:
                                                "Your password is too short",
                                        },
                                    })}
                                    placeholder="PASSWORD"
                                />
                                <LoginWarning>
                                    {errors?.user_password?.message}
                                </LoginWarning>
                            </div>

                            <LoginButton variants={inputVariants}>
                                LOG IN
                            </LoginButton>
                            <LoginWarning>{loginError}</LoginWarning>
                            {/* <LoginWarning>{loginError}</LoginWarning> */}
                        </GridLoginStyle>
                    </form>
                    <Link to={"/auth/signup"}>SIGN UP</Link>
                </Container>
            </BaseContainer>
        </>
    );
}
export default Login;
