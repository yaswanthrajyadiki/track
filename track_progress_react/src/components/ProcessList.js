import React, {Component} from 'react'
import Process from './Process'

class ProcessList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterList: undefined,
        }
        this.handleFilter = this.handleFilter.bind(this)
    }

    componentDidUpdate() {
        // console.log("PorcessList componentDidUpdate")
        // console.log("task_list in taskList: ", this.props.list.data)
        // console.log("taskList NOT equal to filterList: ", this.state.filterList !== this.props.list.data)
        if (this.props.processList.data instanceof Array && !this.state.filterList) {
            this.setState({
                filterList: this.props.processList.data,
            })
        }
        // console.log("taskList state", this.state)
    }

    handleFilter = e => {
        const selected = e.target.value
        if (selected === "Fall" || selected === "Winter")
            this.setState({
                filterList: this.props.processList.data.filter(item => (item.student.group === selected)),
            })
        else
            this.setState({
                filterList: this.props.processList.data,
            })
    }

    render() {
        // console.log("ProcessList Render: ", this.props)
        // const list = this.props.processList.data
        // console.log("process list:", list)
        // console.log("list's length is:", Object.keys(list).length)
        let listItem
        const {updateProcess} = this.props

        if (this.state.filterList)
            listItem = this.state.filterList.map(item =>
                <Process key={item.id} process={item} updateProcess={state => updateProcess(state)}/>
            )
        // else if (list instanceof Array && Object.keys(list).length > 0)
        //     listItem = list.map(item =>
        //         <Process key={item.id} process={item}/>
        //     )

        return (
            <div className="jumbotron">
                <div className="pull-right col-md-2">
                    {/*<input type="text" className="form-control" placeholder="Please Input Student Name"/>*/}
                    {/*<span className="input-group-btn">*/}
                    {/*<button className="btn btn-info btn-search">Search</button>*/}
                    {/*</span>*/}
                    <select className="form-control" onChange={this.handleFilter}>
                        <option>All</option>
                        <option>Fall</option>
                        <option>Winter</option>
                    </select>
                </div>
                <div>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Semester</th>
                            <th>Mark</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Submit Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listItem}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ProcessList