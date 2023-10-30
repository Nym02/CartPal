import ActionTypes from "../constants/action-types"

export const toggleSidebar = (data) => {
    return {
        type: ActionTypes.TOGGLE_SIDEBAR,
        payload: data
    }
}