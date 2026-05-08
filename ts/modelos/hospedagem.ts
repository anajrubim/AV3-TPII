import Acomodacao from "./acomodacao";
import Cliente from "./cliente";

export default class Hospedagem {
    private cliente: Cliente
    private acomodacao: Acomodacao
    private dataEntrada: Date
    private dataSaida: Date | null

    constructor(cliente: Cliente, acomodacao: Acomodacao) {
        this.cliente = cliente
        this.acomodacao = acomodacao
        this.dataEntrada = new Date()
        this.dataSaida = null
    }

    public get Cliente() { return this.cliente }
    public get Acomodacao() { return this.acomodacao }
    public get DataEntrada() { return this.dataEntrada }
    public get DataSaida() { return this.dataSaida }
    public set DataSaida(data: Date | null) { this.dataSaida = data }

    public get Ativa(): boolean {
        return this.dataSaida === null
    }
}
