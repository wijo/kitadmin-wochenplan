import moment = require('moment');

/**
 * Ein Modul hat eine von und eine bis Zeit und einen Namen. Sie definiert einen Zeitraum an dem eine spätere Belegung
 * (moeglicherweise aber nur in Kombination mit einem anderen Modul) stattfinden kann.
 * Ein Modul gehoert zu einer oder mehreren Kombination.
 *
 * @author Jasmin & Joy
 */
export default class TSModul {
    private _id: string;
    private _name: string;
    private _zeitVon: moment.Moment;
    private _zeitBis: moment.Moment;

    constructor(id?: string) {
        this._id = id;
    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get zeitVon(): moment.Moment {
        return this._zeitVon;
    }

    public set zeitVon(value: moment.Moment) {
        this._zeitVon = value;
    }

    public get zeitBis(): moment.Moment {
        return this._zeitBis;
    }

    public set zeitBis(value: moment.Moment) {
        this._zeitBis = value;
    }
}
