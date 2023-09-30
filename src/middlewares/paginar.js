
import RequisicaoIncorreta from "../erros/requisicaoIncorreta.js";

async function paginar(req, res, next) {

  try {
    let { limite = 3, pagina = 1, ordenacao = "_id:-1" } = req.query;      
    let [campoOrdenacao, ordem] = ordenacao.split(":");

    const resultado = req.resultado;

    if(limite > 0 && pagina > 0) {        
      limite = parseInt(limite);
      pagina = parseInt(pagina);
      ordem = parseInt(ordem);
    }else {
      next(new RequisicaoIncorreta());
    }

    const resultadoPaginado = await resultado.find({})
    //.sort({ _id: -1 })
      .sort({ [campoOrdenacao]: ordem })
      .skip((pagina - 1) * limite)
      .limit(limite);
    res.status(200).json(resultadoPaginado);
  }catch (erro) {
    next(erro);   
  }
    
}

export default paginar;