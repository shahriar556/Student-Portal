import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import './style.css'


import LoginForm from './loginForm'

const validationSchema = Yup.object().shape({
    name: Yup.string("please enter String value")
        .required("name field is required")
        .max(10,"name is too long")
        .min(3,"name is too short"),
    email: Yup.string("please string value")
        .required("Eamil is required")
        .email("email must be valid"),
    password: Yup.string("please string value")
        .required('password is required')
        .min(4,"too short")
        .max(10,"too long")
});


const DEFAULT_VALUE = {
    name: '',
    email: '',
    password: ''
}

class FormikDemo extends React.Component {
    render(){
        return(
            <div className="pt-5">
                <h2 className="text-center">Formik Demo</h2>
                <Formik
                
                initialValues={DEFAULT_VALUE}
                component={LoginForm}
                onSubmit={(values, formikBag) => {
                    console.log(values);
                }}
                validationSchema={validationSchema}
                // validateOnChange={false}
             />
            </div>
        )
    }
    
}

export default FormikDemo;