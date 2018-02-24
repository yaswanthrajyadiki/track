import React, {Component} from 'react'
import Task from "./Task"
import {Link} from 'react-router-dom'

class TaskList extends Component {
    constructor(props) {
        super(props)
        // console.log("TaskList constructor")
        // console.log(this.props)
        this.state = {
            filterList: undefined,
            list_len: 0
        }
        this.handleFilter = this.handleFilter.bind(this)
        // console.log("state ",this.state)
    }

    // componentWillMount() {
    //     console.log("TaskList componentWillMount")
    // }
    //
    // componentDidMount() {
    //     console.log("TaskList componentDidMount")
    // }

    componentDidUpdate() {
        // console.log("TaskList componentDidUpdate")
        // console.log("task_list in taskList: ", this.props.list.data)
        // console.log("taskList NOT equal to filterList: ", this.state.filterList !== this.props.list.data)
        if ((this.props.list.data instanceof Array && !this.state.filterList) ||
            (this.props.list.data.length !== this.state.list_len)) {
            this.setState({
                filterList: this.props.list.data,
                list_len: this.props.list.data.length,
            })
        }
        // console.log("taskList state", this.state)
    }

    handleFilter = e => {
        const selected = e.target.value
        if (selected === "Fall")
            this.setState({
                filterList: this.props.list.data.filter(item => item.fall_due_date),
            })
        else if (selected === "Winter")
            this.setState({
                filterList: this.props.list.data.filter(item => item.winter_due_date),
            })
        else
            this.setState({
                filterList: this.props.list.data,
            })
    }

    render() {
        // console.log("TaskList render")
        // const list = this.props.list.data
        // console.log("task list:", list)
        let listItem

        if (this.state.filterList)
            listItem = this.state.filterList.map(item =>
                <Task key={item.id} task={item} deleteTask={this.props.deleteTask}/>
            )
        // else if (list instanceof Array && Object.keys(list).length > 0) {
        //     listItem = list.map(item =>
        //         <Task key={item.id} task={item} deleteTask={this.props.deleteTask}/>
        //     )
        // }
        // this.setState({"filterList":list})
        // console.log("listItem in TaskList: ", listItem)
        // console.log("filterList: ", this.state)

        return (
            <div className="row jumbotron">
                <div>
                    <h2>Task List</h2>
                </div>
                <div className="input-group pull-right col-md-3 col-sm-6 col-xs-6">
                    <select className="form-control" onChange={this.handleFilter}>
                        <option>All</option>
                        <option>Fall</option>
                        <option>Winter</option>
                    </select>
                    <span className="input-group-btn">
                        <button type="button" className="btn btn-info btn-search">
                            <Link to={{pathname: "/add-task/"}}>Add</Link>
                        </button>
                    </span>
                </div>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Task</th>
                        <th>Fall Deadline</th>
                        <th>Winter Deadline</th>
                        <th>Percentage</th>
                        <th>Option</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listItem}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TaskList