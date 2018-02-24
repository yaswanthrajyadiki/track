import {FETCH_TASK, DELETE_TASK} from "../action/manageTaskList";
import {TASK_SUBMIT_SUCCESS} from "../action/submitTask";

export const tasks = (state = {}, action) => {
    // console.log("Tasks reducer Action:", action)
    let new_state
    switch (action.type) {
        case FETCH_TASK:
            // console.log('Task reducer action data: ', action.data)
            // console.log('reducer old state', state)
            new_state = Object.assign({}, {
                    data: action.data
                }
            )
            // console.log("reducer new state ", new_state)
            // console.log(state === new_state)
            return new_state
        // case FAILED:
        //     return Object.assign({}, state, {
        //         detail: action.detail
        //     })
        case DELETE_TASK:
            console.log("old state", state)
            new_state = [
                ...state.data.filter(task => task.id !== action.id)
            ]
            console.log("new state", new_state)
            return Object.assign({}, {
                data: new_state
            })
        case TASK_SUBMIT_SUCCESS:
            console.log(state)
            let create = true
            new_state = [
                ...state.data.map(item => {
                    if (item.id === action.data.id) {
                        item = action.data
                        create = false
                    }
                    return item
                })
            ]
            if (create === true)
                new_state = [
                    action.data,
                    ...state.data
                ]
            // console.log("new_state", new_state)
            return new_state
        default:
            return state
    }
}