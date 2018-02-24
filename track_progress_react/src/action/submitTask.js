import {push} from 'react-router-redux'

export const TASK_SUBMIT_SUCCESS = 'TASK_SUBMIT_SUCCESS'
// export const TASK_SUBMIT_FAILED = 'TASK_SUBMIT_FAILED'
export const BASE_URL = 'http://localhost:8000'

export const submitTask = data => {
    // console.log("Action: submitTask")

    return (dispatch, getState) => {
        const token = getState().login.token
        let url = `${BASE_URL}/list/`
        let method = "POST"

        //convert data format
        if (data.id) {
            url += data.id + '/'
            method = "PUT"
        }
        if (data.fall_due_date === "")
            data.fall_due_date = null
        if (data.winter_due_date === "")
            data.winter_due_date = null

        // console.log("url: ", url)
        // console.log(getState().login)
        // console.log("token",token)
        if (data.mark)
            data.mark = parseInt(data.mark, 10)

        console.log("data", data)
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(json => {
                // console.log("return: ", json)
                dispatch({
                    type: TASK_SUBMIT_SUCCESS,
                    data: json
                })
                dispatch(push('/tasks'))
            })
    }
}