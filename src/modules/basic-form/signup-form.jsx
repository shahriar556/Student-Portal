import React from 'react';
import InputElement from './input-element';

function SignUpForm ({values, errors,handleSubmit,handleChange,handleReset}){
    return (<form onSubmit={handleSubmit} onReset={handleReset}>
        <InputElement
            type="text"
            name="name"
            placeholder="Enter A Name"
            label="Name"
            value={values.name}
            error={errors.name}
            onChange={handleChange}
        />
        <InputElement
            type="email"
            name="email"
            placeholder="Enter A Email"
            label="Email"
            value={values.email}
            error={errors.email}
            onChange={handleChange}
        />
        <InputElement
            type="password"
            name="password"
            placeholder="*******"
            label="Password"
            value={values.password}
            error={errors.password}
            onChange={handleChange}
        />
        <button 
            className="btn btn-primary" 
            type="submit">
            Submit</button>
    </form>)
}

export default SignUpForm;