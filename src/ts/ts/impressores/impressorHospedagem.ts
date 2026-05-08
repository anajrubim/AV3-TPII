import Impressor from "../interfaces/impressor";
import Hospedagem from "../modelos/hospedagem";

export default class ImpressorHospedagem implements Impressor {
    private hospedagem: Hospedagem

    constructor(hospedagem: Hospedagem) {
        this.hospedagem = hospedagem
    }

    imprimir(): string {
        const dataEntrada = this.hospedagem.DataEntrada.toLocaleDateString('pt-BR')
        const dataSaida = this.hospedagem.DataSaida
            ? this.hospedagem.DataSaida.toLocaleDateString('pt-BR')
            : 'Em hospedagem'

        let descricao = `Hóspede: ${this.hospedagem.Cliente.Nome}\n`
            + `-- Nome social: ${this.hospedagem.Cliente.NomeSocial}\n`
            + `-- Acomodação: ${this.hospedagem.Acomodacao.NomeAcomadacao.toString()}\n`
            + `-- Data de entrada: ${dataEntrada}\n`
            + `-- Data de saída: ${dataSaida}\n`
            + `-- Status: ${this.hospedagem.Ativa ? 'Ativa' : 'Encerrada'}\n`
        return descricao
    }
}
