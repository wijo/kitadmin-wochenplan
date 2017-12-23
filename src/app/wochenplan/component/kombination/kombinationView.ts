///<reference path='../../../../../node_modules/@types/node/index.d.ts'/>
import {IComponentOptions} from 'angular';
import {getAllDayValues} from '../../../models/enums/TSDayOfWeek';
import TSKombination from '../../../models/TSKombination';
import TSModul from '../../../models/TSModul';
import {IModulStateParams} from '../../wochenplan.route';
import IFormController = angular.IFormController;
import IStateService = angular.ui.IStateService;
import DateUtil from '../../../utils/DateUtil';

require('./kombinationView.less');

let template = require('./kombinationView.html');

/**
 * Kombination View zum Erstellen der Kombinationen
 *
 * @author Jasmin & Joy
 */
export class KombinationViewComponentConfig implements IComponentOptions {
    transclude: boolean = false;
    template: string = template;
    controller: any = KombinationViewController;
    controllerAs: string = 'vm';
}

export class KombinationViewController {

    /**
     * View-Variabeln
     */
    form: IFormController;
    nextId = 1;
    selectedkombination: TSKombination;
    modulArray: Array<TSModul> = [];
    kombinationArray: Array<TSKombination> = [];
    dayOfWeek = getAllDayValues();
    showWochenplan: boolean = false;

    //Die Toggle-Booleans werden gebraucht, damit die Fehlermeldungen bei den beiden
    //Checkbox-Listen nicht von Anfang an angezeigt werden
    modultoggled: boolean = false;
    daytoggled: boolean = false;

    static $inject = ['$state', '$stateParams'];

    /**
     * Konstruktor
     */
    /* @ngInject */
    constructor(private $state: IStateService, private $stateParams: IModulStateParams) {
        this.modulArray = $stateParams.modulArray;
        this.initSelectedKobination();

        //TODO remove dummy data after Demo
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
        //TODO insert normal data
        this.initSelectedKobination();
        this.modulArray = this.$stateParams.modulArray;
    }

    /**
     * initialisiert die selektierte Kombination und resettet die Toggle-Booleans
     */
    initSelectedKobination(): void {
        this.selectedkombination = new TSKombination(this.getUniqueId());
        this.selectedkombination.wochentage = [];
        this.selectedkombination.module = [];

        //Toggle-Booleans damit die Fehlermeldung verschwindet bzw.
        //nicht von Anfang an angezeigt wird
        this.modultoggled = false;
        this.daytoggled = false;
    }

    /**
     * fuegt die selektierte Kombination der Liste der Kombinationen hinzu.
     * wird aufgerufen, wenn man auf 'Kombination speichern' klickt
     * @param {IFormController} form
     */
    addSelectedKombinationToList(form: IFormController): void {
        //Toggle-Booleans: Meldungen muessen nun angezeigt werden, wenn die Listen leer sind
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

    /**
     * setzt die selektierte Kombination.
     * Wird aufgerufen, wenn das Stift-Icon neben einer Kombination aus
     * der Liste gedrueckt wird
     * @param {TSKombination} kombination
     */
    setSelectedKombination(kombination: TSKombination): void {
        this.selectedkombination = kombination;
    }

    /**
     * entfernt eine Kombination aus der Liste
     * Wird aufgerufen, wenn das Abfall-Icon neben einer Kombination aus
     * der Liste gedrueckt wird
     * @param {number} index
     */
    deleteKombination(index: number): void {
        this.kombinationArray.splice(index, 1);
        this.initSelectedKobination();
    }

    /**
     * geibt nextId + 1 zurueck. So werden immer unique IDs verwendet
     * @returns {string}
     */
    getUniqueId(): string {
        this.nextId = this.nextId + 1;
        return this.nextId.toString();
    }

    /**
     * setzt die Kombination und die Toggle-Booleans zurueck
     * (erstellt aber kein neues)
     */
    resetKombination(): void {
        this.selectedkombination.name = undefined;
        this.selectedkombination.prozent = undefined;
        this.selectedkombination.module = [];
        this.selectedkombination.wochentage = [];
        this.modultoggled = false;
        this.daytoggled = false;
    }

    /**
     * ueberprueft ob der Name der Kombination leer ist
     * @returns {boolean}
     */
    isNameEmpty(): boolean {
        return this.selectedkombination.name === undefined || this.selectedkombination.name === '';
    }

    /**
     * Je nach dem, ob eine Checkbox angewaehlt oder abgewaehlt wurde,
     * wird das dazugehoerige Elemen aus der Liste entfernt oder zur Liste hinzugefuegt.
     * Diese Funktion funktioniert fuer beide Checkbox-Listen (Wochentage und Module)
     * @param element
     * @param {any[]} array
     */
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

    /**
     * wechselt den 'show' boolean des Wochenplans
     * wird aufgerufen, wenn der 'Wochenplan anzeigen' oder Kombination anzeigen'-Button
     * geklickt wird
     */
    toggleShowWochenplan(): void {
        this.showWochenplan = !this.showWochenplan;
    }

    /**
     * Diese Methode ueberprueft, ob mindestens ein Modul ausgewaehlt wurde
     * @returns {boolean}
     */
    isOverlappingOrEmpty(): boolean {
        return this.selectedkombination.module.length === 0 && this.modultoggled;
        // TODO ueberlappung validieren
        // Wenn sich die Zeiten der Module ueberlappen, sollte eine Fehlermeldung
        // angezeigt werden, allerdings sollte das Speichern nicht verhindet werden
    }

    /**
     * gibt ein Objekt zurueck, dass die definierten Keys einer Angular Message haelt.
     * Im diesen Keys, sind booleans gespeichert
     * @returns {any}
     */
    getOverlapping(): any {
        //TODO overlapping
        return {
            noselection: this.selectedkombination.module.length === 0 && this.modultoggled,
            overlapping: false
        };
    }

    /**
     * View-Wechsel zu den Modulen
     * Als Parameter werden die Module mitgegeben
     */
    goToModule(): void {
        let stateParams: IModulStateParams = new IModulStateParams();
        stateParams.modulArray = this.modulArray;
        this.$state.go('modul', stateParams);

    }
}
