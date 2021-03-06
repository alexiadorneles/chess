"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Peca_1 = require("./Peca");
var MovimentoVertical_1 = require("../movimento/MovimentoVertical");
var MovimentoHorizontal_1 = require("../movimento/MovimentoHorizontal");
var MovimentoDiagonal_1 = require("../movimento/MovimentoDiagonal");
var TipoPeca_1 = require("../../definitions/TipoPeca");
var Rei = (function (_super) {
    __extends(Rei, _super);
    function Rei(cor) {
        var _this = this;
        var movimentos = [new MovimentoVertical_1.MovimentoVertical(), new MovimentoHorizontal_1.MovimentoHorizontal(), new MovimentoDiagonal_1.MovimentoDiagonal()];
        _this = _super.call(this, TipoPeca_1.TipoPeca.REI, cor, movimentos, true) || this;
        return _this;
    }
    Rei.prototype.simularMovimento = function (tabuleiro) {
        var _this = this;
        var posicaoPeca = this.itemTabuleiro.getPosicao();
        return this.movimentos
            .map(function (movimento) { return movimento.simularMovimento(posicaoPeca, _this); })
            .reduce(function (aggregation, movimento) { return aggregation.concat(movimento); }, []);
    };
    return Rei;
}(Peca_1.Peca));
exports.Rei = Rei;
