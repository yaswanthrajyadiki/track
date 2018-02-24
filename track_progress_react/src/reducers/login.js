import {LOGIN_FAILED, LOGIN_SUCCESS} from '../action/submitLogin'

export const login = (state = {}, action) => {
    // console.log('Login reducer Action:', action)
    switch (action.type) {
        case LOGIN_SUCCESS:
            // console.log('reducer', action.data)
            return {
                user_info: action.data.user_info,
                token: action.data.token,
                is_staff:action.data.is_staff
            }
        case LOGIN_FAILED:
            return Object.assign({}, state, {
                detail: action.detail
            })
        default:
            return state
    }
}