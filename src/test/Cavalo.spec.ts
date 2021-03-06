import chai from 'chai'
import 'mocha'
import sinon from 'sinon'
import { Cor } from '../main/definitions/Cor'
import { ItemTabuleiro } from '../main/domain/ItemTabuleiro'
import { Cavalo } from '../main/domain/peca/Cavalo'
import { Peao } from '../main/domain/peca/Peao'
import { Rainha } from '../main/domain/peca/Rainha'
import { Tabuleiro } from '../main/domain/Tabuleiro'
import deepEqualInAnyOrder = require('deep-equal-in-any-order')
import _ from 'lodash'

chai.use(deepEqualInAnyOrder)
const expect = chai.expect

context('Cavalo', () => {
  describe('ao chamar adicionarAoItem', () => {
    it('deve atribuir propriedade item', () => {
      // arrange
      const cavalo = new Cavalo(Cor.BRANCAS)
      const item = new ItemTabuleiro({ linha: 0, coluna: 0 }, Cor.PRETAS)
      // act
      cavalo.adicionarAoItem(item)
      // assert
      expect(cavalo.getItemTabuleiro()).to.deep.equals(item)
    })
  })
  describe('ao chamar simularMovimento', () => {
    it('quando posição atual e tabuleiro limpo deve retornar três opções ', () => {
      // arrange
      const tabuleiro = new Tabuleiro()
      sinon.replace(tabuleiro, 'getItem', (posicao) => new ItemTabuleiro(posicao, Cor.BRANCAS))
      const cavalo = new Cavalo(Cor.BRANCAS)
      const item = new ItemTabuleiro({ linha: 0, coluna: 1 }, Cor.PRETAS)
      item.atribuirPeca(cavalo)
      tabuleiro.adicionarItem(item)
      // act
      const esperado = [
        { linha: 1, coluna: 3 },
        { linha: 2, coluna: 2 },
        { linha: 2, coluna: 0 }
      ]
      const resultado = cavalo.simularMovimento()
      // assert
      expect(resultado).to.deep.equalInAnyOrder(esperado)
    })
    it('quando caminho livre deve retornar todos possíveis', () => {
      // arrange
      const tabuleiro = new Tabuleiro()
      sinon.replace(tabuleiro, 'getItem', (posicao) => new ItemTabuleiro(posicao, Cor.BRANCAS))
      const cavalo = new Cavalo(Cor.BRANCAS)
      const item = new ItemTabuleiro({ linha: 2, coluna: 2 }, Cor.PRETAS)
      item.atribuirPeca(cavalo)
      tabuleiro.adicionarItem(item)
      // act
      const esperado = [
        { linha: 0, coluna: 1 },
        { linha: 0, coluna: 3 },
        { linha: 1, coluna: 0 },
        { linha: 1, coluna: 4 },
        { linha: 3, coluna: 0 },
        { linha: 3, coluna: 4 },
        { linha: 4, coluna: 1 },
        { linha: 4, coluna: 3 },
      ]
      const resultado = cavalo.simularMovimento()
      // assert
      expect(resultado).to.deep.equalInAnyOrder(esperado)
    })
    it('quando peças no caminho retorna apenas posições válidas', () => {
      // arrange
      const cavalo = new Cavalo(Cor.BRANCAS)
      const itemCavalo = new ItemTabuleiro({ linha: 2, coluna: 2 }, Cor.PRETAS)
      itemCavalo.atribuirPeca(cavalo)

      const rainha = new Rainha(Cor.BRANCAS)
      const itemRainha = new ItemTabuleiro({ linha: 0, coluna: 3 }, Cor.PRETAS)
      itemRainha.atribuirPeca(rainha)

      const peao = new Peao(Cor.BRANCAS)
      const itemPeao = new ItemTabuleiro({ linha: 1, coluna: 0 }, Cor.PRETAS)
      itemPeao.atribuirPeca(peao)

      const peao2 = new Peao(Cor.BRANCAS)
      const itemPeao2 = new ItemTabuleiro({ linha: 1, coluna: 4 }, Cor.PRETAS)
      itemPeao2.atribuirPeca(peao2)

      sinon.replace(Tabuleiro.prototype, 'getItem', (posicao) => {
        const itens = [itemCavalo, itemRainha, itemPeao, itemPeao2]
        const item = itens.find(item => _.isEqual(item.getPosicao(), posicao))
        return item || new ItemTabuleiro(posicao, Cor.BRANCAS)
      })
      const tabuleiro = new Tabuleiro()

      tabuleiro.adicionarItem(itemCavalo)
      tabuleiro.adicionarItem(itemPeao)
      tabuleiro.adicionarItem(itemPeao2)
      tabuleiro.adicionarItem(itemRainha)

      // act
      const esperado = [
        { linha: 0, coluna: 1 },
        { linha: 3, coluna: 0 },
        { linha: 3, coluna: 4 },
        { linha: 4, coluna: 1 },
        { linha: 4, coluna: 3 },
      ]
      const resultado = cavalo.simularMovimento()
      // assert
      expect(resultado).to.deep.equalInAnyOrder(esperado)
    })
  })
})
