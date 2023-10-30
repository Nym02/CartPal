import ActionTypes from "../constants/action-types";


const initialState = {
    isSidebarOpen: false,
    sidebarContent: '',
}

export const generalReducer = (state=initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.TOGGLE_SIDEBAR:
            console.log(payload)
            
            return {...state, isSidebarOpen: payload?.isSidebarOpen, sidebarContent: payload?.sidebarContent};
    
        default:
            return state;
    }   
}