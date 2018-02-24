import React, {Component} from 'react'

class Process extends Component {
    constructor(props) {
        super(props)
        // console.log("Process props:", this.props)
        const {process} = this.props
        this.state = {
            id: process.id,
            mark: process.actual_mark === null ? "" : process.actual_mark,
            status: process.status,
            feedback: process.feedback === null ? "" : process.feedback,
        }
    }

    handleMarkChange = e => {
        this.setState({
            mark: e.target.value,
        })
    }

    handleStatusChange = e => {
        this.setState({
            status: e.target.value,
        })
    }

    handleFeedbackChange = e => {
        this.setState({
            feedback: e.target.value,
        })
    }

    displayDialog = () => {
        document.getElementById("feedback_"+ this.props.process.id).style.display = 'block';
    }
    hideDialog = () => {
        document.getElementById("feedback_"+ this.props.process.id).style.display = 'none';
    }

    handleSubmit = () => {
        // console.log("Process state when submit:", this.state)
        this.props.updateProcess(this.state)
    }

    // componentDidUpdate(){
    //     console.log("Process state: ", this.state)
    // }

    render() {
        // console.log(this.props.process.submitted)
        return (
            <tr>
                <th>{this.props.process.student.first_name} {this.props.process.student.last_name}</th>
                <th>{this.props.process.student.email}</th>
                <th>{this.props.process.student.group}</th>
                <th><input className="form-control input_m" type="text" name="mark"
                           value={this.state.mark}
                           onChange={this.handleMarkChange}/>
                </th>
                <th>
                    <select className="form-control"
                            value={this.state.status}
                            onChange={this.handleStatusChange}
                    >
                        <option value="PEND">Pending</option>
                        <option value="DONE">Done</option>
                        <option value="OVER">Over Due</option>
                    </select>
                </th>
                <th>
                    <button className="btn btn-primary right_space" onClick={()=>this.displayDialog()}>Feedback</button>
                    <div id={"feedback_"+ this.props.process.id} className="white_content">
                        <textarea className="form-control"
                                  value={this.state.feedback}
                                  onChange={this.handleFeedbackChange}
                                  placeholder="Please into the feedback"
                                  rows="5">
                        </textarea>
                        <br/>
                        <button className="btn btn-primary" onClick={() =>this.hideDialog()}>CLose</button>
                    </div>
                    <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                </th>
                <th>
                    <h3 className="no_margin"
                        style={{display: this.props.process.submitted === undefined ? "none" : "block"}}>
                        <span className="label label-success">Success</span>
                    </h3>
                </th>
            </tr>

        )
    }
}

export default Process