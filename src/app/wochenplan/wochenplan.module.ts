import * as angular from 'angular';
import {SeedWebCore} from '../core/core.module';
import {KombinationViewComponentConfig} from './component/kombination/kombinationView';
import {ModulViewComponentConfig} from './component/modul/modulView';
import {wochenplanRun} from './wochenplan.route';

export const Wochenplan = angular.module('seedWeb.wochenplan', [SeedWebCore.name, 'smart-table', 'ui.bootstrap'])
    .component('modulView', new ModulViewComponentConfig())
    .component('kombinationView', new KombinationViewComponentConfig())
    .run(wochenplanRun);

export default Wochenplan;
