//import http from "http";
import "dotenv/config";
import app from "./src/app.js";

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Servidor escutando!");
});


// O bloco de código comentado fazia as rotas e subia o servidor com a biblioteca http e não com o express.
/*
const rotas = {
    "/": "Curso de Node.Js",
    "/livros": "Entrei na rota livro....",
    "/autores": "Entrei na rota autores..."
};
const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(rotas[req.url]);
});
*/