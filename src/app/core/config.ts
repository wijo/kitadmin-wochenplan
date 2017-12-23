import 'angular';
import ITranslateProvider = angular.translate.ITranslateProvider;
import 'angular-hotkeys';

import IInjectorService = angular.auto.IInjectorService;
import IHttpProvider = angular.IHttpProvider;
import ILogProvider = angular.ILogProvider;
import ILocationProvider = angular.ILocationProvider;

configure.$inject = ['$translateProvider', '$injector', '$httpProvider',  '$logProvider', '$locationProvider'];
/* @ngInject */
export function configure($translateProvider: ITranslateProvider, $injector: IInjectorService, $httpProvider: IHttpProvider,
                            $logProvider: ILogProvider, $locationProvider: ILocationProvider) {
    //Translation Provider configuration
    let translProp = require('../../assets/translations/translations_de.json');

    // In case you have issues with double-escaped parameters, check out this issue: https://github.com/angular-translate/angular-translate/issues/1101
    $translateProvider.useSanitizeValueStrategy('escapeParameters');

    $translateProvider
        .translations('de', translProp)
        .fallbackLanguage('de')
        .preferredLanguage('de');

    $locationProvider.hashPrefix('');

}
