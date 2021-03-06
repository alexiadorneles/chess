"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DefinidorCores;
(function (DefinidorCores) {
    function definirCorDoItem(_a) {
        var linha = _a.linha, coluna = _a.coluna;
        var cor = linha % 2 === 0 ? "white" : "rosa";
        var pares = cor;
        var impares = cor == "rosa" ? "white" : "rosa";
        return coluna % 2 === 0 ? pares : impares;
    }
    DefinidorCores.definirCorDoItem = definirCorDoItem;
})(DefinidorCores = exports.DefinidorCores || (exports.DefinidorCores = {}));
