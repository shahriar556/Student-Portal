import React from 'react';
import { Form, Field } from 'formik';


const CustomField = ({name,type="text",placeholder,error,isValid,label}) => (
    <div className="form-group"> 
    <label htmlFor={name}>{label}</label>
        <Field 
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            className={`form-control ${isValid  ? 'is-invalid' : ''}`}
        />
        {isValid ? <div className="invalid-feedback">{error}</div> : ""}
    </div>
)


const LoginForm = props => {
    console.log(props);
    const {name,email,password} = props.errors;
    return (
        <Form style={{width:"400px",margin:"0px auto"}}>
            
            <CustomField 
                name="name"
                placeholder="Enter Name"
                error={name}
                isValid={name && props.touched.name}
                label="Name"
            />
            <CustomField 
                type="email"
                name="email"
                placeholder="Enter Email"
                isValid={email && props.touched.email}
                error={email}
                label="Email"
            />
            
            <CustomField 
                type="password"
                name="password"
                placeholder="****"
                isValid={password && props.touched.password}
                error={password}
                label="Password"
            />
            <button type="submit">Submit</button>


        </Form>
    )
}

export default LoginForm;