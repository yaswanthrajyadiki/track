import React, {Component} from 'react'

class StuProcessList extends Component {
    displayDialog = id => {
        document.getElementById(id).style.display = 'block';
    }
    hideDialog = id => {
        document.getElementById(id).style.display = 'none';
    }

    render() {
        // console.log(this.props)
        let listItem
        let actual_mark = 0
        let total_mark = 0

        if (this.props.processList && this.props.processList.data instanceof Array)
            listItem = this.props.processList.data.map(item => {
                let status
                if (item.status === "PEND")
                    status = <span className="label label-warning">Pending</span>
                else if (item.status === "DONE")
                    status = <span className="label label-success">Done</span>
                else
                    status = <span className="label label-danger">Over Due</span>

                total_mark += item.list.mark
                if (item.actual_mark) {
                    actual_mark += item.actual_mark
                }

                return (
                    <tr key={item.id} id={item.id}>
                        <th>{item.list.list_name}</th>
                        <th>{this.props.group === 'Fall' ? item.list.fall_due_date : item.list.winter_due_date}</th>
                        <th>{item.list.mark}</th>
                        <th>{item.actual_mark}</th>
                        <th><h4 className="no_margin">{status}</h4></th>
                        <th className="space">
                            <a href="javascript:void(0)" onClick={() => this.displayDialog(`desc_${item.id}`)}>Description</a>
                            <div id={"desc_"+item.id} className="white_content">
                                <textarea className="form-control"
                                          defaultValue={item.list.desc !== null ? item.list.desc : "No Description"}
                                          rows="5" readOnly={true}></textarea>
                                <br/>
                                <button className="btn btn-primary" onClick={() => this.hideDialog(`desc_${item.id}`)}>Close</button>
                            </div>
                            <a href="javascript:void(0)" onClick={() => this.displayDialog(`feedback_${item.id}`)}>Feedback</a>
                            <div id={"feedback_"+item.id} className="white_content">
                                <textarea className="form-control"
                                          defaultValue={item.feedback !== null ? item.feedback : "No feedback"}
                                          rows="5" readOnly={true}></textarea>
                                <br/>
                                <button className="btn btn-primary" onClick={() => this.hideDialog(`feedback_${item.id}`)}>Close</button>
                            </div>
                        </th>
                    </tr>
                )
            })

        return (
            <div className="col-lg-12 col-md-12">
                <div className="row">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Task</th>
                            <th>Due Date</th>
                            <th>Percentage</th>
                            <th>Actual</th>
                            <th>Status</th>
                            <th>Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listItem}
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <h4 className="pull-right ">Mark: {actual_mark}/{total_mark}</h4>
                </div>
            </div>
        )
    }
}

export default StuProcessList