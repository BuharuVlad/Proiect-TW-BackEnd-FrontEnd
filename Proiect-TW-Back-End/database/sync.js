import { Sequelize } from "sequelize";
import {
  database,
  username,
  password,
  sequaliezeConfigProps,
} from "../config.js";
import { sequelizeOperationsApi } from "./operations-api.js";

function checkData(database, username, password) {
  if (database === "insert_database") {
    console.log(
      `The name of database is the defauld one ${database}. Please insert your database name!`
    );
    return false;
  }
  if (database.length < 3) {
    console.log(
      "the name of database is the defauld one. Please insert your database name!"
    );
    return false;
  }
  if (username === "username" && password === "password") {
    console.log(
      `The username or password are the defauld one ${username} and ${username}. Please insert your user and password!`
    );
    return false;
  }
  return true;
}

var sequelizeConnection = null;

if (checkData(database, username, password) == true) {
  sequelizeConnection = new Sequelize(
    database,
    username,
    password,
    sequaliezeConfigProps
  );

  //trebuie sa sincronizam totul pentru ca trebuie sa asteptam conexiunea la baza de date
  sequelizeOperationsApi.init(sequelizeConnection);
}

export var Students = sequelizeConnection.define("Students", {
  StudentId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  Name: {
    type: Sequelize.STRING,
  },
  Age: {
    type: Sequelize.INTEGER,
  },
  City: {
    type: Sequelize.STRING,
  },
});

export var Books = sequelizeConnection.define("Books", {
  BookId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  Title: {
    type: Sequelize.STRING,
  },
  Autor: {
    type: Sequelize.STRING,
  },
  Price: {
    type: Sequelize.DECIMAL(18, 2),
  },
});

Students.hasMany(Books, {
  foreignKey: "StudentId",
  onDelete: "CASCADE", //nu ne lasa sa stergem student fara sa stearga si cartile pe care le detine
  onUpdate: "CASCADE", //daca actualizezi id-ul la student se actuealizeaza si id-ul din cartiile e care le detine
  foreignKeyConstraint: true,
});

export { sequelizeConnection };
