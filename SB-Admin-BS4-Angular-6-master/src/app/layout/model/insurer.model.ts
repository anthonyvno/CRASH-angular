export class Insurer {
    private _id: number;
    private _country: string;
    private _name: string;

    constructor(id: number, country: string, name: string) {
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

    public get name(): string {
        return this._name;
    }

    public set id(value: number) {
        this._id = value;
    }

    public set country(value: string) {
        this._country = value;
    }

    public set name(value: string) {
        this._name = value;
    }

    static fromJson(json: any): Insurer {
        if (json != null) {
            const ins = new Insurer(json.id, json.country, json.name);
            return ins;
        } else {
            return null;
        }
    }
}
