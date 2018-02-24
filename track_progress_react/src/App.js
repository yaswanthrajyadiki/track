import React from 'react';
import {Route} from 'react-router-dom'
// import {connect} from 'react-redux'
// import {bindActionCreators} from 'redux'
// import {submitLogin} from "./action/submitLogin";
import './css/bootstrap.min.css';
import './css/bootstrap-theme.min.css';
import './App.css'
import Navbar from './components/Navbar'
import Login from "./containers/Login";
import Test2 from "./components/Test2";
import Tasks from "./containers/Tasks";
import Task from "./containers/Task";
import Process from './containers/Process'
import Student from './containers/Student'

const App = props => (
    <div>
        <Navbar/>
        {/*<Navbar login={props.login} is_staff={props.is_staff}/>*/}
        <main>
            <Route exact path="/" component={Tasks}/>
            <Route exact path="/home" component={Tasks}/>
            <Route exact path="/test2" component={Test2}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/tasks" component={Tasks}/>
            <Route exact path="/task/:id" component={Task}/>
            <Route exact path="/add-task/" component={Task}/>
            <Route exact path="/process/:id" component={Process}/>
            <Route exact path="/student/" component={Student}/>
        </main>
    </div>
)

// const mapStateToProps = state => {
//     console.log("App state is:", state)
//     return ({
//         login: state.login,
//     })
// }
//
// const mapDispatchToProps = dispatch => bindActionCreators({
//     submitLogin
// }, dispatch)
//
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(App)

export default App
