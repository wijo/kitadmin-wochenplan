import * as angular from 'angular';
import './app.module.less';
import {SeedWebCore} from './core/core.module';
import {Wochenplan} from './wochenplan/wochenplan.module';


export default angular.module('seedWeb', [SeedWebCore.name, Wochenplan.name, 'ui.bootstrap']);
