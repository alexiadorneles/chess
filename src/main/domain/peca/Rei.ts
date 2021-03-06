import _ from 'lodash'
import { Cor } from '../../definitions/Cor'
import { Posicao } from '../../definitions/Movimento'
import { TipoPeca } from '../../definitions/TipoPeca'
import { MovimentoDiagonal } from '../movimento/MovimentoDiagonal'
import { MovimentoHorizontal } from '../movimento/MovimentoHorizontal'
import { MovimentoVertical } from '../movimento/MovimentoVertical'
import { Peca } from './Peca'

export class Rei extends Peca {
  constructor(cor: Cor) {
    const movimentos = [new MovimentoVertical(), new MovimentoHorizontal(), new MovimentoDiagonal()]
    super(TipoPeca.REI, cor, movimentos, true)
  }

  public simularMovimento(): Posicao[] {
    const posicaoInicial = this.getItemTabuleiro().getPosicao()
    const tabuleiro = this.getTabuleiro()
    const posicoes = this.movimentos.map(movimento =>
      movimento.getOffsetMovimentos()
        .map(offset => movimento.criarNovaPosicaoBaseadaEmOffset(posicaoInicial, offset))
        .filter(posicao => tabuleiro.isPosicaoExistente(posicao))
        .filter(posicao =>
          !tabuleiro.isPosicaoOcupada(posicao) ||
          tabuleiro.isBloqueadaPorOponente(posicao, posicaoInicial))
    )

    return _.flatten(posicoes)
  }

}
