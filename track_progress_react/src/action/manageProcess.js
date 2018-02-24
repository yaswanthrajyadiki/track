export const FETCH_PRS_SUCCESS = "FETCH_PRS_SUCCESS"
export const UPDATE_PRS_SUCCESS = "UPDATE_PRS_SUCCESS"
export const BASE_URL = 'http://localhost:8000'

export const fetchProcessList = id => {
    // console.log("Action: fetchProcessList")
    return (dispatch, getState) => {
        const token = getState().login.token
        // console.log("fetch Process List token:", token)

        let url = `${BASE_URL}/process/list_by_id/?id=` + id
        // console.log("url:" , url)
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            },
        }).then(response => response.json())
            .then(json => {
                // console.log(json)
                dispatch({
                    type: FETCH_PRS_SUCCESS,
                    data: json,
                })
            })
    }
}

export const updateProcess = data => {
    // console.log("Action Update Process:", data)
    return (dispatch, getState) => {
        const token = getState().login.token
        // console.log("fetch Process List token:", token)

        let url = `${BASE_URL}/process/` + data.id + "/"
        // console.log("URL:", url)
        const filtered_data = {"actual_mark": parseInt(data.mark, 10),
            "status": data.status, "feedback":data.feedback}
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            },
            body: JSON.stringify(filtered_data)
        }).then(response => response.json())
            .then(json => {
                // console.log("After Update Process", json)
                dispatch({
                    type: UPDATE_PRS_SUCCESS,
                    id: json.id
                })
            })
    }
}