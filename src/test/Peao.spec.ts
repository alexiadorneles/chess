import { expect } from 'chai'
import _ from 'lodash'
import 'mocha'
import sinon from 'sinon'
import { Cor } from '../main/definitions/Cor'
import { ItemTabuleiro } from '../main/domain/ItemTabuleiro'
import { Peao } from '../main/domain/peca/Peao'
import { Tabuleiro } from '../main/domain/Tabuleiro'

context('Peao', () => {
  describe('ao chamar adicionarAoItem', () => {
    it('deve atribuir propriedade item', () => {
      // arrange
      const peao = new Peao(Cor.BRANCAS)
      const item = new ItemTabuleiro({ linha: 0, coluna: 0 }, Cor.PRETAS)
      // act
      peao.adicionarAoItem(item)
      // assert
      expect(peao.getItemTabuleiro()).to.deep.equals(item)
    })
  })
  describe('ao chamar simularMovimento', () => {
    it('quando caminho livre deve retornar posição atual e uma para frente', () => {
      // arrange
      const tabuleiro = new Tabuleiro()
      const posicaoPeao = { linha: 1, coluna: 2 }
      sinon.replace(tabuleiro, 'getItem', (posicao) => {
        return _.isEqual(posicaoPeao, posicao) ? item : new ItemTabuleiro(posicao, Cor.CINZA)
      })
      const peao = new Peao(Cor.CINZA)
      const item = new ItemTabuleiro(posicaoPeao, Cor.PRETAS)
      item.atribuirPeca(peao)
      tabuleiro.adicionarItem(item)
      // act
      const esperado = [{ linha: 2, coluna: 2 }]
      const resultado = peao.simularMovimento()
      // assert
      expect(resultado).to.deep.equals(esperado)
    })
  })
})
