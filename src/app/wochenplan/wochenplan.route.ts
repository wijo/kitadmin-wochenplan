import {IState, IStateParamsService} from 'angular-ui-router';
import {RouterHelper} from '../router/route-helper-provider';
import TSModul from '../models/TSModul';

wochenplanRun.$inject = ['RouterHelper'];

/* @ngInject */
export function wochenplanRun(routerHelper: RouterHelper) {
    routerHelper.configureStates(getStates());
}

//array mit allen States
function getStates(): IState[] {
    return [new ModulState(), new KombinationState()];
}

//State fuer die Moudl-View
export class ModulState implements IState {
    name = 'modul';
    url = '/modul';
    template = '<modul-view flex="auto" class="overflow-scroll"></modul-view>';
    params = {modulArray: Array<TSModul>()};
}

//State fuer die Kombination-View
export class KombinationState implements IState {
    name = 'kombination';
    url = '/kombination';
    template = '<kombination-view flex="auto" class="overflow-scroll"></kombination-view>';
    params = {modulArray: Array<TSModul>()};
}

//State Parameter fuer die Kombination-View
export class IKombinationStateParams implements IStateParamsService {
    modulArray: Array<TSModul>;
}

export class IModulStateParams implements IStateParamsService {
    modulArray: Array<TSModul>;
}
