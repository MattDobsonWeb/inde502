import axios from "axios";

import {
  GET_NOTIFICATIONS,
  NOTIFICATIONS_LOADING,
  GET_UNREAD_NOTIFICATIONS,
  MARK_NOTIFICATIONS_READ
} from "./types";

// Get Notificiations
export const getNotifications = () => dispatch => {
  dispatch(setNotificationLoading());

  axios
    .get("/api/notifications")
    .then(res =>
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: null
      })
    );
};

// Get Unread Notifications
export const getUnreadNotifications = () => dispatch => {
  axios.get("/api/notifications/unread").then(res =>
    dispatch({
      type: GET_UNREAD_NOTIFICATIONS,
      payload: res.data
    })
  );
};

// Mark notifiations as read
export const markNotificationsRead = () => dispatch => {
  axios.post("/api/notifications/update").then(res =>
    dispatch({
      type: MARK_NOTIFICATIONS_READ
    })
  );
};

//Set Loading State
export const setNotificationLoading = () => {
  return {
    type: NOTIFICATIONS_LOADING
  };
};
