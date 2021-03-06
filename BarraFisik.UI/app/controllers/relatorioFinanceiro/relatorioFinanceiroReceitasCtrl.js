﻿(function () {
    'use strict';

    app.controller('relatorioFinanceiroReceitasCtrl', relatorioFinanceiroReceitasCtrl);

    function relatorioFinanceiroReceitasCtrl($scope, ngTableParams, tipoPagamentoData, relatorioFinanceiroData, categoriaFinanceiraData, funcionariosData, $filter, subCategoriaData) {
        var vm = this;
        $scope.search = false;

        var filterDefault = {
            Situacao: "",
            CategoriaId: null,
            SubCategoriaId: null,
            EmissaoInicio: null,
            EmissaoFim: null,
            VencimentoInicio: null,
            VencimentoFim: null,
            PagamentoInicio: null,
            PagamentoFim: null
        }

        $scope.filter = angular.copy(filterDefault);

        getSubCategorias(null);
        getCategorias('Receitas');

        $scope.filterSubCategorias = function (categoriaId) {
            getSubCategorias(categoriaId);
        }

        $scope.filterCategorias = function (tipo) {
            getCategorias('Receitas');
        }

        funcionariosData.getAll().then(function (result) {
            vm.funcionarios = result.data;
        })

        tipoPagamentoData.getTipos().then(function (result) {
            vm.tipopagamento = result.data;
        })

        function getCategorias(tipo) {
            categoriaFinanceiraData.getCategoriaByTipo(tipo).then(function (categorias) {
                vm.categorias = categorias.data;
            });
        }

        function getSubCategorias(categoriaId) {            
            if (categoriaId != null || categoriaId != undefined) {
                subCategoriaData.getByCategoria(categoriaId).then(function (result) {
                    vm.subCategorias = result.data;
                })
            }
            if (categoriaId === null) {
                vm.subCategorias = null;
                $scope.filter.SubCategoriaId = null;
            }
        }

        vm.pesquisar = function (filter) {
            $scope.totalReceitas = 0;
            $scope.search = true;
            $scope.$emit('LOAD');
            relatorioFinanceiroData.getRelatorioReceitas(filter).then(function (result) {
                vm.relatorioFinanceiroReceitas = result.data.ListRelatorio;
                vm.total = result.data.TotalByTipoPagamento;

                angular.forEach(result.data.ListRelatorio, function (value, key) {
                    $scope.totalReceitas = $scope.totalReceitas + value.ValorTotal;
                });
                $scope.total = result.data.length;
            });
            $scope.$emit('UNLOAD');
        };

        //order data
        $scope.sortField = undefined;
        $scope.reverse = false;

        $scope.isSortUp = function (fieldName) {
            return $scope.sortField === fieldName && !$scope.reverse;
        };

        $scope.isSortDown = function (fieldName) {
            return $scope.sortField === fieldName && $scope.reverse;
        };

        
        $scope.sort = function (fieldName) {
            if ($scope.sortField === fieldName) {
                $scope.reverse = !$scope.reverse;
            } else {
                $scope.sortField = fieldName;
                $scope.reverse = false;
            };
        }

        vm.clear = function () {
            $scope.filter = angular.copy(filterDefault);
        };

    }
})();
