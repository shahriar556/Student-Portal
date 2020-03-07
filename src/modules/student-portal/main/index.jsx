import React from 'react';
import './style.css';
import {Formik} from 'formik';
import shortid from 'shortid'
import * as yup from 'yup';

import PortalView from '../features/view/'
import FormView from '../features/form/formView';


const validationShcema = yup.object().shape({
    name: yup.string().required("Required Field!").min(4,"Too Short!").max(20,"Too Long!"),
    dept: yup.string().required("Required Field")
});

const PERPAGE = 2;


class StudentPortal extends React.Component {
    state = {
        students: [
            {id:"slk35je4",name:"HM Nayem",dept:"EEE"},
            {id:"slk35j34",name:"Shahriar Ahmad",dept:"SWE"},
            {id:"slk3ewr",name:"Rifat Ahmad",dept:"EEE"},
            {id:"slk3sfsfs4",name:"Faruk Ahmad",dept:"SWE"},
            {id:"slk3fs5j34",name:"Rasel Ahmad",dept:"CSE"},
            {id:"slk3fs5jd34",name:"Fuad Ahmad",dept:"SWE"},
            {id:"slk3fs5jd31",name:"Name one",dept:"SWE"},
            {id:"slk3fs5jd32",name:"Name Two",dept:"SWE"},
            {id:"slk3fs5jd33",name:"Name Three",dept:"SWE"},
            {id:"slk3fs5js4",name:"Name Four",dept:"SWE"},
            {id:"slk3fs5jd35",name:"Name Five",dept:"SWE"},
            {id:"slk3fs5jd36",name:"Name Six",dept:"SWE"},
            {id:"slk3fs5jd37",name:"Name Seven",dept:"SWE"},
            {id:"slk3fs5jd38",name:"Name Eight",dept:"SWE"},
            {id:"slk3fs5jd39",name:"Name Nine",dept:"SWE"},
        ],
        editable: false,
        selectedStudent: null,
        viewStatus: "1",
        alertMsg: null,
        search: "",
        pagiPerPage: 0,
        pageStay: 1
    }

    handleViewChange = n => {
        this.setState({viewStatus: n})
    }

    handleEdit = id => {
        this.setState({
            editable: true,
            selectedStudent: id
        });
        if(this.state.editable){
            this.setState({btnSubmit: "Update",btnReset: "Cencel"})
        }
    }

    createStudent = student => {
        student.id = shortid.generate();
        const students = [...this.state.students, student];

        this.setState({students});
        // console.log(student) 
    }

    updateStudents = ({name,dept},id) => {
        const {students} = this.state;
        const student = students.find(student => student.id === id);
        student.name = name;
        student.dept = dept;
        this.setState({students}); 
    }

    handleDelete = id => {
        if(window.confirm("Are you sure to delete data ?")){
            const students = this.state.students.filter(student => student.id !== id);
            this.setState({students});

            if(this.state.selectedStudent === id){
                this.setState({editable:false,selectedStudent:null})
            }
            this.setState({alertMsg: "Successfully Data Deleted!"})
        }
    }

    editReset = () => {
        this.setState({editable:false,selectedStudent:null})
        // console.log(this.state)
    }

    handelSearch = e => {
        this.setState({search:e.target.value})
    }

    handlePage = vl => {
        // console.log(this.state.pagiPerPage + 2)
        // console.log(this.state.students.length)
        let pagiPerPage;
        if(this.state.pagiPerPage > 0 &&  vl === "prev"){
            pagiPerPage = this.state.pagiPerPage -PERPAGE;
            this.setState({pageStay: this.state.pageStay - 1})
        }
        if(vl === "nxt" && this.state.pagiPerPage + PERPAGE < this.state.students.length){
            pagiPerPage = this.state.pagiPerPage + PERPAGE;
            this.setState({pageStay: this.state.pageStay + 1})
        }
        if(vl != "prev" && vl != "nxt"){
            if(vl > this.state.pageStay){
                pagiPerPage = (PERPAGE * vl) - PERPAGE;
                this.setState({pageStay:  vl})
            }else{
                pagiPerPage = (PERPAGE * vl) - PERPAGE;
                this.setState({pageStay: vl})
            }
        }
        if(pagiPerPage != undefined){
            this.setState({pagiPerPage: pagiPerPage})
        }
    }

    render(){
        if(this.state.alertMsg){
            setTimeout( () => {
                this.setState({alertMsg: null})
            }, 5000);
        }
        const {students,viewStatus,editable,selectedStudent,search} = this.state;
        let editableStudent = null;
        
        let initialValues = {name: "",dept: ""}
        if(editable){
            editableStudent = students.find(student => student.id === selectedStudent);
            initialValues.name = editableStudent.name;
            initialValues.dept = editableStudent.dept;
            
        }
        let passStudents = []
        // let studentss = students.filter((val,index) => index < this.state.pagiPerPage);
        let studentss = students.slice(this.state.pagiPerPage, this.state.pagiPerPage+PERPAGE);

            // passStudents = students;
        if(search != ""){
            studentss = studentss.filter(student => {

                let fltr = search.toLowerCase().trim();

                if (student.name.toLowerCase().indexOf(fltr) > -1 || student.dept.toLowerCase().indexOf(fltr) > -1 ) {
                    return true;
                } else {
                    return false
                }
             });
            //  students = students.filter((val,index) => index < 2);
            studentss = studentss;
            
        }
        passStudents = studentss;


        return (
            <div className="main_portal">
                
                <div className="row">
                    <div className="col-lg-6 form">
                        
                        <h3>{editable ? "Update Studant Information" : "Create New Student"}</h3>
                        <Formik
                            initialValues={initialValues}
                            enableReinitialize="true"
                            onSubmit={(value,formikBag) => {
                                if(editable){
                                    this.updateStudents(value,selectedStudent);
                                    this.setState({alertMsg: "Successfully Data Updated!"})
                                }else{
                                    this.createStudent(value)
                                    formikBag.resetForm();
                                    this.setState({alertMsg: "Successfully Data Insetted!"})
                                }
                            }}
                            component={FormView}
                            validationSchema={validationShcema}
                            initialStatus={{editable: this.state.editable,editCencel: this.editReset}}
                        />
                        {this.state.alertMsg && 
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>Success: </strong> {this.state.alertMsg}
                        </div>}

                    </div>
                    
                    <PortalView 
                        students={passStudents}
                        handleEdit={this.handleEdit}
                        handleDelete={this.handleDelete}
                        handleViewChange={this.handleViewChange}
                        viewStatus={viewStatus}
                        handelSearch={this.handelSearch}
                        search={this.state.search} 
                        pagiPerPage={this.state.pagiPerPage}
                        handlePage={this.handlePage}
                        pagiStudents={this.state.students}
                        pageStay={this.state.pageStay}
                    />

                    {/* <nav aria-label="Page navigation example" className="mt-4 float-right pr-4">
                        <ul className="pagination">
                            <li className={`page-item ${this.state.pagiPerPage <= 0 && "disabled"}`}>
                            <a className="page-link" href="#" onClick={() => this.handlePage("prev")}>Previous</a></li>

                            <li className={`page-item ${this.state.pagiPerPage + 2 > this.state.students.length && "disabled"}`}>
                            <a className="page-link" href="#" onClick={() => this.handlePage("nxt")}>Next</a></li>
                        </ul>
                    </nav> */}







                    {/* <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
                        </ul>
                    </nav> */}


                    
                </div>

            </div>
        )
    }
}

export default StudentPortal;