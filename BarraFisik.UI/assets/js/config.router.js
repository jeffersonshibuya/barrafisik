'use strict';

/**
 * Config for the router
 */
app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'JS_REQUIRES',
function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, jsRequires) {

    app.controller = $controllerProvider.register;
    app.directive = $compileProvider.directive;
    app.filter = $filterProvider.register;
    app.factory = $provide.factory;
    app.service = $provide.service;
    app.constant = $provide.constant;
    app.value = $provide.value;

    // LAZY MODULES

    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: jsRequires.modules
    });

    // APPLICATION ROUTES
    // -----------------------------------
    // For any unmatched url, redirect to /app/dashboard
    $urlRouterProvider.otherwise("/app/dashboard");
    //
    // Set up the states
    $stateProvider.state('app', {
        url: "/app",
        templateUrl: "assets/views/app.html",
        resolve: loadSequence('modernizr', 'moment', 'angularMoment', 'uiSwitch', 'perfect-scrollbar-plugin', 'toaster', 'ngAside', 'vAccordion', 'sweet-alert', 'chartjs', 'tc.chartjs', 'oitozero.ngSweetAlert', 'chatCtrl'),
        abstract: true
    }).state('app.dashboard', {
        url: "/dashboard",
        templateUrl: "assets/views/dashboard.html",
        resolve: loadSequence('jquery-sparkline', 'dashboardCtrl'),
        title: 'Dashboard',
        ncyBreadcrumb: {
            label: 'Dashboard'
        }
    })

    .state('app.clientes', {
        url: '/clientes',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'Clientes',
        ncyBreadcrumb: {
            label: 'Clientes'
        }
    }).state('app.clientes.listar', {
        url: '/listar',
        templateUrl: "app/views/cliente/clientes.html",
        title: 'Lista de Clientes',
        icon: 'ti-layout-media-left-alt',
        resolve: loadSequence('clienteCtrl', 'ngTable', 'clienteData'),
        controller: "clienteCtrl as vm",
        ncyBreadcrumb: {
            label: 'Listar'
        }
    }).state('app.clientes.cadastrar', {
        url: '/cadastrar',
        templateUrl: "app/views/cliente/create.html",
        title: 'Cadastrar Clientes',
        icon: 'ti-layout-media-left-alt',
        resolve: loadSequence('clienteCreateCtrl', 'clienteData', 'ui.mask'),
        controller: "clienteCreateCtrl as vm",
        ncyBreadcrumb: {
            label: 'Cadastrar'
        }
    })

    //    .state('app.clientes', {
    //    url: "/clientes",
    //    templateUrl: "app/views/cliente/clientes.html",
    //    resolve: loadSequence('clienteCtrl', 'ngTable', 'clienteData'),
    //    title: 'Clientes',
    //    controller: "clienteCtrl as vm",
    //    ncyBreadcrumb: {
    //        label: 'Clientes / Listar'
    //    }
    //}).state('app.clientes.create', {
    //    url: "/create",
    //    templateUrl: "app/views/cliente/create.html",
    //    resolve: loadSequence('clienteCreateCtrl', 'clienteData'),
    //    title: 'Clientes',
    //    controller: "clienteCreateCtrl as vm",
    //    ncyBreadcrumb: {
    //        label: 'Cadastrar '
    //    }
    //})
    //    .state('app.ui', {
    //        url: '/ui',
    //        template: '<div ui-view class="fade-in-up"></div>',
    //        title: 'UI Elements',
    //        ncyBreadcrumb: {
    //            label: 'UI Elements'
    //        }
    //    }).state('app.ui.elements', {
    //        url: '/elements',
    //        templateUrl: "app/views/cliente/create.html",
    //        title: 'Elements',
    //        icon: 'ti-layout-media-left-alt',
    //        ncyBreadcrumb: {
    //            label: 'Elements'
    //        }
    //    })


     

    // Generates a resolve object previously configured in constant.JS_REQUIRES (config.constant.js)
    function loadSequence() {
        var _args = arguments;
        return {
            deps: ['$ocLazyLoad', '$q',
			function ($ocLL, $q) {
			    var promise = $q.when(1);
			    for (var i = 0, len = _args.length; i < len; i++) {
			        promise = promiseThen(_args[i]);
			    }
			    return promise;

			    function promiseThen(_arg) {
			        if (typeof _arg == 'function')
			            return promise.then(_arg);
			        else
			            return promise.then(function () {
			                var nowLoad = requiredData(_arg);
			                if (!nowLoad)
			                    return $.error('Route resolve: Bad resource name [' + _arg + ']');
			                return $ocLL.load(nowLoad);
			            });
			    }

			    function requiredData(name) {
			        if (jsRequires.modules)
			            for (var m in jsRequires.modules)
			                if (jsRequires.modules[m].name && jsRequires.modules[m].name === name)
			                    return jsRequires.modules[m];
			        return jsRequires.scripts && jsRequires.scripts[name];
			    }
			}]
        };
    }
}]);