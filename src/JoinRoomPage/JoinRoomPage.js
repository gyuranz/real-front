import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setIsRoomHost } from "../store/actions";

import JoinRoomContent from "./JoinRoomContent";

const JoinRoomPage = (props) => {
    const { setIsRoomHostAction, isRoomHost } = props;

    const search = useLocation().search;

    useEffect(() => {
        const isRoomHost = new URLSearchParams(search).get("host");
        if (isRoomHost) {
            setIsRoomHostAction(true);
        }
    }, []);

    return (
        <>
            <JoinRoomContent />
        </>
    );
};

const mapStoreStateToProps = (state) => {
    return {
        ...state,
    };
};

const mapActionsToProps = (dispatch) => {
    return {
        setIsRoomHostAction: (isRoomHost) =>
            dispatch(setIsRoomHost(isRoomHost)),
    };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(JoinRoomPage);
