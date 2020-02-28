import React from 'react';

const PortalTable = ({students,handleDelete,handleEdit}) => {
    return (
        <div className="container table_view">
            <h3>Table View</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Department</th>
                    <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(({id,name,dept},indx) => 
                        <tr key={id}>
                            <th scope="row">{id}</th>
                            <td>{name}</td>
                            <td>{dept}</td>
                            <td>
                                <button onClick={() => handleEdit(id)} className="btn btn-sm btn-success mr-2">Edit</button>
                                <button onClick={() => handleDelete(id)} className="btn btn-sm btn-danger">Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default PortalTable;