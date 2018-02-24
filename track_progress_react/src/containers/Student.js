import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {authCheck} from "../action/authCheck";
import {fetchStudentProcessList} from "../action/manageStudentProcess";
import StuProcessList from "../components/StuProcessList";

class Student extends Component {
    constructor(props) {
        super(props)
        // console.log("Student constructor")
        // console.log("process props", this.props)
        this.props.authCheck()
    }

    componentDidMount() {
        this.props.fetchStudentProcessList(this.props.id)
    }

    render() {
        // console.log("Student Render")
        const {list, group} = this.props

        return (
            <div className="container" role="main">
                <div className="col-md-12 col-lg-12">
                    <StuProcessList processList={list} group={group}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log("Process mapping state", state)
    // console.log("Process mapping state: user id ", state.login.user_info.username)
    // console.log("Process mapping ownProps", ownProps)
    if (Object.keys(state.login).length > 0)
        return ({
            list: state.student.data,
            id: state.login.user_info.id,
            group: state.login.user_info.group
        })
    else
        return ({})
}

const mapDispatchToProps = dispatch => bindActionCreators({
    authCheck,
    fetchStudentProcessList
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Student)
