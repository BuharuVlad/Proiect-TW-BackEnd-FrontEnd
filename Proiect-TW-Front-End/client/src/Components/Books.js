import { Fragment, useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import ReadOnlyRowBooks from "./ReadOnlyRowBooks";
import EditableRowBooks from "./EditableRowBooks";
import axios from 'axios';

const API = "http://localhost:8000/api/sequelize/books/";


function Books() {
  const [booksData, setBooksData] = useState({
    select: false,
    data: [],
    loading: false,
    loaded: false,
  });
  
  const [editBookId, setEditBookId] = useState(null);
  
  const [editBookData, setBookData] = useState({
    BookId: "",
    Title: "",
    Autor:"",
    Price:"",
    updatedAt:"",
  });
  
  async function fetchBooks() {
    setBooksData(function setState(prevState) {
      return { ...prevState, loading: true };
    });

    try {
      const response = await fetch(API);
      const data1 = await response.json();
      setBooksData({
        select: false,
        data: data1,
        loading: false,
        loaded: true,
      });
    } catch (error) {
      setBooksData(function setState(prevState) {
        return { ...prevState, loading: false, loaded: false };
      });
      console.error(error);
    }
  }
  useEffect(
    function insideEffect() {
      if (!booksData.loaded) {
        fetchBooks();        
      }
    },
    [booksData.loaded]
  );  
  
  const handleEditClick = async function setBooktest (event, book){
    event.preventDefault();
    setEditBookId(book.BookId);
    console.log("handleEditClick1")
    console.log(book); 

    const bookValues = {
      BookId: book.BookId,
      Title: book.Title,
      Autor: book.Autor,
      Price: book.Price,
      updatedAt: book.updatedAt,
    }
    console.log("handleEditClick12");
    console.log(bookValues); 
    setBookData(bookValues);
  }

  const handleEditBookChange = (event) =>{
    event.preventDefault();

    const fieldName = event.target.getAttribute("Name");
    const fieldValue = event.target.value;

    const newBookData = { ...editBookData };
    newBookData[fieldName] = fieldValue;

    setBookData(newBookData);
  }

   const handleCancelClick = () => {
    setEditBookId(null);
  };

  const handleDeleteClick = (BookId) => {
      axios.delete(API + BookId).then(
      response => {
        console.log(response);
      })
  }

  return (
    <Fragment>
      {
        //desenare contionata folosind scurcircuitarea
        booksData.loading && <CircularProgress />
      }
      {
        <Fragment>        
            <Link to="/addBook">
              <button type="button" className="btn-addBook">
                Add Book
              </button>
            </Link>
      </Fragment>

      }
      <form>
      <table className="table-books">
        <thead>
          <tr>
            <th className="header" scop="col">
              Id
            </th>
            <th className="header" scop="col">
              Title
            </th>
            <th className="header" scop="col">
              Autor
            </th>
            <th className="header" scop="col">
              Price
            </th>
            <th className="header" scop="col">
               Update Date
            </th>
            <th className="header" scop="col">
              Student Id
            </th>
            <th className="header" scop="col">
              Buttons
            </th>
          </tr>
        </thead>
        <tbody>
          {
            booksData.data.map((book)=>(
              <Fragment key={book.BookId}>
                {
                  editBookId === book.BookId 
                  ? (
                  <EditableRowBooks 
                    editBookData={editBookData} 
                    handleEditBookChange={handleEditBookChange}
                    handleCancelClick={handleCancelClick}  
                  /> 
                  ): (
                  <ReadOnlyRowBooks 
                    book={book} 
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

export default Books;
