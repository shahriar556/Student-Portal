import React from 'react';


const InputElement = ({name,type,placeholder,value,onChange,label,error}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label> 
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                className={`form-control ${error? "is-invalid" : ""}`}
                value={value}
                onChange={onChange}/>
            {error ? <div className="invalid-feedback">
                {error}
            </div> : ""}
        </div>
    )
}

export default InputElement;