import {push} from 'react-router-redux'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGIN_CONFIRMED = 'LOGIN_CONFIRMED'
export const BASE_URL = 'http://localhost:8000'

export const submitLogin = (data) => {
    // function isJson(obj) {
    //     var isjson = typeof(obj) === "object" && Object.prototype.toString.call(obj).toLowerCase() === "[object object]" && !obj.length;
    //     return isjson;
    // }
    // console.log("Action: submitLogin")
    // console.log("Action: submitLogin data:", data)

    return dispatch => {
        // let url = `${BASE_URL}/login/`
        let url = `${BASE_URL}/login/get_user_info/`
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(data.email + ":" + data.password)
                // 'Authorization':'Basic '+ btoa("root:abcdefgh")
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(json => {
                // console.log(json)
                if (json['detail'])
                    dispatch({
                        type: LOGIN_FAILED,
                        detail: json['detail']
                    })
                else {
                    // console.log(json)
                    dispatch({
                        type: LOGIN_SUCCESS,
                        data: json
                    })
                    dispatch({
                        type: LOGIN_CONFIRMED,
                        data: json
                    })
                    if (json['is_staff'])
                        dispatch(push("/tasks"))
                    else {
                        dispatch(push("/student"))
                    }
                }

            })

        // fetch(url, {
        //     method: 'GET',
        //     headers: {
        //         'Authorization': 'Basic ' + btoa(data.email + ":" + data.password)
        //         // 'Authorization':'Basic '+ btoa("root:abcdefgh")
        //     }
        // }).then(response => {
        //     if (response.status === 200 || response.status === 403)
        //         return response.json()
        //     else
        //         return response
        // }).then(data => {
        //     if (isJson(data)){
        //         console.log(data)
        //     }else {
        //         console.log(data.status)
        //     }
        // })
    }
}