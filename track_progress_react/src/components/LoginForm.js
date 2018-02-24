import React from 'react'
import '../css/siginin.css'
import {Field, reduxForm} from 'redux-form'

const LoginForm = props => {
    const {handleSubmit, submitLogin, pristine, reset, submitting} = props

    return (
        <form className="form-signin" onSubmit={handleSubmit(val => submitLogin(val))}>
            <h2 className="form-signin-heading">Please sign in</h2>
            <label htmlFor="email" className="sr-only">Email Address</label>
            <Field className="form-control"
                   name="email"
                   component="input"
                   autoFocus=""
                   type="email"
                   placeholder="Email address"/>
            <label htmlFor="password" className="sr-only">Password</label>
            <Field className="form-control"
                   name="password"
                   component="input"
                   type="password"
                   placeholder="Password"/>
            <div className="form-group">
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                <br/>
                <button type="button" disabled={pristine || submitting} onClick={reset}
                        className="btn btn-lg btn-primary btn-block">Reset
                </button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'login',
})(LoginForm)