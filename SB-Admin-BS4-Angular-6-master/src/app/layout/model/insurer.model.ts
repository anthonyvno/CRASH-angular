export class Insurer {
    private _id: number;
    private _country: string;
    private _name: Date;

    constructor(id: number, country: string, name: Date) {
        this._id = id;
        this._country = country;
        this._name = name;
    }

    public get id(): number {
        return this._id;
    }

    public get country(): string {
        return this._country;
    }

    public get name(): Date {
        return this._name;
    }

    public set id(value: number) {
        this._id = value;
    }

    public set country(value: string) {
        this._country = value;
    }

    public set name(value: Date) {
        this._name = value;
    }
}
