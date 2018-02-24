import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {authCheck} from "../action/authCheck";
import {fetchProcessList} from "../action/manageProcess";
import {updateProcess} from "../action/manageProcess";
import TaskDetail from '../components/TaskDetail'
import ProcessList from '../components/ProcessList'

class Process extends Component {
    constructor(props) {
        super(props)
        // console.log("Process constructor")
        // console.log("process props", this.props)
        this.props.authCheck()
    }

    componentDidMount() {
        // console.log(this.props)
        if (this.props.location.state)
            this.props.fetchProcessList(this.props.location.state.id)
    }

    render() {
        // console.log("Process Render")
        const {task, list, updateProcess} = this.props

        return (
            <div className="container" role="main">
                <div className="col-lg-12 col-md-12">
                    <TaskDetail task={task}/>
                    <ProcessList processList={list} updateProcess={updateProcess}/>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log("Process mapping state", state)
    // console.log("Process mapping ownProps", ownProps)
    return ({
        task: ownProps.location.state,
        list: state.process
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
    authCheck,
    fetchProcessList,
    updateProcess,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Process)
