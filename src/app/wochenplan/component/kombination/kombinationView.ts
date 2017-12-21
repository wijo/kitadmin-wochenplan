///<reference path="../../../../../node_modules/@types/node/index.d.ts"/>
import {IComponentOptions} from 'angular';
import {getAllDayValues} from '../../../models/enums/TSDayOfWeek';
import TSKombination from '../../../models/TSKombination';
import TSModul from '../../../models/TSModul';
import {IModulStateParams} from '../../wochenplan.route';
import IFormController = angular.IFormController;
import IStateService = angular.ui.IStateService;

let template = require('./kombinationView.html');
let style = require('./kombinationView.less');

export class KombinationViewComponentConfig implements IComponentOptions {
    transclude: boolean = false;
    template: string = template;
    controller: any = KombinationViewController;
    controllerAs: string = 'vm';
}

export class KombinationViewController {

    form: IFormController;
    nextId = 1;
    selectedkombination: TSKombination;
    modulArray: Array<TSModul> = [];
    kombinationArray: Array<TSKombination> = [];
    dayOfWeek = getAllDayValues();
    daytoggled: boolean = false;
    modultoggled: boolean = false;
    showWochenplan: boolean = false;
    static $inject = ['$state', '$stateParams'];

    /* @ngInject */
    constructor(private $state: IStateService, private $stateParams: IModulStateParams) {
        //TODO insert normal data
        this.modulArray = $stateParams.modulArray;
        this.initSelectedKobination();

        //TODO remove dummy data
        // let modul1 = new TSModul(this.getUniqueId());
        // modul1.name = 'Morgen';
        // modul1.zeitVon = DateUtil.now().hour(6).minute(0).second(0);
        // modul1.zeitBis = DateUtil.now().hour(11).minute(0).second(0);
        // let modul2 = new TSModul(this.getUniqueId());
        // modul2.name = 'Mittag';
        // modul2.zeitVon = DateUtil.now().hour(11).minute(0).second(0);
        // modul2.zeitBis = DateUtil.now().hour(13).minute(0).second(0);
        // let modul3 = new TSModul(this.getUniqueId());
        // modul3.name = 'Nachmittag';
        // modul3.zeitVon = DateUtil.now().hour(13).minute(0).second(0);
        // modul3.zeitBis = DateUtil.now().hour(10).minute(0).second(0);
        // this.modulArray.push(modul1);
        // this.modulArray.push(modul2);
        // this.modulArray.push(modul3);
    }

    $onInit() {
        //TODO insert normal data
        this.initSelectedKobination();
        this.modulArray = this.$stateParams.modulArray;
    }

    initSelectedKobination(): void {
        this.selectedkombination = new TSKombination(this.getUniqueId());
        this.selectedkombination.wochentage = [];
        this.selectedkombination.module = [];
        this.modultoggled = false;
        this.daytoggled = false;
    }

    addSelectedKombinationToList(form: IFormController): void {
        this.modultoggled = true;
        this.daytoggled = true;
        if (form.$valid && this.selectedkombination.module.length > 0 && this.selectedkombination.wochentage.length > 0) {
            if (this.kombinationArray.indexOf(this.selectedkombination) === -1) {
                this.kombinationArray.push(this.selectedkombination);
            }
            this.initSelectedKobination();
            form.$setUntouched();
            form.$setPristine();
        }
    }

    setSelectedKombination(kombination: TSKombination): void {
        this.selectedkombination = kombination;
    }

    deleteKombination(index: number): void {
        this.kombinationArray.splice(index, 1);
        this.initSelectedKobination();
    }

    getUniqueId(): string {
        this.nextId = this.nextId + 1;
        return this.nextId.toString();
    }

    resetKombination(): void {
        this.selectedkombination.name = undefined;
        this.selectedkombination.prozent = undefined;
        this.selectedkombination.module = [];
        this.selectedkombination.wochentage = [];
        this.modultoggled = false;
        this.daytoggled = false;
    }

    isNameEmpty(): boolean {
        return this.selectedkombination.name === undefined || this.selectedkombination.name === '';
    }

    toggleSelection(element: any, array: any[]) {
        let idx = array.indexOf(element);
        if (idx > -1) {
            array.splice(idx, 1);
        } else {
            array.push(element);
        }
        if (element instanceof TSModul) {
            this.modultoggled = true;
        }
        if (this.dayOfWeek.indexOf(element) !== -1) {
            this.daytoggled = true;
        }
    }

    toggleShowWochenplan(): void {
        this.showWochenplan = !this.showWochenplan;
    }

    isOverlappingOrEmpty(): boolean {
        return this.selectedkombination.module.length === 0 && this.modultoggled;
        // TODO es sollte noch ueberprueft werden, ob sich die gewaehlten module ueberlappen
        // TODO allerdings sollte dies nicht blockierend sein
    }

    getOverlapping(): any {
        //TODO overlapping
        return {
            noselection: this.selectedkombination.module.length === 0 && this.modultoggled,
            overlapping: false
        };
    }

    goToModule(): void {
        let stateParams: IModulStateParams = new IModulStateParams();
        stateParams.modulArray = this.modulArray;
        this.$state.go('modul', stateParams);

    }
}
