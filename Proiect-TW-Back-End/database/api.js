import "./sync.js";
//importam router-ul si sequelizeOperationsAPI
import { router } from "../server-init.js";
import { sequelizeOperationsApi } from "./operations-api.js";
import { Books, Students } from "./sync.js";

var numberOfStudents = 0;
var numberOfBooks = 0;

async function takeNumberOfStudentsAndBooks() {
  numberOfStudents = await Students.max("StudentId");
  numberOfBooks = await Books.max("BookId");
  console.log(numberOfBooks);
  numberOfStudents++;
  numberOfBooks++;
}
takeNumberOfStudentsAndBooks(); //update de numbers
/* Students */
//get all Students
router
  .route("/sequelize/students")
  .get(async function getSequelizeStudents(_, response) {
    var result = await sequelizeOperationsApi.getStudents();
    response.status(200).json(result);
  });

//get one Student
router
  .route("/sequelize/students/:studentsId")
  .get(async function getStudentById(req, res) {
    const studentsId = +req.params.studentsId;
    takeNumberOfStudentsAndBooks();
    if (studentsId < numberOfStudents) {
      sequelizeOperationsApi.validateStudentId(
        studentsId,
        res,
        async function handleSuccessfulValidation() {
          var result = await sequelizeOperationsApi.getStudentById(studentsId);
          if (result != "") {
            res.status(200).json(result);
          }
          else {
            res.status(400).json(`The id ${studentsId} is empty!`);
          }
        }
      );
    } else {
      res.status(400).json(`Invalid Id! Insert an id under ${numberOfStudents}`);
    }
  });

//insert a student
router.route("/sequelize/students").post(async ({ body }, res) => {
  try {
    if (Object.keys(body) != 0) {
      if (checkDataForStudent(body, res).toString() === "true") {
        await sequelizeOperationsApi.createStudent(body);
        takeNumberOfStudentsAndBooks(); //update de numbers
        res.status(200).json("Success!");
      }
    } else {
      res.status(400).json("Something is wrong!");
    }
  } catch (err) {
    console.error(`Error while calling API: ${err}`);
  }
});

//delete a student
router
  .route("/sequelize/students/:StudentId")
  .delete(async function deleteStudent({ params: { StudentId } }, res) {
    try {
      takeNumberOfStudentsAndBooks(); //update de numbers
      var result = await sequelizeOperationsApi.getStudentById(StudentId);
      if (result != "") {
        if (StudentId < numberOfStudents) {
          sequelizeOperationsApi.validateStudentId(
            +StudentId,
            res,
            async function handleSuccessfulValidation() {
              await sequelizeOperationsApi.deleteStudent(+StudentId);
              takeNumberOfStudentsAndBooks(); //update de numbers
              res.status(200).json("Success!");
            }
          );
        } else {
          res.status(400).json(`Invalid Id! Insert an id under ${numberOfStudents}`);
        }
      } else {
        res.status(400).json(`The id ${StudentId} is empty!`);
      }
    } catch (err) {
      console.error(`Error while calling API: ${err}`);
    }
  });


//update a student
router
  .route("/sequelize/students/:StudentId")
  .put(async function updateStudent({ body, params: { StudentId } }, res) {
    try {
      takeNumberOfStudentsAndBooks();
      var result = await sequelizeOperationsApi.getStudentById(StudentId);
      if (result != "") {
        if (StudentId < numberOfStudents) {
          sequelizeOperationsApi.validateStudentId(
            +StudentId,
            res,
            async function handleSuccessfulValidation() {
              await sequelizeOperationsApi.updateStudent(+StudentId, body);
              res.status(200).json("Success!");
            }
          );
        } else {
          res.status(400).json(`Invalid Id! Insert an id under ${numberOfStudents}`);
        }
      } else {
        res.status(400).json(`The id ${StudentId} is empty!`);
      }
    } catch (err) {
      console.error(`Error while calling API: ${err}`);
    }
  });
/* Students */

/* Books */
//get all Books
router
  .route("/sequelize/books")
  .get(async function getSequelizeBooks(_, response) {
    var result = await sequelizeOperationsApi.getBooks();
    response.status(200).json(result);
  });

//get one Books
router
  .route("/sequelize/books/:bookId")
  .get(async function getBookById(req, res) {
    const bookId = +req.params.bookId;
    takeNumberOfStudentsAndBooks();
    if (bookId < numberOfBooks) {
      sequelizeOperationsApi.validateBookId(
        bookId,
        res,
        async function handleSuccessfulValidation() {
          var result = await sequelizeOperationsApi.getBookById(bookId);
          if (result != "") {
            res.status(200).json(result);
          } else {
            res.status(400).json(`The id ${bookId} is empty!`);
          }
        }
      );
    } else {
      res.status(400).json(`Invalid Id! Insert an id under ${numberOfBooks}`);
    }
  });

//insert a book
router.route("/sequelize/books").post(async ({ body }, res) => {
  try {
    if (checkDataForBook(body, res).toString() === "true") {
      takeNumberOfStudentsAndBooks();
      var result = await sequelizeOperationsApi.getStudentById(body.StudentId);
      if (result != "") {

        if (Object.keys(body) != 0) {
          await sequelizeOperationsApi.createBook(body);
          res.status(200).json("Success!");
        } else {
          res.status(400).json("Something is wrong!");
        }
      } else {
        res.status(400).json(`The id ${body.StudentId} is empty!`);
      }
    }
  } catch (err) {
    console.error(`Error while calling API: ${err}`);
  }
});

