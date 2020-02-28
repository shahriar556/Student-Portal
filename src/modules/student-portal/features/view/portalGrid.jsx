import React from 'react'

const PortalGrid = ({students,handleDelete,handleEdit}) => {
    return (
        <div className="container grid_view">
        <h3>Grid View</h3>
        <div className="row">
    
            {students.map(({id,name,dept},indx) =>
            <div className="col-sm-4" key={id}>
                <div className={`item list-group-item-${indx%2===0?"info":"success"}`}>
                    <h6>{id}</h6>
                    <h5>{name}</h5>
                    <p>{dept}</p>
                    <button onClick={() => handleEdit(id)} className="btn btn-sm btn-success mr-2">Edit</button>
                    <button onClick={() => handleDelete(id)} className="btn btn-sm btn-danger">Delete</button>
                </div>
            </div>
            )}
    
        </div>
    </div>
    
    )
}

export default PortalGrid;