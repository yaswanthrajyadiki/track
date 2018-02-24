import {FETCH_STU_PRS_SUCCESS} from "../action/manageStudentProcess";

export const student = (state={}, action)=>{
    // console.log("Process Reducer Action:", action)
    switch (action.type) {
        case FETCH_STU_PRS_SUCCESS:
            return Object.assign({},{
                data: action.data
            })
        default:
            return state
    }
}