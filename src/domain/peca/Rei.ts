import { Peca } from './Peca'
import { TipoPeca } from '../../definitions/TipoPeca'
import { Cor } from '../../definitions/Cor'
import { MovimentoVertical } from '../movimento/MovimentoVertical'
import { MovimentoHorizontal } from '../movimento/MovimentoHorizontal'
import { MovimentoDiagonal } from '../movimento/MovimentoDiagonal'

export class Rei extends Peca {
  constructor(cor: Cor) {
    const movimentos = [new MovimentoVertical(), new MovimentoHorizontal(), new MovimentoDiagonal()]
    super(TipoPeca.TORRE, cor, movimentos, true)
  }
}