import {push} from 'react-router-redux'

export const authCheck = () =>{
    // console.log("Action: Authentication Check")
    return (dispatch, getState) => {
        if (Object.keys(getState().login).length === 0){
            // console.log("No Authentication")
            dispatch(push("/login"))
        }
    }
}