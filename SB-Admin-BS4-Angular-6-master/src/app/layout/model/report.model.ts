import { Profile } from './profile.model';

export class Report {
    private _id: number;
    private _profiles: Profile[];
    private _dateReportReceived: Date;
    private _dateCrash: Date;
    private _street: string;
    private _streetNumber: string;
    private _postalCode: string;
    private _city: string;
    private _country: string;
    private _pdfReport: string;
    private _circumstances: Boolean[][];

    constructor(
        id: number,
        profiles: Profile[],
        dateReportReceived: Date,
        dateCrash: Date,
        street: string,
        streetNumber: string,
        postalCode: string,
        city: string,
        country: string,
        pdfReport: string,
        circumstances: Boolean[][]
    ) {
        this._id = id;
        this._profiles = profiles;
        this._dateReportReceived = dateReportReceived;
        this._dateCrash = dateCrash;
        this._street = street;
        this._streetNumber = streetNumber;
        this._postalCode = postalCode;
        this._city = city;
        this._country = country;
        this._pdfReport = pdfReport;
        this._circumstances = circumstances;
    }

    public get id(): number {
        return this._id;
    }

    public get profiles(): Profile[] {
        return this._profiles;
    }

    public get dateReportReceived(): Date {
        return this._dateReportReceived;
    }

    public get dateCrash(): Date {
        return this._dateCrash;
    }

    public get street(): string {
        return this._street;
    }

    public get streetNumber(): string {
        return this._streetNumber;
    }

    public get postalCode(): string {
        return this._postalCode;
    }

    public get city(): string {
        return this._city;
    }

    public get country(): string {
        return this._country;
    }

    public get pdfReport(): string {
        return this._pdfReport;
    }

    public get circumstances(): Boolean[][] {
        return this._circumstances;
    }

    public set id(value: number) {
        this._id = value;
    }

    public set profiles(value: Profile[]) {
        this._profiles = value;
    }

    public set dateReportReceived(value: Date) {
        this._dateReportReceived = value;
    }

    public set dateCrash(value: Date) {
        this._dateCrash = value;
    }

    public set street(value: string) {
        this._street = value;
    }

    public set streetNumber(value: string) {
        this._streetNumber = value;
    }

    public set postalCode(value: string) {
        this._postalCode = value;
    }

    public set city(value: string) {
        this._city = value;
    }

    public set country(value: string) {
        this._country = value;
    }

    public set pdfReport(value: string) {
        this._pdfReport = value;
    }

    public set circumstances(value: Boolean[][]) {
        this._circumstances = value;
    }

    static fromJson(json: any): Report {
        console.log(json);
        if (json != null) {
            const ins = new Report(
                json.id,
                json.profiles.map(Profile.fromJson),
                json.dateReportReceived,
                json.dateCrash,
                json.street,
                json.streetNumber,
                json.postalCode,
                json.city,
                json.country,
                json.pdfReport,
                json.circumstances
            );
            return ins;
        } else {
            return null;
        }
    }

    toJSON() {
        return {
            id: this._id,
            profiles: this._profiles,
            dateReportReceived: this._dateReportReceived,
            dateCrash: this._dateCrash,
            street: this._street,
            streetNumber: this._streetNumber,
            postalCode: this._postalCode,
            city: this._city,
            country: this._country,
            pdfReport: this._pdfReport,
            circumstances: this._circumstances,
        };
      }
}
