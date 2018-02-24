import {FETCH_PRS_SUCCESS, UPDATE_PRS_SUCCESS} from "../action/manageProcess";

export const process = (state = {}, action) => {
    // console.log("Process Reducer Action:", action)
    switch (action.type) {
        case FETCH_PRS_SUCCESS:
            // console.log('Process reducer action data: ', action.data)
            return Object.assign({}, {
                data: action.data
            })
        case UPDATE_PRS_SUCCESS:
            // console.log(state)
            const new_state = {
                data: state.data.map(item => {
                    if (item.id === action.id)
                        item["submitted"] = "submitted"
                    return item
                })
            }
            // console.log(new_state)
            return new_state
        default:
            return state
    }
}