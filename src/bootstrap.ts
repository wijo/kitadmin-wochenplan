require ('./vendor.ts');   //alle bibliotheken anziehen
import './style/styles.css';
import './style/lesstest.less';
import './style/sasstest.scss';
import * as angular from 'angular';
import appModule from './app/app.module';

angular.element(document).ready(function () {
    angular.bootstrap(document, [appModule.name], {
        strictDi: true
    });
});
