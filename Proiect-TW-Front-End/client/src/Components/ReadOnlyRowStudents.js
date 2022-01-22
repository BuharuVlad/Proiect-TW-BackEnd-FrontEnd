import React from 'react';

function ReadOnlyRowStudents({ student, handleEditClick, handleDeleteClick }) {
    return (
        <tr key={student.StudentId}>
            <td className="row">{student.StudentId}</td>
            <td className="row">{student.Name}</td>
            <td className="row">{student.Age}</td>
            <td className="row">{student.City}</td>
            <td className="row">{student.createdAt}</td>
            <td>
                <button 
                    type='button'
                    className="row-btn-students" 
                    onClick=
                    {
                        (event)=>handleEditClick(event, student)
                    }
                >Edit</button>
                <button className="row-btn-students"
                onClick={
                    () => handleDeleteClick(student.StudentId)
                }>Delete
                </button>
            </td>
        </tr>
    );
}

export default ReadOnlyRowStudents;