export const FETCH_TASK = 'FETCH_TASK'
export const DELETE_TASK = 'DELETE_TASK'
export const BASE_URL = 'http://localhost:8000'

export const fetchTaskList = () => {
    // console.log("Action: fetchTaskList")
    return (dispatch, getState) => {
        const token = getState().login.token

        let url = `${BASE_URL}/list/`
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            },
        }).then(response => response.json())
            .then(json => {
                // console.log(json)
                if (json instanceof Array)
                    dispatch({
                        type: FETCH_TASK,
                        data: json
                    })
                else
                    dispatch({
                    type: FETCH_TASK,
                    error_msg: json
                })
            })
    }
}

export const deleteTask = id => {
    // console.log("Action: deleteTask")
    return (dispatch, getState) => {
        const token = getState().login.token
        let url = `${BASE_URL}/list/` + id + '/'
        console.log("delete task url:", url)
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            },
        }).then(response => response.json())
            .then(json => {
                // console.log(json)
                dispatch({
                    type: DELETE_TASK,
                    data: json
                })
            })
        dispatch({
            type: DELETE_TASK,
            id: id
        })
    }
}