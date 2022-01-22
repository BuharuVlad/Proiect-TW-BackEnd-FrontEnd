import { Fragment, useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import ReadOnlyRowStudents from "./ReadOnlyRowStudents";
import EditableRowStudents from "./EditableRowStudents";
import axios from 'axios';

const API = "http://localhost:8000/api/sequelize/students/";


function Students() {
  
  //declarare si initializare a studentilor preluati din baza de date
  const [studentsData, setStudentsData] = useState({
    select: false,
    data: [],
    loading: false,
    loaded: false,
  });
  //declarare si initializare a studentilor preluati din baza de date

  //add student
  
 //add student

  //preluam id din tabel sa-l putem edita
  const [editStudentId, setEditStudentId] = useState(null);
  //preluam id din tabel sa-l putem edita

  //salvarea datelor din formularul de edit
  const [editStudentData, setStudentData] = useState({
    StudentId: "",
    Name: "",
    Age:"",
    City:"",
    createAt:"",
  });
  //salvarea datelor din formularul de edit

  //preluarea studentilor din baza de date SQLite cu ajutorul backend-ului
  async function fetchStudents() {
    setStudentsData(function setState(prevState) {
      return { ...prevState, loading: true };
    });

    try {
      const response = await fetch(API);
      const data1 = await response.json();
      setStudentsData({
        select: false,
        data: data1,
        loading: false,
        loaded: true,
      });
    } catch (error) {
      setStudentsData(function setState(prevState) {
        return { ...prevState, loading: false, loaded: false };
      });
      console.error(error);
    }
  }
  useEffect(
    function insideEffect() {
      if (!studentsData.loaded) {
        fetchStudents();        
      }
    },
    [studentsData.loaded]
  );  
  //preluarea studentilor din baza de date SQLite cu ajutorul backend-ului

  //set id din tabel in state
  const handleEditClick = async function setStudenttest (event, student){
    event.preventDefault();
    setEditStudentId(student.StudentId);
    console.log("handleEditClick1")
    console.log(student); //verificare preluare student

    const studentValues = {
      StudentId: student.StudentId,
      Name: student.Name,
      Age: student.Age,
      City: student.City,
      createdAt: student.createdAt,
    }
    console.log("handleEditClick12");
    console.log(studentValues); //verificare setare student nou
    setStudentData(studentValues);
  }
   //set id din tabel in state

   //preluarea datelor din formular de edit
  const handleEditStudentChange = (event) =>{
    event.preventDefault();

    const fieldName = event.target.getAttribute("Name");
    const fieldValue = event.target.value;

    const newStudentData = { ...editStudentData };
    newStudentData[fieldName] = fieldValue;

    setStudentData(newStudentData);
  }
   //preluarea datelor din formular de edit

   const handleCancelClick = () => {
    setEditStudentId(null);
  };

   //delete a student from table and sqlite
  const handleDeleteClick = (StudentId) => {
      axios.delete(API + StudentId).then(
      response => {
        console.log(response);
      })
  }
  //delete a student from table and sqlite

  return (
    <Fragment>
      {
        //desenare contionata folosind scurcircuitarea
        studentsData.loading && <CircularProgress />
      }
      {
        <Fragment>        
            <Link to="/addStudent">
              <button type="button" className="btn-addStudent">
                Add Student
              </button>
            </Link>
      </Fragment>

      }
      <form>
      <table className="table-students">
        <thead>
          <tr>
            <th className="header" scop="col">
              Id
            </th>
            <th className="header" scop="col">
              Name
            </th>
            <th className="header" scop="col">
              Age
            </th>
            <th className="header" scop="col">
              City
            </th>
            <th className="header" scop="col">
              Create Date
            </th>
            <th className="header" scop="col">
              Buttons
            </th>
          </tr>
        </thead>
        <tbody>
          {
            studentsData.data.map((student)=>(
              <Fragment key={student.StudentId}>
                {
                  editStudentId === student.StudentId 
                  ? (
                  <EditableRowStudents 
                    editStudentData={editStudentData} 
                    handleEditStudentChange={handleEditStudentChange}
                    handleCancelClick={handleCancelClick}  
                  /> 
                  ): (
                  <ReadOnlyRowStudents 
                    student={student} 
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                  )
                }
              </Fragment>
            ))
          }
        </tbody>
      </table>
      </form>
      
    </Fragment>
  );
}

export default Students;
