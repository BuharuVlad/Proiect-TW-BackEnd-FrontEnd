//fisierul care initiaza serverul
// importam cele 2 pachete
import express from "express";
import cors from "cors";

// importam fisierul .env pentru a avea acces la variabilele definite in acesta
import doenv from "dotenv";

doenv.config();

// initializam serverul
const server = express();

//router care se ocupa de gestionarea rutelor
const router = express.Router();

// acesta foloseste middelwhere-uri sau utilitare
//
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
// request intre 2 surse diferite
server.use(cors());

server.use("/api", router);

// definim un port
var port = process.env.PORT || 8000;

//ii indicam pe ce port asculta
server.listen(port, function afterServerStart() {
  console.log(`Server is running on port ${port}...`);
});

// exportam sever si router

export { server, router };
