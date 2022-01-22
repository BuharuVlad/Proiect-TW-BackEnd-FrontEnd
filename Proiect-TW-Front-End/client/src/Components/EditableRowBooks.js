import React from "react";
import {useState} from "react";
import axios from 'axios';

const EditableRowBooks = (editBookData, handleCancelClick) =>{
    
    const [title, setTitle] = useState('');
    const [autor, setAutor] = useState('');
    const [price, setPrice] = useState('');
    const [studentId, setStudentId] = useState('');

    const API = "http://localhost:8000/api/sequelize/books/";

    async function updateBook(){
        
        const NewBook = {
            Title: title,
            Autor: autor,
            Price: price,
            StudentId: studentId,
        }

        if(NewBook.Title != null && NewBook.Title != ''){
            if(NewBook.Autor != null && NewBook.Autor != ''){
                if(NewBook.Price != null && NewBook.Price != ''){
                    if(NewBook.StudentId != null && NewBook.StudentId != ''){

                    } else {
                        alert("Insert a StudentId!");
                    }
                } else {
                    alert("Insert a price!");
                }
            } else {
                alert("Insert a autor!");
            }
        } else{
            alert("Insert a title!");
        }
        console.log(NewBook);
        console.log(editBookData.BookId);
        console.log(API+editBookData.BookId);
        console.log(typeof(NewBook.Title) +" "+typeof(NewBook.Autor)+" "+typeof(NewBook.Price)+" "+typeof(NewBook.StudentId));
        await axios.put(API + editBookData.BookId, NewBook)
        .then(response => {console.log(response)});
    }

    editBookData = editBookData.editBookData;
    return (
        <tr key={editBookData.BookId}>
            <td>{editBookData.BookId}</td>
            <td>
            <input 
                type="text"
                required="required"
                placeholder="Enter a title..."
                name="Title"
                defaultValue={editBookData.Title}
                onChange={
                    (event) =>{
                        setTitle(event.target.value);
                    }
                }
            ></input>
            </td>
            <td>
            <input 
                type="text"
                required="required"
                placeholder="Enter the autor..."
                name="Autor"
                defaultValue={editBookData.Autor}
                onChange={
                    (event) =>{
                        setAutor(event.target.value);
                    }
                }
            ></input>
            </td>
            <td>
            <input 
                type="text"
                required="required"
                placeholder="Enter the price..."
                name="Price"
                defaultValue={editBookData.Price}
                onChange={
                    (event) =>{
                        setPrice(parseInt(event.target.value));
                    }
                }
            ></input>
            </td>            
            <td>{editBookData.updatedAt}</td>
            <td>
            <input 
                type="number"
                required="required"
                placeholder="Enter the StudentId..."
                name="StudentId"
                defaultValue={editBookData.StudentId}
                onChange={
                    (event) =>{
                        setStudentId(parseInt(event.target.value));
                    }
                }
            ></input>
            </td>
            <td>
                <button type="submit" className="row-btn-books" onClick={updateBook}>Save</button>
                <button type="button" className="row-btn-books">Cancel</button>
            </td>
        </tr>
    )
}

export default EditableRowBooks;