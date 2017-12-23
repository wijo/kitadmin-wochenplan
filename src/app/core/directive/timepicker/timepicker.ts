import {IDirective, IDirectiveFactory} from 'angular';
import * as moment from 'moment';
import IAttributes = angular.IAttributes;
import INgModelController = angular.INgModelController;
import Moment = moment.Moment;

let template = require('./timepicker.html');

export class Timepicker implements IDirective {
    restrict = 'E';
    require: any = {ngModelCtrl: 'ngModel'};
    scope = {
        ngModel: '=',
        inputId: '@',
        ngRequired: '<',
        placeholder: '@',
        // ngDisabled: '<',
        // noFuture: '<?',
        blur: '&?',
        minDateTime: '<?', // Kann als String im Format allowedFormats oder als Moment angegeben werden
        maxDateTime: '<?'  // Kann als String im Format allowedFormats oder als Moment angegeben werden
    };
    controller = TimepickerController;
    controllerAs = 'vm';
    bindToController = true;
    template = template;

    /* constructor() { this.link = this.unboundLink.bind(this); }*/
    static factory(): IDirectiveFactory {
        const directive = () => new Timepicker();
        directive.$inject = [];
        return directive;
    }
}

export class TimepickerController {
    static $inject: string[] = ['$attrs'];
    dateTime: Date;
    ngModelCtrl: INgModelController;
    dateTimeRequired: boolean;
    ngRequired: boolean;
    placeholder: string;
    blur: () => void;
    minDateTime: any;
    maxDateTime: any;

    constructor(private $attrs: IAttributes) {
    }

    $onChanges(changes: any) {
        if (changes.ngRequired && !changes.ngRequired.isFirstChange()) {
            this.dateTimeRequired = changes.ngRequired.currentValue;
        }
    }

    //wird von angular aufgerufen
    $onInit() {

        if (!this.ngModelCtrl) {
            return;
        }
        // Wenn kein Minimumdatum gesetzt ist, verwenden wir 01.01.1900 als Minimum
        if (this.minDateTime === undefined) {
            this.minDateTime = moment('1900-01-01 00:00', 'YYYY-MM-DD', true);
        }

        let noFuture = 'noFuture' in this.$attrs;
        if (this.placeholder === undefined) {
            this.placeholder = 'hh:mm';
        } else if (this.placeholder === '') {
            this.placeholder = undefined;
        }

        if (this.ngRequired) {
            this.dateTimeRequired = this.ngRequired;
        }

        this.ngModelCtrl.$render = () => {
            this.dateTime = this.ngModelCtrl.$viewValue;
        };
        this.ngModelCtrl.$formatters.unshift(TimepickerController.momentToString);
        this.ngModelCtrl.$parsers.push(TimepickerController.stringToMoment);

        this.ngModelCtrl.$validators['moment'] = (modelValue: any, viewValue: any) => {
            // if not required and view value empty, it's ok...
            if (!this.dateTimeRequired && !viewValue) {
                return true;
            }
            return this.getInputAsMoment(modelValue, viewValue).isValid();
        };
        // Validator fuer Minimal-Datum
        this.ngModelCtrl.$validators['minDateTime'] = (modelValue: any, viewValue: any) => {
            let result: boolean = true;
            if (this.minDateTime && viewValue) {
                let minDateTimeAsMoment: Moment = moment(this.minDateTime, 'HH:mm', true);
                if (minDateTimeAsMoment.isValid()) {
                    let inputAsMoment: Moment = this.getInputAsMoment(modelValue, viewValue);
                    if (inputAsMoment && inputAsMoment.isBefore(minDateTimeAsMoment)) {
                        result = false;
                    }
                }
            }
            return result;
        };
        // Validator fuer Maximal-Datum
        this.ngModelCtrl.$validators['maxDateTime'] = (modelValue: any, viewValue: any) => {
            let result: boolean = true;
            if (this.maxDateTime && viewValue) {
                let maxDateTimeAsMoment: Moment = moment(this.maxDateTime, 'HH:mm', true);
                if (maxDateTimeAsMoment.isValid()) {
                    let inputAsMoment: Moment = this.getInputAsMoment(modelValue, viewValue);
                    if (inputAsMoment && inputAsMoment.isAfter(maxDateTimeAsMoment)) {
                        result = false;
                    }
                }
            }
            return result;
        };
    }

    private getInputAsMoment(modelValue: any, viewValue: any): Moment {
        let value = modelValue || TimepickerController.stringToMoment(viewValue);
        return moment(value, 'HH:mm', true);
    }

    onBlur() {
        if (this.blur) { // userdefined onBlur event
            this.blur();
        }
        this.ngModelCtrl.$setTouched();
    }

    updateTimeModelValue() {
        this.ngModelCtrl.$setViewValue(this.dateTime);
    }

    private static momentToString(mom: Moment): string {
        if (mom && mom.isValid()) {
            return mom.format('HH:mm');
        }
        return '';
    }

    private static stringToMoment(dateTime: string): any {
        if (moment(dateTime, 'HH:mm', true).isValid()) {
            return moment(dateTime, 'HH:mm', true);
        }
        return null;
    }
}
