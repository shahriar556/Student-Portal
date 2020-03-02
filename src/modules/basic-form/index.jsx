import React from 'react';
import './style.css';
import SignUpForm from './signup-form'


const DEFAULT_VALUES = {
    name: '',
    email: '',
    password: ''
};





class FrmkForm extends React.Component{

    state = {
        values: DEFAULT_VALUES,
        errors: {}
    }

    handleChange = e => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value
            },
        });
        const {errors,isValide} = this.validateForm();
        if(!isValide){
            this.setState({errors});
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const {errors,isValide} = this.validateForm();

        if(isValide){
            console.log("Name: "+this.state.values.name)
            console.log("Email: "+this.state.values.email)
            console.log("Password: "+this.state.values.password)

            e.target.reset()
        }else{
            this.setState({errors});
        }
        
    }

    handleReset = () => {
        this.setState({values: DEFAULT_VALUES,errors:{}})
    }

    validateEmail = (email) => {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validateForm = () => {
        const {name,email,password} = this.state.values;
        const errors = {};
        // Name
        if(!name){
            errors.name = "Please provide your Name";
        }else if(name.length > 15){
            errors.name = "Your Name is too long!";
        }
        // Email
        if(!email){
            errors.email = "Please provide A Email";
        }else if(!this.validateEmail(email)){
            errors.email = "Please Enter A valide Email!"
        }
        // Password
        if(!password){
            errors.password = "Please Entared a Strong Password!"
        }else if(password.length < 3){
            errors.password = "Your password is too short";
        }else if(password.length > 10){
            errors.password = "your password is too long";
        }

        return {
            errors,
            isValide: Object.keys(errors).length === 0
        }
    }


    render(){
        const {values, errors} = this.state;
        return(
            
            <div className="basicForm">
                <h1>Basic Form</h1>
               <SignUpForm 
                    values={values} 
                    errors={errors}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    handleReset={this.handleReset}
                />
            </div>
        )
    }
}

export default FrmkForm;