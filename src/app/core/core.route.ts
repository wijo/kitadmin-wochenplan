import {ILocationService, ILogService, IRootScopeService, ITimeoutService} from 'angular';
import {IState, IStateService} from 'angular-ui-router';
import {RouterHelper} from '../router/route-helper-provider';
import auto = angular.auto;
import IInjectorService = auto.IInjectorService;

appRun.$inject = ['angularMomentConfig', 'RouterHelper', '$injector', '$rootScope', '$timeout', '$state', '$location', '$window', '$log'];

/* @ngInject */
export function appRun(angularMomentConfig: any, routerHelper: RouterHelper,
                       $injector: IInjectorService, $rootScope: IRootScopeService, $timeout: ITimeoutService,
                       $state: IStateService, $location: ILocationService, $window: ng.IWindowService,
                       $log: ILogService) {

    // Fehler beim Navigieren ueber ui-route ins Log schreiben
    $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
        $log.error('Fehler beim Navigieren');
        $log.error('$stateChangeError --- event, toState, toParams, fromState, fromParams, error');
        $log.error(event, toState, toParams, fromState, fromParams, error);
    });

    routerHelper.configureStates(getStates(), '/modul');
    angularMomentConfig.format = 'DD.MM.YYYY';
    // dieser call macht mit tests probleme, daher wird er fuer test auskommentiert

}

function getStates(): IState[] {
    return [
        /* Add New States Above */
    ];
}
