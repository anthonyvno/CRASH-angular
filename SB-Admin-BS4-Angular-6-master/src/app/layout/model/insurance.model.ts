import { Insurer } from './insurer.model';

export class Insurance {
    private _id: number;
    private _insurer: Insurer;
    private _insuranceNumber: string;
    private _greenCardNumber: string;
    private _emailAgency: string;
    private _expires: Date;
    private _phoneAgency: string;

    constructor(
        id: number,
        insurer: Insurer,
        insuranceNumber: string,
        greenCardNumber: string,
        emailAgency: string,
        expires: Date,
        phoneAgency: string
    ) {
        this._id = id;
        this._insurer = insurer;
        this._insuranceNumber = insuranceNumber;
        this._greenCardNumber = greenCardNumber;
        this._emailAgency = emailAgency;
        this._expires = expires;
        this._phoneAgency = phoneAgency;
    }

    public get id(): number {
        return this._id;
    }

    public get insurer(): Insurer {
        return this._insurer;
    }

    public get insuranceNumber(): string {
        return this._insuranceNumber;
    }

    public get greenCardNumber(): string {
        return this._greenCardNumber;
    }

    public get emailAgency(): string {
        return this._emailAgency;
    }

    public get expires(): Date {
        return this._expires;
    }

    public get phoneAgency(): string {
        return this._phoneAgency;
    }

    public set id(value: number) {
        this._id = value;
    }

    public set insurer(value: Insurer) {
        this._insurer = value;
    }

    public set insuranceNumber(value: string) {
        this._insuranceNumber = value;
    }

    public set greenCardNumber(value: string) {
        this._greenCardNumber = value;
    }

    public set emailAgency(value: string) {
        this._emailAgency = value;
    }

    public set expires(value: Date) {
        this._expires = value;
    }

    public set phoneAgency(value: string) {
        this._phoneAgency = value;
    }
}
