import {IComponentOptions} from 'angular';
require('./errormsg.less');
let template = require('./errormsg.html');

export class ErrorMsgComponentConfig implements IComponentOptions {
    transclude = false;
    bindings: any = {
        errorObject: '<for',
        inputid: '@inputId'
    };
    template = template;
    controller = ErrorMsg;
    controllerAs = 'vm';
}

export class ErrorMsg {
}