//delete a book
router
  .route("/sequelize/books/:BookId")
  .delete(async function deleteBook({ params: { BookId } }, res) {
    try {
      takeNumberOfStudentsAndBooks(); //update de numbers
      var result = await sequelizeOperationsApi.getBookById(BookId);
      if (result != "") {
        if (BookId < numberOfBooks) {
          sequelizeOperationsApi.validateBookId(
            +BookId,
            res,
            async function handleSuccessfulValidation() {
              await sequelizeOperationsApi.deleteBook(+BookId);
              res.status(200).json("Success!");
              takeNumberOfStudentsAndBooks(); //update de numbers
            }
          );
        } else {
          res.status(400).json(`Invalid Id! Insert an id under ${numberOfBooks}`);
        }
      } else {
        res.status(400).json(`The id ${BookId} is empty!`);
      }
    } catch (err) {
      console.error(`Error while calling API: ${err}`);
    }
  });

//update a Book
router
  .route("/sequelize/books/:BookId")
  .put(async function updateBook({ body, params: { BookId } }, res) {
    try {
      if (checkDataForBook(body, res).toString() === "true") {
        takeNumberOfStudentsAndBooks();
        if (BookId < numberOfBooks) {
          var result = await sequelizeOperationsApi.getBookById(BookId);
          if (result != "") {
            sequelizeOperationsApi.validateBookId(
              +BookId,
              res,
              async function handleSuccessfulValidation() {
                var result = await sequelizeOperationsApi.getStudentById(body.StudentId);
                if (result != "") {
                  await sequelizeOperationsApi.updateBook(+BookId, body);
                  res.status(200).json("Success!");
                }
                else {
                  res.status(400).json(`The id ${body.StudentId} is empty!`);
                }
              }
            );
          } else {
            res.status(400).json(`The id ${BookId} is empty!`);
          }
        }
        else {
          res.status(400).json(`Invalid Id! Insert an id under ${numberOfBooks}`);
        }
      }

    } catch (err) {
      console.error(`Error while calling API: ${err}`);
    }
  });

/* Books */

//check data
function checkDataForStudent(body, res) {
  if (body.length == 0) {
    res.status(400).json({ message: "Body is missing" });
    return false;
  }

  if (body.length < 3) {
    res.status(400).json({ message: "Malformed request" });
    return false;
  }

  if (body.Age < 18) {
    res.status(400).json({ message: "Age should be higher then 18" });
    return false;
  }

  if (typeof body.Age != "number") {
    res.status(400).json({ message: "Age must be a number" });
    return false;
  }

  if (body.Name === "") {
    res.status(400).json({ message: "Name is empty" });
    return false;
  }

  if (typeof body.Name != "string") {
    res.status(400).json({ message: 'Name  shoud  be string! Ex: "Buharu"' });
    return false;
  }

  if (body.Name.length < 3 || body.Name.length > 250) {
    res.status(400).json({ message: "Name is empty or si to long" });
    return false;
  }

  if (body.City.length < 4 || body.City.length > 250) {
    res.status(400).json({ message: "Name of city is to short or to long" });
    return false;
  }

  if (typeof body.City != "string") {
    res.status(400).json({ message: "Name of city shoud be string" }); return false;
  }
  return true;
}

function checkDataForBook(body, res) {
  if (body.length == 0) {
    res.status(400).json({ message: "Body is missing" });
    console.log(1);
    return false;
  }

  if (body.length < 3) {
    res.status(400).json({ message: "Malformed request" });
    console.log(1);
    return false;
  }

  if (body.Title === "") {
    res.status(400).json({ message: "Title is empty" });
    console.log(1);
    return false;
  }

  if (typeof body.Title != "string") {
    res
      .status(400)
      .json({ message: 'Title  shoud  be string! Ex: "Java for beginners"' });
    console.log(1);
    return false;
  }

  if (body.Title.length <= 3 || body.Title.length > 250) {
    res
      .status(400)
      .json({ message: "Title of the book is to short or to long" });
    console.log(1);
    return false;
  }

  if (body.Autor.length < 3) {
    res.status(400).json({ message: "Name of autor is to short" });
    console.log(1);
    return false;
  }

  if (typeof body.Autor != "string") {
    res.status(400).json({ message: "Name of autor shoud be string" });
    console.log(1);
    return false;
  }

  if (body.Price < 0) {
    res.status(400).json({ message: "Price should be a possitive number" });
    console.log(1);
    return false;
  }

  if (typeof body.Price != "number") {
    res.status(400).json({ message: "Price must be a number" });
    console.log(1);
    return false;
  }

  if (body.StudentId < 0 || body.StudentId > numberOfStudents) {
    res.status(400).json({
      message: `StudentId should be a possitive number and under ${numberOfStudents}`,
    });
    console.log(1);
    return false;
  }

  if (typeof body.StudentId != "number") {
    res.status(400).json({ message: "StudentId must be a number" });
    console.log(1);
    return false;
  }
  return true;
}

