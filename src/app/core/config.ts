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

    //Dirty Check configuration (nur wenn plugin vorhanden)
    // if ($injector.has('unsavedWarningsConfigProvider')) {
    //     let unsavedWarningsConfigProvider: any = $injector.get('unsavedWarningsConfigProvider');
    //     unsavedWarningsConfigProvider.useTranslateService = true;
    //     unsavedWarningsConfigProvider.logEnabled = false;
    //     unsavedWarningsConfigProvider.navigateMessage = 'UNSAVED_WARNING';
    //     unsavedWarningsConfigProvider.reloadMessage = 'UNSAVED_WARNING_RELOAD';
    // }


    //Configuration of $http service
    // $httpProvider.interceptors.push('HttpErrorInterceptor');
    // $httpProvider.interceptors.push('HttpAuthInterceptor');
    // $httpProvider.interceptors.push('HttpResponseInterceptor');

    $locationProvider.hashPrefix('');


}
