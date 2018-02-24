import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

const renderDatePicker = ({input, defaultValue, meta: {touched, error}}) => (
    <div>
        <DatePicker {...input}
            errorText={touched && error}
            className="form-control"
            selected={input.value ? moment(input.value, "MM/DD/YYYY") : null}
        />
    </div>
)

export default renderDatePicker