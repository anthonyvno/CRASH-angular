import { Insurance } from './insurance.model';

export class Vehicle {
    private _id: number;
    private _insurance: Insurance;
    private _country: string;
    private _licensePlate: string;
    private _brand: string;
    private _model: string;
    private _type: string;

    constructor(id: number, insurance: Insurance, country: string, licensePlate: string, brand: string, model: string, type: string) {
        this._id = id;
        this._insurance = insurance;
        this._country = country;
        this._licensePlate = licensePlate;
        this._brand = brand;
        this._model = model;
        this._type = type;
    }

    public get id(): number {
        return this._id;
    }


    public get insurance(): Insurance {
        return this._insurance;
    }

    public get country(): string {
        return this._country;
    }

    public get licensePlate(): string {
        return this._licensePlate;
    }

    public get brand(): string {
        return this._brand;
    }

    public get model(): string {
        return this._model;
    }

    public get type(): string {
        return this._type;
    }

    public set id(value: number) {
        this._id = value;
    }

    public set insurance(value: Insurance) {
        this._insurance = value;
    }

    public set country(value: string) {
        this._country = value;
    }

    public set licensePlate(value: string) {
        this._licensePlate = value;
    }

    public set brand(value: string) {
        this._brand = value;
    }

    public set model(value: string) {
        this._model = value;
    }

    public set type(value: string) {
        this._type = value;
    }
}
