import { Cor } from '../definitions/Cor'
import { MapPosicaoPecasBrancas, MapPosicaoPecasPretas } from '../definitions/PosicoesIniciais'
import { TipoPeca } from '../definitions/TipoPeca'
import { DefinidorCores } from './DefinidorCores'
import { ItemTabuleiro } from './ItemTabuleiro'
import { Bispo } from './peca/Bispo'
import { Cavalo } from './peca/Cavalo'
import { Peao } from './peca/Peao'
import { Peca } from './peca/Peca'
import { Rainha } from './peca/Rainha'
import { Rei } from './peca/Rei'
import { Torre } from './peca/Torre'

const InstanciadorTipoMap: Map<TipoPeca, new (corPeca: Cor) => Peca> = new Map([
  [TipoPeca.PEAO, Peao],
  [TipoPeca.CAVALO, Cavalo],
  [TipoPeca.BISPO, Bispo],
  [TipoPeca.RAINHA, Rainha],
  [TipoPeca.REI, Rei],
  [TipoPeca.TORRE, Torre],
])

export namespace InstanciadorPecas {
  export function instanciar(tipo: TipoPeca, corPeca: Cor): ItemTabuleiro[] {
    const map = corPeca === Cor.BRANCAS ? MapPosicaoPecasBrancas : MapPosicaoPecasPretas
    return map.get(tipo).map(posicao => {
      const clazz = InstanciadorTipoMap.get(tipo)
      const item = new ItemTabuleiro(posicao, DefinidorCores.definir(posicao))
      const peca = new clazz(corPeca)
      item.atribuirPeca(peca)
      return item
    })
  }
}