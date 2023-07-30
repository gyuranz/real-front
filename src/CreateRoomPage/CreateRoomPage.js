import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setIsRoomHost } from "../store/actions";
import CreateRoomContent from "./CreateRoomContent";

const CreateRoomPage = (props) => {
    const { setIsRoomHostAction, isRoomHost } = props;

    setIsRoomHostAction(true);

    return (
        // <div className="join_room_page_container">
        // <div className="join_room_page_panel">
        // <p className="join_room_title">"Host meeting"</p>
        <CreateRoomContent />
        // </div>
        // </div>
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

export default connect(mapStoreStateToProps, mapActionsToProps)(CreateRoomPage);
