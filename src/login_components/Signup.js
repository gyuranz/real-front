import { motion } from "framer-motion/dist/framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
    boxVariants,
    buttonStyle,
    containerStyle,
    inputVariants,
    mainBgColor,
} from "../components/Styles";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { AuthAtom, AuthLogin } from "../atoms";

const Container = styled(motion.div)`
    ${containerStyle}
    height: 480px;
`;

const JoinInput = styled(motion.input)`
    ${buttonStyle}
    width: 400px;
    margin-bottom: 10px;
`;

const OneLineTwoButton = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
`;

const JoinButton = styled(motion.button)`
    ${buttonStyle}
    ${mainBgColor}
    cursor: pointer;
`;

const CancelButton = styled(motion.button)`
    ${buttonStyle}
    background-color: rgba(255,0,0,0.7);
    cursor: pointer;
`;

const LoginWarning = styled.span`
    color: red;
    font-size: 14px;
`;

function Signup() {
    const navigate = useNavigate();

    const goLogin = () => {
        navigate("/auth/login");
    };

    const [loginError, setLoginError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    // const authFunc = useRecoilValue(AuthAtom);
    const [userState, setUserState] = useRecoilState(AuthLogin);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const onValid = async ({
        user_id,
        user_nickname,
        user_password,
        verifyPassword,
    }) => {
        if (user_password !== verifyPassword) {
            setError(
                "verifyPassword",
                { message: "Password are not the same." },
                { shouldFocus: true }
            );
            return;
        }
        //! 특정 항목에 해당되는 에러가 아니라, 전체 form에 해당되는 에러
        // setError("extraError", { message: "Server offline." });
        try {
            console.log(user_id, user_nickname);
            setIsLoading(true);
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/auth/signup`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id,
                        user_nickname,
                        user_password,
                    }),
                }
            );
            const responseData = await response.json();
            setIsLoading(false);
            setLoginError(responseData.message);

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
            localStorage.setItem(
                "userData",
                JSON.stringify({
                    userId: responseData.userId,
                    userNickname: responseData.userNickname,
                    token: responseData.token,
                })
            );
            navigate(`/${user_id}`);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Container variants={boxVariants} initial="start" animate="end">
                {/* 수정 필요!!! 로딩화면 */}
                {isLoading ? <h1>로딩 중...</h1> : null}
                <form
                    style={{ display: "flex", flexDirection: "column" }}
                    onSubmit={handleSubmit(onValid)}
                >
                    <LoginWarning>{loginError}</LoginWarning>

                    <JoinInput
                        variants={inputVariants}
                        {...register("user_id", {
                            required: "ID is required",
                            minLength: {
                                value: 2,
                                message: "Nickname is at least 3length",
                            },
                            // pattern: {
                            //     value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                            //     message: "Only naver.com emails allowed",
                            // },
                        })}
                        placeholder="ID"
                    />
                    <LoginWarning>{errors?.user_id?.message}</LoginWarning>

                    <JoinInput
                        variants={inputVariants}
                        {...register("user_nickname", {
                            required: "Nickname is required",
                            // validate: {
                            //     // async 를 사용해서 서버와 id 중복확인
                            //     nobig: (value) =>
                            //         value.includes("big")
                            //             ? "no 'big' allowed"
                            //             : true,
                            //     noperson: (value) =>
                            //         value.includes("person")
                            //             ? "no 'person' allowed"
                            //             : true,
                            // },
                            minLength: {
                                value: 2,
                                message: "Nickname is at least 3length",
                            },
                        })}
                        placeholder="Nickname"
                    />
                    <LoginWarning>
                        {errors?.user_nickname?.message}
                    </LoginWarning>

                    <JoinInput
                        type="password"
                        variants={inputVariants}
                        {...register("user_password", {
                            required: "Password is Required",
                            minLength: {
                                value: 6,
                                message: "Your password is too short",
                            },
                        })}
                        placeholder="Password"
                    />
                    <LoginWarning>
                        {errors?.user_password?.message}
                    </LoginWarning>

                    <JoinInput
                        type="password"
                        variants={inputVariants}
                        {...register("verifyPassword", {
                            required: "Password is Required",
                            minLength: {
                                value: 6,
                                message: "Your password is too short",
                            },
                        })}
                        placeholder="Verify Password"
                    />
                    <LoginWarning>
                        {errors?.verifyPassword?.message}
                    </LoginWarning>

                    <OneLineTwoButton>
                        <JoinButton variants={inputVariants}>Join</JoinButton>
                        <CancelButton
                            variants={inputVariants}
                            onClick={goLogin}
                        >
                            Cancel
                        </CancelButton>
                    </OneLineTwoButton>
                </form>
            </Container>
        </>
    );
}
export default Signup;
