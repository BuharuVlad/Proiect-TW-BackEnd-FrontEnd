import React from 'react';

function ReadOnlyRowBooks({ book, handleEditClick, handleDeleteClick }) {
    return (
        <tr key={book.BookId}>
            <td className="row">{book.BookId}</td>
            <td className="row">{book.Title}</td>
            <td className="row">{book.Autor}</td>
            <td className="row">{book.Price}</td>
            <td className='row'>{book.updatedAt}</td>            
            <td className="row">{book.StudentId}</td>
            <td>
                <button 
                    type='button'
                    className="row-btn-books" 
                    onClick=
                    {
                        (event)=>handleEditClick(event, book)
                    }
                >Edit
                </button>
                <button 
                    className="row-btn-books"            
                    onClick={
                        () => handleDeleteClick(book.BookId)
                    }
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}

export default ReadOnlyRowBooks;