import React from 'react'

const TaskDetail = props => {
    if (!props.task)
        return null
    return (
        <div className="jumbotron">
            <div className="row">
                <h2>{props.task.list_name} </h2>
                <div className="col-md-5">
                    <h4>Percentage: {props.task.mark}</h4>
                    <h4>Fall Due Date: {props.task.fall_due_date}</h4>
                    <h4>Winter Due Date: {props.task.winter_due_date}</h4>
                </div>
                <div className="col-md-5">
                    <h4>Description:</h4>
                    <div>{props.task.desc}</div>
                </div>
            </div>
        </div>
    )
}

export default TaskDetail