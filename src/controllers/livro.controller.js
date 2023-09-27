//import { autorSchema } from "../models/Autor.js";
import { autor, livro } from "../models/index.js";

class LivroController {

  static async listarLivros (req, res, next) {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (erro) {
      next(erro);
    }            
  }

  static async listarLivroPorId (req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      res.status(200).json(livroEncontrado);
    } catch (erro) {
      next(erro);
    }        
  }

  static async cadastrarLivro (req, res, next) {
    const novoLivro = req.body;
    try{
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } };
      const livroCriado = await livro.create(livroCompleto);
      res.status(201).json({ message: "Criado com sucesso!", livro: livroCriado });
    } catch (erro) {
      next(erro);
    } 
  }

  static async atualizarLivro (req, res, next) {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Livro atualizado!" });
    } catch (erro) {
      next(erro);
    }        
  }

  static async excluirLivro (req, res, next) {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id);
      res.status(200).json({ message: "Livro excluído!" });
    } catch (erro) {
      next(erro);
    }        
  }

  static async listarLivrosPorFiltro (req, res, next) {
    const busca = await processaBusca(req.query);
    try {      
      if(busca !== null) {
        const livrosPorEditora = await livro
          .find(busca)
          .populate("autor");
        res.status(200).json(livrosPorEditora);
      } else {
        res.status(200).send([]);
      }      
    } catch (erro) {
      next(erro);
    }
  }
}

async function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;
  let busca = {};

  if(editora) busca.editora = { $regex: editora, $options: "i" }; 
  if(titulo) busca.titulo = { $regex: titulo, $options: "i" };

  /* O bloco de código abaixo define parametros de busca para quantidades
     minimas e maximas de páginas...z
  */
  if(minPaginas || maxPaginas) busca.paginas = {};
  // gte = Greater Than or Equal = Maior ou igual a..
  if(minPaginas) busca.paginas.$gte = minPaginas;
  // lte = Less Than or Equal = Menor ou igual a...
  if(maxPaginas) busca.paginas.$lte = maxPaginas;

  /*
    A busca por autor não funciona como esperado, talvez tenha a ver com o autorSchema
    da model Autor.js. Não sei como se faz os filtros por lá, depois tenho que pesquisar.
    Esse aspecto do projeto está um pouco diferente do apresentado no curso!!!!!!!
  */
  if(nomeAutor) {
    const autorN = await autor.findOne({ nome: nomeAutor });
    console.log(autorN, "Autor NNNNNNNNNNNNN");

    if(autorN !== null) {
      busca.autor = autorN._id;
      console.log(busca.autor, "!!!!!!!!!!!");
    } else {
      busca = null;
    }
  }

  return busca;
}

export default LivroController;