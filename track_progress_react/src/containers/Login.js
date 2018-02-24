import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import LoginForm from '../components/LoginForm'
import {submitLogin} from "../action/submitLogin"

const Login = props => (
    <div className="container">
        <div id="error_msg" style={{display: props.detail === undefined ? "none" : "block"}}
             className="alert alert-warning">{props.detail}</div>
        <LoginForm submitLogin={props.submitLogin}/>
    </div>
)

const mapStateToProps = state => {
    // console.log("container state detail", state.login.detail)
    return ({
        detail: state.login.detail
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
    submitLogin
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)