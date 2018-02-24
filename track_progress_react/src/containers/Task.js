import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import TaskForm from '../components/TaskForm'
import {authCheck} from "../action/authCheck";
import {submitTask} from "../action/submitTask";

class Task extends Component{
    render (){
        // console.log("task props", this.props)
        const {authCheck, submitTask, initialValues} = this.props
        // console.log("initialValues: ", initialValues)
        authCheck()

        return(
            <div className="container">
                <TaskForm submitTask={submitTask} initialValues={initialValues}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log(state)
    // console.log(ownProps)
    return ({
        initialValues:ownProps.location.state
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
    submitTask,
    authCheck
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Task)