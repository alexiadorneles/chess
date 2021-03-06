import _ from 'lodash'
import { OffsetMovimento, Posicao, TipoMovimento } from '../../definitions/Movimento'
import { Tabuleiro } from '../Tabuleiro'

export abstract class Movimento {
  constructor(private tipo: TipoMovimento) { }
  public abstract getOffsetMovimentos(): OffsetMovimento[]

  public getTipo(): TipoMovimento {
    return this.tipo
  }

  public simularMovimento(posicao: Posicao, tabuleiro: Tabuleiro): Posicao[] {
    const bindedGetter: () => Posicao[] = this.getPosicoesValidasPorOffset.bind(this, posicao, tabuleiro)
    const posicoes = this.getOffsetMovimentos().map(bindedGetter)
    return _.flatten(posicoes)
  }

  private getPosicoesValidasPorOffset(posicaoInicial: Posicao, tabuleiro: Tabuleiro, offset: OffsetMovimento): Posicao[] {
    let isPosicaoValida = true
    let posicao = { ...posicaoInicial }
    const posicoes = []
    while (isPosicaoValida) {
      posicao = this.criarNovaPosicaoBaseadaEmOffset(posicao, offset)
      isPosicaoValida = tabuleiro.isPosicaoValida(posicao)
      if (isPosicaoValida) {
        posicoes.push(posicao)
      } else if (tabuleiro.isBloqueadaPorOponente(posicao, posicaoInicial)) {
        posicoes.push(posicao)
      }
    }
    return posicoes
  }

  public criarNovaPosicaoBaseadaEmOffset(
    { linha, coluna }: Posicao,
    { modificadorColuna, modificadorLinha }: OffsetMovimento
  ): Posicao {
    return {
      linha: modificadorLinha.apply(linha),
      coluna: modificadorColuna.apply(coluna),
    }
  }
}
