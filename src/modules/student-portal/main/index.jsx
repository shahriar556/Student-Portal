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


class StudentPortal extends React.Component {
    state = {
        students: [
            {id:"slk35j34",name:"Shahriar Ahmad",dept:"SWE"},
            {id:"slk3ewr",name:"Rifat Ahmad",dept:"EEE"},
            {id:"slk3sfsfs4",name:"Faruk Ahmad",dept:"SWE"},
            {id:"slk3fs5j34",name:"Rasel Ahmad",dept:"CSE"},
            {id:"slk3fs5jd34",name:"Fuad Ahmad",dept:"SWE"}
        ],
        searchStudents: [
            {id:"slk35j34",name:"Shahriar Ahmad",dept:"SWE"},
            {id:"slk3ewr",name:"Rifat Ahmad",dept:"EEE"}
        ],
        editable: false,
        selectedStudent: null,
        viewStatus: "1",
        alertMsg: null,
        search: ""
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

    render(){
        if(this.state.alertMsg){
            setTimeout( () => {
                this.setState({alertMsg: null})
            }, 5000);
        }
        const {students,viewStatus,editable,selectedStudent,searchStudents,search} = this.state;
        let editableStudent = null;
        
        let initialValues = {name: "",dept: ""}
        if(editable){
            editableStudent = students.find(student => student.id === selectedStudent);
            initialValues.name = editableStudent.name;
            initialValues.dept = editableStudent.dept;
            
        }
        let passStudents = []
        if(search === ""){
            passStudents = students;
        }else{
            const students = this.state.students.filter(student => student.name.toLowerCase() == search.toLowerCase() || student.dept.toLowerCase() == search.toLowerCase());
            // this.setState({searchStudents: students});

            passStudents = students
        }

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


                        {/* <input type="text" 
                            value={this.state.search} 
                            onChange={this.handelSearch} 
                            className="search" 
                            placeholder="Search by Name or Dept"
                        /> */}
                    </div>
                    
                    <PortalView 
                        students={passStudents}
                        handleEdit={this.handleEdit}
                        handleDelete={this.handleDelete}
                        handleViewChange={this.handleViewChange}
                        viewStatus={viewStatus}
                        handelSearch={this.handelSearch}
                        search={this.state.search} 
                    />
                    
                </div>

            </div>
        )
    }
}

export default StudentPortal;