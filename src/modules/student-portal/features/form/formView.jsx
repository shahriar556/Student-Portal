import React from 'react';
import {Field,Form} from 'formik';


const FormView = props => (
    <Form>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <Field
                    name="name"
                    id="name"
                    placeholder="Student Name"
                    className={`form-control ${props.touched.name ? props.errors.name ? "is-invalid" : "is-valid" : ""}`}
                 />
                 {props.errors.name && props.touched.name ? <div className="invalid-feedback">{props.errors.name}</div> : ""}
            </div>
            <div className="form-group">
                <label htmlFor="department">Department</label>
                <Field as="select" id="dept" name="dept" className={`form-control ${props.touched.dept ? props.errors.dept ? "is-invalid" : "is-valid" : ""}`}>
                    <option>Select Department</option>
                    <option value="EEE">EEE</option>
                    <option value="CSE">CSE</option>
                    <option value="SWE">SWE</option>
                </Field>
                {props.errors.dept && props.touched.dept ? <div className="invalid-feedback">{props.errors.dept}</div> : ""}
                
            </div>
            <div className="form-group">
                <button className="btn btn-success mr-2" type="submit">{props.initialStatus.editable ? "Update" : "Submit"}</button>
                {props.initialStatus.editable ? 
                <button className="btn btn-danger" type="reset" onClick={props.initialStatus.editCencel}>Cencel</button> : 
                <button className="btn btn-danger" type="reset">Reset</button>}

            </div>
        </Form>
)

export default FormView;