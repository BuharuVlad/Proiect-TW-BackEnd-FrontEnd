import { Books, Students } from "./sync.js";



async function sequelizeAuth(sequelizeConnection) {
  try {
    await sequelizeConnection.authenticate();
    console.log("Sequelize has successefully connected to the database!");
  } catch (err) {
    console.error(
      `There was an error connectiong to the database using sequelize: ${err}`
    );
  }
}
async function sequelizeSync(sequelizeConnection) {
  try {
    //force and alter o sa se ocupe ca la fiecare rulare de server sa stearga entitatile existente si sa le creeze
    //recomandat ca force sa fie pe false (force: false) daca entitatile sunt in regula astfel nu se pierd datele din baza de date
    await sequelizeConnection.sync({ force: false, alter: true });
    console.log("Sync completed!");
  } catch (err) {
    console.error(`Sync failed: ${err}`);
  }
}

// async function executeInitlialDatabasePopulation() {
//   try {
//     await Students.create({
//       Name: "Student1",
//       Age: 19,
//       City: "Slatina",
//     });
//     await Students.create({
//       Name: "Student2",
//       Age: 21,
//       City: "Craiova",
//     });
//     await Students.create({
//       Name: "Student3",
//       Age: 20,
//       City: "Targu Jiu",
//     });
//     await Students.create({
//       Name: "Student4",
//       Age: 21,
//       City: "Pitesti",
//     });
//     await Students.create({
//       Name: "Student5",
//       Age: 22,
//       City: "Slatina",
//     });
//     await Books.create({
//       Title:
//         "Node.Js 8 the Right Way: Practical, Server-Side JavaScript That Scales",
//       Price: 80.5,
//       Autor: "Jim Wilson",
//       StudentId: 1,
//     });
//     await Books.create({
//       Title:
//         "Node.Js the Right Way: Practical, Server-Side JavaScript That Scales",
//       Price: 125.5,
//       Autor: "Jim Wilson",
//       StudentId: 1,
//     });
//     await Books.create({
//       Title: "Beginning Node.js, Express & MongoDB Development, Paperback",
//       Price: 138.5,
//       Autor: "Greg Lim",
//       StudentId: 2,
//     });
//   } catch (err) {
//     console.error(`There was a probleme populationg the database: ${err}`);
//   }
// }

async function sequalizeInit(sequelizeConnection) {
  await sequelizeAuth(sequelizeConnection);
  await sequelizeSync(sequelizeConnection);
  //await executeInitlialDatabasePopulation();
}

async function execAsyncRequest(asyncRequest) {
  try {
    return await asyncRequest();
  } catch (err) {
    throw err;
  }
}

//STUDENTS

//get all students
async function getStudents() {
  return await Students.findAll();
}

//validate the id for get one Student and one book

function validateStudentId(sentId, response, callbackFn = function () { }) {
  if (Number.isFinite(sentId) && sentId > 0) return callbackFn();
  else response.status(500).json(`"Please insert a number! Invalid Id!"`);
}
function validateBookId(sentId, response, callbackFn = function () { }) {
  if (Number.isFinite(sentId) && sentId > 0) return callbackFn();
  else response.status(500).json(`"Please insert a number! Invalid Id!"`);
}

//get a student
async function getStudentById(StudentId) {
  return await Students.findAll({ where: { StudentId: StudentId } });
}

//insert a student
async function createStudent(Student) {
  await execAsyncRequest(async function createStudent() {
    await Students.create({
      Name: Student.Name,
      Age: Student.Age,
      City: Student.City,
    });
  });
}

//delete a student
async function deleteStudent(StudentId) {
  await execAsyncRequest(async function deleteStudent() {
    var record = await Students.findByPk(StudentId);
    if (record) await record.destroy();
  });
}

// update a student
async function updateStudent(StudentId, Student) {
  await execAsyncRequest(async function updateStudent() {
    var record = await Students.findByPk(StudentId);
    if (record === null) {
      return -1;
    } else {
      if (record)
      {
        await record.update({
          Name: Student.Name,
          Age: Student.Age,
          City: Student.City,
        });
      console.log(`Update a student successed!`)
      }
    }
  });

}

//STUDENTS

//BOOKS

//get all books
async function getBooks() {
  return await Books.findAll();
}

//get one book
async function getBookById(BookId) {
  return await Books.findAll({ where: { BookId: BookId } });
}

async function createBook(Book) {
  await execAsyncRequest(async function createBook() {
    await Books.create({
      Title: Book.Title,
      Autor: Book.Autor,
      Price: Book.Price,
      StudentId: Book.StudentId,
    });
  });
}

//delete a book
async function deleteBook(BookId) {
  await execAsyncRequest(async function deleteBook() {
    var record = await Books.findByPk(BookId);
    if (record) await record.destroy();
  });
}

//update a book
async function updateBook(BookId, Book) {
  await execAsyncRequest(async function updateOrder() {
    var record = await Books.findByPk(BookId);
    if (record)
      await record.update({
        Title: Book.Title,
        Autor: Book.Autor,
        Price: Book.Price,
        StudentId: Book.StudentId,
      });
  });
}

//BOOKS

export const sequelizeOperationsApi = {
  init: sequalizeInit,
  getStudents: getStudents,
  validateStudentId: validateStudentId,
  validateBookId: validateBookId,
  getStudentById: getStudentById,
  getBooks: getBooks,
  getBookById: getBookById,
  createStudent: createStudent,
  createBook: createBook,
  deleteStudent: deleteStudent,
  deleteBook: deleteBook,
  updateStudent: updateStudent,
  updateBook: updateBook,
};
