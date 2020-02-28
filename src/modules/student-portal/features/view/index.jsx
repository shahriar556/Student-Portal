import React from 'react';

import PortalList from  './portalList'
import PortalGrid from  './portalGrid'
import PortalTable from './portalTable'

const PortalView = ({students,handleEdit,handleDelete,handleViewChange,viewStatus}) => {
    return (
        <div className="col-lg-6 viw">
            <div className="d-flex justify-content-end">
            <button onClick={() => handleViewChange("1")} className={`btn btn-${viewStatus === "1" ? "success" : "info"} mr-2`}>List View</button>
            <button onClick={() => handleViewChange("2")} className={`btn btn-${viewStatus === "2" ? "success" : "info"} mr-2`}>Grid View</button>
            <button onClick={() => handleViewChange("3")} className={`btn btn-${viewStatus === "3" ? "success" : "info"} mr-2`}>Table View</button>
            </div>

            {viewStatus === "1" && 
                <PortalList 
                students={students} 
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />}
            {viewStatus === "2" && 
            <PortalGrid 
                students={students} 
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />}
            {viewStatus === "3" && 
            <PortalTable 
                students={students} 
                handleEdit={handleEdit} 
                handleDelete={handleDelete}
            />}
        </div>
    )
}

export default PortalView;