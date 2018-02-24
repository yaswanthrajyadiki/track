import {LOGIN_CONFIRMED} from "../action/submitLogin";

// initialState = {
//     login: false
// }

export const app = (state = {}, action) => {
    console.log("App Reducer Action:", action)
    switch (action.type){
        case LOGIN_CONFIRMED:
            return Object.assign({},{
                login: true,
                // username: action.data
            })
        default:
            return state
    }
}