import {
  GET_NOTIFICATIONS,
  NOTIFICATIONS_LOADING,
  GET_UNREAD_NOTIFICATIONS,
  MARK_NOTIFICATIONS_READ
} from "../actions/types";

const initialState = {
  notifications: [],
  unreadNotifications: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATIONS_LOADING:
      return {
        ...state,
        loading: true
      };
    case MARK_NOTIFICATIONS_READ:
      return {
        ...state
      };
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
        loading: false
      };
    case GET_UNREAD_NOTIFICATIONS:
      return {
        ...state,
        unreadNotifications: action.payload
      };
    default:
      return state;
  }
}
