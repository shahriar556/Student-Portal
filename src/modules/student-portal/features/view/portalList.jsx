import React from 'react';


const PortalList = ({students,handleDelete,handleEdit}) => {
    return (
        <div className="container list_view"> 
            <h3>List View</h3>
            <ul className="list-group">
                {students.map(({id,name,dept},indx) => 
                <li className={`list-group-item d-flex justify-content-between list-group-item-${indx%2===0?"info":"light"}`} key={id}>
                    <p>{id}</p>
                    <p>{name}</p>
                    <p>{dept}</p>
                    <div>
                        <button onClick={() => handleEdit(id)} className="btn btn-sm btn-success mr-2">Edit</button>
                        <button onClick={() => handleDelete(id)} className="btn btn-sm btn-danger">Delete</button>
                    </div>
                </li>
                )}
            </ul>
        </div>
    )
}

export default PortalList;