export default class TSKombination {
    private _id: string;
    private _name: string;
    private _prozent: number;
    private _wochentage: string[];
    private _module: string[];

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

    public get prozent(): number {
        return this._prozent;
    }

    public set prozent(value: number) {
        this._prozent = value;
    }

    public get wochentage(): string[] {
        return this._wochentage;
    }

    public set wochentage(value: string[]) {
        this._wochentage = value;
    }

    public get module(): string[] {
        return this._module;
    }

    public set module(value: string[]) {
        this._module = value;
    }
}
