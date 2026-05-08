import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressorHospedagem from "../impressores/impressorHospedagem";
import Impressor from "../interfaces/impressor";
import Hospedagem from "../modelos/hospedagem";

export default class ListagemHospedagens extends Processo {
    private hospedagens: Hospedagem[]
    private impressor!: Impressor

    constructor() {
        super()
        this.hospedagens = Armazem.InstanciaUnica.Hospedagens
    }

    processar(): void {
        console.clear()
        console.log('=== Listagem de Hospedagens Ativas ===')
        console.log(`-------------------------------------------------`)

        const hospedagensAtivas = this.hospedagens.filter(h => h.Ativa)

        if (hospedagensAtivas.length === 0) {
            console.log('Não há hospedagens ativas no momento.')
            return
        }

        hospedagensAtivas.forEach(hospedagem => {
            this.impressor = new ImpressorHospedagem(hospedagem)
            console.log(this.impressor.imprimir())
            console.log(`-------------------------------------------------`)
        })
    }
}
