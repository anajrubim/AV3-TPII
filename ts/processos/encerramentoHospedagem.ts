import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Hospedagem from "../modelos/hospedagem";

export default class EncerramentoHospedagem extends Processo {
    private hospedagens: Hospedagem[]

    constructor() {
        super()
        this.hospedagens = Armazem.InstanciaUnica.Hospedagens
    }

    processar(): void {
        console.clear()
        console.log('=== Encerramento de Hospedagem ===')

        const hospedagensAtivas = this.hospedagens.filter(h => h.Ativa)

        if (hospedagensAtivas.length === 0) {
            console.log('Não há hospedagens ativas no momento.')
            return
        }

        console.log('Hospedagens ativas:')
        hospedagensAtivas.forEach((hospedagem, index) => {
            console.log(`${index + 1} - ${hospedagem.Cliente.Nome} | Acomodação: ${hospedagem.Acomodacao.NomeAcomadacao}`)
        })

        const indice = this.entrada.receberNumero('Informe o número da hospedagem a encerrar:') - 1

        if (indice < 0 || indice >= hospedagensAtivas.length) {
            console.log('Opção inválida.')
            return
        }

        hospedagensAtivas[indice].DataSaida = new Date()
        console.log(`\nHospedagem encerrada com sucesso!`)
        console.log(`Hóspede: ${hospedagensAtivas[indice].Cliente.Nome}`)
        console.log(`Data de saída: ${hospedagensAtivas[indice].DataSaida!.toLocaleDateString('pt-BR')}`)
    }
}
