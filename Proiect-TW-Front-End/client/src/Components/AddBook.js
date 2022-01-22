import { Fragment, useState } from "react";
import axios from "axios";

function AddBook(){

  const API = "http://localhost:8000/api/sequelize/books/";
  const [book,setBook]=useState();
  const [addFormatData, setAddFormatData] = useState({
    Title: '',
    Price: '',
    Autor:'',
    StudentId: '',
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

    const newBook = {
      Title: addFormatData.Title,
      Price: parseInt(addFormatData.Price),
      Autor: addFormatData.Autor,
      StudentId: parseInt(addFormatData.StudentId),
    };
    
    //setStudent(newStudent);
    console.log(newBook);
    console.log(typeof(newBook.Title));    
    console.log(typeof(newBook.Autor));
    console.log(typeof(newBook.Price));
    console.log(typeof(newBook.StudentId));
    //console.log(student);
    console.log(API);
    
    setBook(newBook);
    addBook();

  }
    
  async function addBook(){
      await axios.post(API, book);

    }

    return (
        <Fragment>
        <form onSubmit={handleAddFormatSubmit}>
        <table className="table-students">
        
        <thead>
        
          <tr>
            <th className="header" scop="col">
              Title
            </th>
            <th className="header" scop="col">
              Price
            </th>
            <th className="header" scop="col">
              Autor
            </th>
            
            <th className="header" scop="col">
              StudentId
            </th>
            <th className="header" scop="col">
              Button
            </th>
          </tr>

          <tr>
            
             <td  className="row">
                    <input 
                        type="text" 
                        name="Title" 
                        required="required"
                        placeholder="Enter a title..."
                        onChange={handleAddFormatChange}
                    >
                    </input>
                  </td>              
                  <td  className="row">
                    <input 
                        type="number" 
                        name="Price" 
                        required="required"
                        placeholder="Enter a price..."
                        onChange={handleAddFormatChange}
                    >
                    </input>
                  </td>
                  <td  className="row">
                  <input 
                      type="text" 
                      name="Autor" 
                      required="required"
                      placeholder="Enter a author..."
                      onChange={handleAddFormatChange}
                  >
                  </input>
                  </td>
                  
                  <td  className="row">
                    <input 
                        type="number" 
                        name="StudentId" 
                        required="required"
                        placeholder="Enter a id Student..."
                        onChange={handleAddFormatChange}
                    >
                    </input>
                  </td>

                  <td>
                    <button type="button" onClick={handleAddFormatSubmit}>
                      Add Book
                    </button>
                  </td>
              
          </tr>
        
          
        </thead>
        </table>
        </form>
        </Fragment>
    );
}


export default AddBook;