import {IComponentOptions} from 'angular';
import TSModul from '../../../models/TSModul';
import {IKombinationStateParams} from '../../wochenplan.route';
import IFormController = angular.IFormController;
import IStateService = angular.ui.IStateService;
import DateUtil from '../../../utils/DateUtil';

require('./modulView.less');

let template = require('./modulView.html');

/**
 * Modul View zum erstellen der Module
 *
 * @author Jasmin & Joy
 */
export class ModulViewComponentConfig implements IComponentOptions {
    transclude: boolean = false;
    template: string = template;
    controller: any = ModulViewController;
    controllerAs: string = 'vm';
}

export class ModulViewController {

    /**
     * View-Variabeln
     */
    form: IFormController;
    nextId = 1;
    selectedmodul: TSModul;
    modulArray: Array<TSModul> = [];
    alert: any;

    static $inject = ['$state', '$stateParams'];

    /**
     * Konstruktor
     */
    /* @ngInject */
    constructor(private $state: IStateService, private $stateParams: IKombinationStateParams) {
        this.modulArray = $stateParams.modulArray;
        this.initSelectedModulAndResetAlert();

        //TODO remove after Demo
        //Dummy Daten zum Testen und  evtl fuer die Demo
        let modul1 = new TSModul(this.getUniqueId());
        modul1.name = 'Morgen';
        modul1.zeitVon = DateUtil.now().hour(6).minute(0).second(0);
        modul1.zeitBis = DateUtil.now().hour(11).minute(0).second(0);
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

    /**
     * wird beim laden der View aufgerufen
     */
    $onInit() {
        this.initSelectedModulAndResetAlert();
        this.modulArray = this.$stateParams.modulArray;
    }

    /**
     * initialisiert das selektierte Modul und leert die (Error) Alerts
     */
    initSelectedModulAndResetAlert(): void {
        this.selectedmodul = new TSModul(this.getUniqueId());
        this.alert = {
            value: undefined,
            messagekey: ''
        };
    }

    /**
     * fuegt das selektierte Modul der Liste der Module hinzu.
     * wird aufgerufen, wenn man auf "Modul speichern" klickt
     * @param {IFormController} form
     */
    addSelectedModulToList(form: IFormController): void {
        if (form.$valid && !this.isBisVorVon()) {
            if (this.modulArray.indexOf(this.selectedmodul) === -1) {
                this.modulArray.push(this.selectedmodul);
            }
            this.initSelectedModulAndResetAlert();
            form.$setUntouched();
            form.$setPristine();
        }
    }

    /**
     * setzt das selektierte Modul.
     * Wird aufgerufen, wenn das Stift-Icon eines Moduls aus der Liste gedrueckt wird
     * @param {TSModul} modul
     */
    setSelectedModul(modul: TSModul): void {
        this.selectedmodul = modul;
    }

    /**
     * entfernt das Modul aus der Liste
     * Wird aufgerufen, wenn das Abfall-Icon eines Moduls aus der Liste gedrueckt wird
     * @param {number} index
     */
    deleteModul(index: number): void {
        this.modulArray.splice(index, 1);
        this.initSelectedModulAndResetAlert();
    }

    /**
     * gibt die naechste nummer von "nextId"
     * wird als ID genearator verwendet
     * @returns {string}
     */
    getUniqueId(): string {
        this.nextId = this.nextId + 1;
        return this.nextId.toString();
    }

    /**
     * setzt das Modul zurueck
     * (erstellt aber kein neues)
     */
    resetModul(): void {
        this.selectedmodul.name = undefined;
        this.selectedmodul.zeitVon = undefined;
        this.selectedmodul.zeitBis = undefined;
    }

    /**
     * ueberprueft ob der Name des selektierten Modul leer oder undefiniert ist
     * @returns {boolean} leerer oder undefinierter Name
     */
    isNameEmpty(): boolean {
        return this.selectedmodul.name === undefined || this.selectedmodul.name === '';
    }

    /**
     * gibt ein Objekt zurueck, dass den definierten Key einer Angular Message haelt.
     * Im definierten Key, ist ein boolean gespeichert
     * @returns {any} Angular Message Objekt
     */
    getBisVorVon(): any {
        return {
            bisVorVon: this.isBisVorVon()
        };
    }

    /**
     * ueberprueft, ob die Bis-Zeit vor der Von-Zeit ist
     * @returns {boolean} bis ist vor von
     */
    isBisVorVon(): boolean {
        if (!this.selectedmodul || !this.selectedmodul.zeitBis || !this.selectedmodul.zeitVon) {
            return false;
        }
        return this.selectedmodul.zeitVon.isAfter(this.selectedmodul.zeitBis);
    }

    /**
     * wenn die Modul-Liste nicht leer ist, wird auf die Kombinations-View navigiert.
     * anderenfalls wird ein Fehler angezeigt
     * Beim View-Wechsel wird als Paramter die Modulliste mitgegeben
     */
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
