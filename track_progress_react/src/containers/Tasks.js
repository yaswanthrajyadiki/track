import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import TaskList from '../components/TaskList'
import {submitTask} from "../action/submitTask";
import {fetchTaskList, deleteTask} from "../action/manageTaskList";
import {authCheck} from "../action/authCheck";

class Tasks extends Component {
    constructor(props) {
        // console.log("Tasks constructor")
        super(props)
        this.props.authCheck()
        this.props.fetchTaskList()
    }

    // componentWillMount() {
    //     console.log("Tasks componentWillMount")
    // }
    //
    // componentDidMount() {
    //     console.log("Tasks componentDidMount")
    // }

    render() {
        // console.log("Tasks render")
        const {task_list, deleteTask} = this.props
        return (
            <div className="container">
                <TaskList list={task_list} deleteTask={deleteTask}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    // console.log("state.tasks in mapState: ", state.tasks)
    return ({
        task_list: state.tasks
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
    submitTask,
    deleteTask,
    fetchTaskList,
    authCheck
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tasks)