import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import MenuTipoAcomodacao from "../menus/menuTipoAcomodacao";
import Acomodacao from "../modelos/acomodacao";
import Cliente from "../modelos/cliente";
import Hospedagem from "../modelos/hospedagem";

export default class CadastroHospedagem extends Processo {
    private clientes: Cliente[]
    private acomodacoes: Acomodacao[]
    private hospedagens: Hospedagem[]

    constructor() {
        super()
        this.menu = new MenuTipoAcomodacao()
        this.clientes = Armazem.InstanciaUnica.Clientes
        this.acomodacoes = Armazem.InstanciaUnica.Acomodacoes
        this.hospedagens = Armazem.InstanciaUnica.Hospedagens
    }

    processar(): void {
        console.clear()
        console.log('=== Cadastro de Hospedagem ===')

        if (this.clientes.length === 0) {
            console.log('Nenhum cliente cadastrado. Cadastre um cliente antes de registrar uma hospedagem.')
            return
        }
        console.log('Clientes disponíveis:')
        this.clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.Nome} (${cliente.NomeSocial})`)
        })

        const indiceCliente = this.entrada.receberNumero('Informe o número do cliente:') - 1

        if (indiceCliente < 0 || indiceCliente >= this.clientes.length) {
            console.log('Cliente inválido.')
            return
        }

        const clienteSelecionado = this.clientes[indiceCliente]

        const hospedagemAtiva = this.hospedagens.find(
            h => h.Cliente === clienteSelecionado && h.Ativa
        )
        if (hospedagemAtiva) {
            console.log(`O cliente ${clienteSelecionado.Nome} já possui uma hospedagem ativa na acomodação: ${hospedagemAtiva.Acomodacao.NomeAcomadacao}`)
            return
        }
        
        this.menu.mostrar()
        const opcaoAcomodacao = this.entrada.receberNumero('Informe o tipo de acomodação desejada:')

        const indiceAcomodacao = opcaoAcomodacao - 1

        if (indiceAcomodacao < 0 || indiceAcomodacao >= this.acomodacoes.length) {
            console.log('Acomodação inválida.')
            return
        }

        const acomodacaoSelecionada = this.acomodacoes[indiceAcomodacao]

        const novaHospedagem = new Hospedagem(clienteSelecionado, acomodacaoSelecionada)
        this.hospedagens.push(novaHospedagem)

        console.log(`\nHospedagem registrada com sucesso!`)
        console.log(`Hóspede: ${clienteSelecionado.Nome}`)
        console.log(`Acomodação: ${acomodacaoSelecionada.NomeAcomadacao}`)
    }
}
