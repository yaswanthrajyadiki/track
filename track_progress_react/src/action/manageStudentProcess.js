export const FETCH_STU_PRS_SUCCESS = "FETCH_STU_PRS_SUCCESS"
export const BASE_URL = 'http://localhost:8000'

export const fetchStudentProcessList = id => {
    // console.log("Action: fetchStudentProcessList")
    // console.log("Action: fetchStudentProcessList id:", id)
    return (dispatch, getState)=>{
        const token = getState().login.token
        // console.log("fetch Process List token:", token)

        let url = `${BASE_URL}/process/student/?id=`+id
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
                    type:FETCH_STU_PRS_SUCCESS,
                    data: json
                })
            })
    }
}