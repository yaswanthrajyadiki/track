import React from 'react'
import '../css/siginin.css'
import {Field, reduxForm} from 'redux-form'

const TaskForm = props => {
    const {handleSubmit, pristine, reset, submitting, submitTask} = props

    return (
        <div className="row jumbotron" >
        <form onSubmit={handleSubmit(val => submitTask(val))}>
            <div className="col-md-4">
                <div className="form-group">
                    <label htmlFor="task">Task Name</label>
                    <Field type="text" name="list_name" required className="form-control" component="input"/>
                </div>
                <div className="form-group">
                    <label htmlFor="mark">Percentage</label>
                    <Field type="number" name="mark" required className="form-control" component="input"/>
                </div>
                <button className="btn btn-lg btn-primary" style={{marginRight: '1em'}} type="submit">Submit</button>
                <button className="btn btn-lg btn-primary" type="button" disabled={pristine || submitting} onClick={reset}>
          Undo Changes
        </button>
            </div>
            <div className="col-md-4">
                <div className="form-group">
                    <label htmlFor="task">Description</label>
                    <Field type="textarea" name="desc" className="form-control" rows="5" component="textarea"/>
                </div>
            </div>
            <div className="col-md-4">
                <div className="form-group">
                    <label htmlFor="fall_due_date">Due Date for Fall Student</label>
                    <Field type="date" name="fall_due_date" className="form-control" component="input"/>
                </div>
                <div className="form-group">
                    <label htmlFor="winter_due_date">Due Date for Winter Student</label>
                    <Field type="date" name="winter_due_date" className="form-control" component="input"/>
                </div>
            </div>
        </form>
    </div>
    )
}

export default reduxForm({
    form: 'task',
})(TaskForm)