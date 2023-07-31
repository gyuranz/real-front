import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setIsRoomHost } from "../store/actions";
import CreateRoomContent from "./CreateRoomContent";

const CreateRoomPage = (props) => {
    const { setIsRoomHostAction, isRoomHost } = props;

    setIsRoomHostAction(true);

    return <CreateRoomContent />;
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

export default connect(mapStoreStateToProps, mapActionsToProps)(CreateRoomPage);
