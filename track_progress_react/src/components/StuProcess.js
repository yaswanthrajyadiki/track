import React, {Component} from 'react'

class StuProcess extends Component {
    displayDialog = () => {
        document.getElementById("feedback_" + this.props.process.id).style.display = 'block';
    }
    hideDialog = () => {
        document.getElementById("feedback_" + this.props.process.id).style.display = 'none';
    }

    render() {
        console.log(this.props)


        return (
            <tr>
                <th>{this.props.process.list.list_name}</th>
                <th>{this.props.group === 'Fall' ? this.props.process.list.fall_due_date : this.props.process.list.winter_due_date}</th>
                <th>{this.props.process.list.mark}</th>
                <th>{this.props.process.actual_mark}</th>
                <th><h3 className="no_margin">{status}</h3></th>
                <th>
                    <button className="btn btn-primary right_space" onClick={this.displayDialog()}>Feedback
                    </button>
                    <div id={"feedback_" + this.props.process.id} className="white_content">
                                <textarea className="form-control"
                                          defaultValue={this.props.process.feedback === null ? "No feedback" : this.props.process.feedback}
                                          rows="5"></textarea>
                        <br/>
                        <button className="btn btn-primary" onClick={this.hideDialog()}>CLose</button>
                    </div>
                </th>
            </tr>
        )
    }
}

export default StuProcess