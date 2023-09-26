import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: { 
    type: String, 
    required: [true, "O título do livro é obrigatório."] 
  },
  editora: { 
    type: String,
    required: [true, "A editora é obrigatória."],
    enum: { 
      values: ["Casa do código", "Alura"],
      message: "A editora {VALUE} não é um valor pérmitido." 
    }
  },
  preco: { type: Number },
  /*paginas: { 
    type: Number,
    min: [10, "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}."],
    max: [5000, "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}."]
  },*/
  /* O bloco de código abaixo faz a mesma coisa que o código comentado acima. a diferença é que abaixo
     a validação é feita na unha! De forma personalizada. Poderia ter sido usada para validar um campo
     de CPF ou de telefone, por exemplo.
  */ 
  paginas: { 
    type: Number,
    validate: {
      validator: (valor) => {
        return valor >= 10 && valor <= 5000;
      },
      message: "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}."
    }
  },
  autor: autorSchema
}, 
{ versionKey: false });

const livro = mongoose.model("livros", livroSchema);

export default livro;