petcareApp
    .directive('head', ['$rootScope','$compile',
    function($rootScope, $compile){
        return {
            restrict: 'E',
            link: function(scope, elem){
                var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" />';
                elem.append($compile(html)(scope));
                scope.routeStyles = {};
                // e, toState, toParams, fromState, fromParams
                // console.log('owdpw');
                $rootScope.$on('$stateChangeStart', function (e, next, params1, current, params2) {
                    console.log( current);
                    console.log( e);
                    console.log(next);
                    console.log('current.state: ' + next.css);
                    // console.log('current.state.css: ' + current.$$state.css );

                    // brishenje momentalni css-ovi
                    if(current && current.url && current.css){
                        if(!angular.isArray(current.css)){
                            current.css = [current.css];
                        }
                        angular.forEach(current.css, function(sheet){
                            delete scope.routeStyles[sheet]; 
                        });
                    }

                    // dodavanje na potrebni css-ovi
                    if(next && next.url && next.css){
                        if(!angular.isArray(next.css)){
                            next.css = [next.css]; // naparvi array so eden chlen
                        }
                        angular.forEach(next.css, function(sheet){
                            scope.routeStyles[sheet] = sheet;
                        });
                    }
                });
            }
        };
    }
]);