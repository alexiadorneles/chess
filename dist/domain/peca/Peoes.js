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
var TipoPeca_1 = require("../../definitions/TipoPeca");
var MovimentoVertical_1 = require("../movimento/MovimentoVertical");
var Peao = (function (_super) {
    __extends(Peao, _super);
    function Peao(cor) {
        var _this = this;
        var movimentos = [new MovimentoVertical_1.MovimentoVertical()];
        _this = _super.call(this, TipoPeca_1.TipoPeca.PEAO, cor, movimentos, false) || this;
        return _this;
    }
    return Peao;
}(Peca_1.Peca));
exports.Peao = Peao;
