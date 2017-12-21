import * as angular from 'angular';
import router from '../router/router.module';
import {ErrorMsgComponentConfig} from './component/errormsg/errormsg';
import {configure} from './config';
import './core.module.less';
import {appRun} from './core.route';
import {Timepicker} from './directive/timepicker/timepicker';

let dynamicDependencies = function (): string[] {

    let dynDep: string [] = [];
    //hier kommen plugins die wir fuer dev disablen wollen
        return [];
};

const dependencies: string[] = [
    /* Angular modules */
    'ngAnimate',
    'ngSanitize',
    'ngMessages',
    'ngAria',
    'ngCookies',
    /* shared DVBern modules */
    router.name,
    /* 3rd-party modules */
    'ui.bootstrap',
    'smart-table',
    'ngMessages',
    'pascalprecht.translate',
    'angularMoment',
];

export const SeedWebCore: angular.IModule = angular
    .module('seedWeb.core', dependencies.concat(dynamicDependencies()))
    .run(appRun)
    .config(configure)

    .constant('MAX_LENGTH', 255)
    .constant('CONSTANTS', {
        name: 'SEED',
        REST_API: '/seed/api/v1/',
        MAX_LENGTH: 255,
        PATTERN_BETRAG: '([0-9]{0,12})',
        PATTERN_PERCENTAGE: '^[0-9][0-9]?$|^100$',
        PATTERN_PHONE: '(0|\\+41|0041)\\s?([\\d]{2})\\s?([\\d]{3})\\s?([\\d]{2})\\s?([\\d]{2})',
        PATTERN_MOBILE: '(0|\\+41|0041)\\s?(74|75|76|77|78|79)\\s?([\\d]{3})\\s?([\\d]{2})\\s?([\\d]{2})',
        PATTERN_EMAIL: '[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}'
    })
    .directive('timepicker', Timepicker.factory())
    .component('errormsg', new ErrorMsgComponentConfig());
