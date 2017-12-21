import {IComponentOptions} from 'angular';
import TSModul from '../../../models/TSModul';
import {IKombinationStateParams} from '../../wochenplan.route';
import IFormController = angular.IFormController;
import IStateService = angular.ui.IStateService;

require('./modulView.less');

let template = require('./modulView.html');

export class ModulViewComponentConfig implements IComponentOptions {
    transclude: boolean = false;
    template: string = template;
    controller: any = ModulViewController;
    controllerAs: string = 'vm';
}

export class ModulViewController {

    form: IFormController;
    nextId = 1;
    selectedmodul: TSModul;
    modulArray: Array<TSModul> = [];
    alert: any;
    static $inject = ['$state', '$stateParams'];

    /* @ngInject */
    constructor(private $state: IStateService, private $stateParams: IKombinationStateParams) {
        //TODO insert normal data
        this.modulArray = $stateParams.modulArray;
        this.initSelectedModulAndResetAlert();

        //TODO dummyData entfernen
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
        this.initSelectedModulAndResetAlert();
        this.modulArray = this.$stateParams.modulArray;
    }

    initSelectedModulAndResetAlert(): void {
        this.selectedmodul = new TSModul(this.getUniqueId());
        this.alert = {
            value: undefined,
            messagekey: ''
        };
    }

    addSelectedModulToList(form: IFormController): void {
        if (form.$valid) {
            if (this.modulArray.indexOf(this.selectedmodul) === -1) {
                this.modulArray.push(this.selectedmodul);
            }
            this.initSelectedModulAndResetAlert();
            form.$setUntouched();
            form.$setPristine();
        }
    }

    setSelectedModul(modul: TSModul): void {
        this.selectedmodul = modul;
    }

    deleteModul(index: number): void {
        this.modulArray.splice(index, 1);
        this.initSelectedModulAndResetAlert();
    }

    getUniqueId(): string {
        this.nextId = this.nextId + 1;
        return this.nextId.toString();
    }

    resetModul(): void {
        this.selectedmodul.name = undefined;
        this.selectedmodul.zeitVon = undefined;
        this.selectedmodul.zeitBis = undefined;
    }

    isNameEmpty(): boolean {
        return this.selectedmodul.name === undefined || this.selectedmodul.name === '';
    }

    getBisVorVon(): any {
        return {
            bisVorVon: this.isBisVorVon()
        };
    }

    isBisVorVon(): boolean {
        if (!this.selectedmodul || !this.selectedmodul.zeitBis || !this.selectedmodul.zeitVon) {
            return false;
        }
        return this.selectedmodul.zeitVon.isAfter(this.selectedmodul.zeitBis);
    }

    goToKombination(): void {
        if (this.modulArray.length > 0) {
            let stateParams: IKombinationStateParams = new IKombinationStateParams();
            stateParams.modulArray = this.modulArray;
            this.$state.go('kombination', stateParams);
        } else {
            this.alert.value = true;
            this.alert.messagekey = 'ERROR_MODULMAP_EMPTY';
        }
    }

}
