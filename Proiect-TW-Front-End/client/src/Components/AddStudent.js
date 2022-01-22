import { Fragment, useState } from "react";
import axios from "axios";

function AddStudent(){

  const API = "http://localhost:8000/api/sequelize/students/";
  const [student,setStudent]=useState();
  const [addFormatData, setAddFormatData] = useState({
    Name: '',
    Age: '',
    City:'',
  })

  const handleAddFormatChange = (event)=>{
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const filedValue = event.target.value;

    const newFormData = { ...addFormatData };
    newFormData[fieldName] = filedValue;

    setAddFormatData(newFormData);
  }

   const handleAddFormatSubmit = (event) =>{

    const newStudent = {
      Name: addFormatData.Name,
      Age: parseInt(addFormatData.Age),
      City: addFormatData.City,
    };
    
    //setStudent(newStudent);
    console.log(newStudent);
    console.log(typeof(newStudent.Name));    
    console.log(typeof(newStudent.Age));
    console.log(typeof(newStudent.City));
    //console.log(student);
    console.log(API);
    
    setStudent(newStudent);
    addStudent();

  }
    
  async function addStudent(){
      await axios.post(API, student);

    }

    return (
        <Fragment>
        <form onSubmit={handleAddFormatSubmit}>
        <table className="table-students">
        
        <thead>
        
          <tr>
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
              Button
            </th>
          </tr>

          <tr>
            
             <td  className="row">
                    <input 
                        type="text" 
                        name="Name" 
                        required="required"
                        placeholder="Enter a name..."
                        onChange={handleAddFormatChange}
                    >
                    </input>
                  </td>              
                  <td  className="row">
                  <input 
                      type="number" 
                      name="Age" 
                      required="required"
                      placeholder="Enter a age..."
                      onChange={handleAddFormatChange}
                  >
                  </input>
                  </td>
                  <td  className="row">
                    <input 
                        type="text" 
                        name="City" 
                        required="required"
                        placeholder="Enter a city..."
                        onChange={handleAddFormatChange}
                    >
                    </input>
                  </td>
                  <td>
                    <button type="button" onClick={handleAddFormatSubmit}>
                      Add Student
                    </button>
                  </td>
              
          </tr>
        
          
        </thead>
        </table>
        </form>
        </Fragment>
    );
}


export default AddStudent;