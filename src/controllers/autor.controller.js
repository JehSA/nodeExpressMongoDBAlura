import { autor } from "../models/Autor.js";

class AutorController {

  static async listarAutores (req, res) {
    try {
      const listaAutores = await autor.find({});
      res.status(200).json(listaAutores);
    } catch (erro) {
      res.status(500).json({ mnessage: `${erro.message} - Erro interno no servidor.` });
    }
        
  }

  static async listarAutorPorId (req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);

      if(autorEncontrado !== null) {
        res.status(200).send(autorEncontrado);
      } else {
        res.status(404).json({ mnessage: "Id do autor não encontrado." });
      }
    } catch (erro) {
      next(erro);
    }        
  }

  static async cadastrarAutor (req, res, next) {
    try{
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: "Criado com sucesso!", livro: novoAutor });
    } catch (erro) {
      next(erro);
    } 
  }

  static async atualizarAutor (req, res, next) {
    try {
      const id = req.params.id;
      await autor.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Autor atualizado!" });
    } catch (erro) {
      next(erro);
    }        
  }

  static async excluirAutor (req, res, next) {
    try {
      const id = req.params.id;
      await autor.findByIdAndDelete(id);
      res.status(200).json({ message: "Autor excluído!" });
    } catch (erro) {
      next(erro);
    }        
  }

}

export default AutorController;