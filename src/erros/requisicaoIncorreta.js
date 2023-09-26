import ErroBase from "./erroBase.js";

class RequisicaoIncorreta extends ErroBase {
  constructor(mensagem = "Um ou mais dados fornecidos estão inorretos") {
    super(mensagem, 400);
  }
}

export default RequisicaoIncorreta;