import React from "react";
import {useState} from "react";
import axios from 'axios';

const EditableRowStudents = (editStudentData, handleEditStudentChange, handleCancelClick) =>{
    
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [city, setCity] = useState('');

    const API = "http://localhost:8000/api/sequelize/students/";

    async function updateStudent(){
        
        const NewStudent = {
            Name: name,
            Age:  age,
            City: city,
        }

        await axios.put(API + editStudentData.StudentId, NewStudent)
        .then(response => {console.log(response)});
    }

    editStudentData = editStudentData.editStudentData;
    return (
        <tr key={editStudentData.StudentId}>
            <td>{editStudentData.StudentId}</td>
            <td>
            <input 
                type="text"
                required="required"
                placeholder="Enter a name..."
                name="Name"
                defaultValue={editStudentData.Name}
                onChange={
                    (event) =>{
                        setName(event.target.value);
                    }
                }
            ></input>
            </td>
            <td>
            <input 
                type="number"
                required="required"
                placeholder="Enter the age..."
                name="Age"
                defaultValue={editStudentData.Age}
                onChange={
                    (event) =>{
                        setAge(event.target.value);
                    }
                }
            ></input>
            </td>
            <td>
            <input 
                type="text"
                required="required"
                placeholder="Enter the city..."
                name="City"
                defaultValue={editStudentData.City}
                onChange={
                    (event) =>{
                        setCity(event.target.value);
                    }
                }
            ></input>
            </td>
            <td>{editStudentData.createdAt}</td>
            <td>
                <button type="submit" className="row-btn-students" onClick={updateStudent}>Save</button>
                <button type="button" className="row-btn-students">Cancel</button>
            </td>
        </tr>
    )
}

export default EditableRowStudents;