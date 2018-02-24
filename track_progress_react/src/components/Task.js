import React from 'react'
import {Link} from 'react-router-dom'

const Task = props => {
    // console.log("Task props: ",props)
    const path_to_task = {
        pathname:'/task/'+props.task.id,
        state:props.task
    }

    const path_to_process = {
        pathname:'/process/'+props.task.id,
        state:props.task
    }
    return (
        <tr>
            <th><Link to={path_to_process}>{props.task.list_name}</Link></th>
            <th>{props.task.fall_due_date}</th>
            <th>{props.task.winter_due_date}</th>
            <th>{props.task.mark}</th>
            <th className="space">
                <Link to={path_to_task}>Edit</Link>
                <a onClick={() => props.deleteTask(props.task.id)}>Delete</a>
            </th>
        </tr>
    )
}

export default Task