import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {login} from "./login";
import {tasks} from "./tasks";
import {task} from "./task";
import {process} from "./process";
import {student} from "./student";
import {reducer as formReducer} from 'redux-form'

export default combineReducers({
    routing: routerReducer,
    form: formReducer,
    login: login,
    tasks: tasks,
    task: task,
    process:process,
    student:student,
})