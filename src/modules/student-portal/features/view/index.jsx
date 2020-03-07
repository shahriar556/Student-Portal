import React from 'react';

import PortalList from  './portalList'
import PortalGrid from  './portalGrid'
import PortalTable from './portalTable'

const PortalView = ({students,handleEdit,handleDelete,handleViewChange,viewStatus,handelSearch,search,pagiPerPage,handlePage,pagiStudents,pageStay}) => {
    
    return (
        <div className="col-lg-6 viw">
            <div className="d-flex justify-content-end">
            <button onClick={() => handleViewChange("1")} className={`btn btn-${viewStatus === "1" ? "success" : "info"} mr-2`}>List View</button>
            <button onClick={() => handleViewChange("2")} className={`btn btn-${viewStatus === "2" ? "success" : "info"} mr-2`}>Grid View</button>
            <button onClick={() => handleViewChange("3")} className={`btn btn-${viewStatus === "3" ? "success" : "info"} mr-2`}>Table View</button>
            </div>

            <input type="text" 
                value={search} 
                onChange={handelSearch} 
                className="search" 
                placeholder="Search by Name or Dept"
            />

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


            <nav aria-label="Page navigation example" className="mt-4 float-right pr-4">
                <ul className="pagination">
                    <li className={`page-item ${pagiPerPage <= 0 && "disabled"}`}>
                    <a className="page-link" href="#" onClick={() => handlePage("prev")}>Previous</a></li>
                    {pagiStudents.map((val,index) => {
                        let numPg = pagiStudents.length % 2 == 1 ? (pagiStudents.length + 1) / 2 : pagiStudents.length / 2;
                        if(index < numPg){
                            return <li className={`page-item ${pageStay === index + 1 && "active"}`}><a className="page-link" href="#" onClick={() => handlePage(index + 1)}>{index + 1}</a></li>
                        }
                    })}
                    {/* <li className={`page-item ${pageStay === 2 && "active"}`}><a className="page-link" href="#" onClick={() => handlePage(2)}>2</a></li>
                    <li className={`page-item ${pageStay === 3 && "active"}`}><a className="page-link" href="#" onClick={() => handlePage(3)}>3</a></li> */}

                    <li className={`page-item ${pagiPerPage + 2 >= pagiStudents.length && "disabled"}`}>
                    <a className="page-link" href="#" onClick={() => handlePage("nxt")}>Next</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default PortalView;