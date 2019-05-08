export class License {
    private _id: number;
    private _category: string;
    private _licenseNumber: string;
    private _expires: string;

    constructor(id: number, category: string, licenseNumber: string, expires: string) {
        this._id = id;
        this._category = category;
        this._licenseNumber = licenseNumber;
        this._expires = expires;
    }

    public get id(): number {
        return this._id;
    }

    public get category(): string {
        return this._category;
    }

    public get licenseNumber(): string {
        return this._licenseNumber;
    }

    public get expires(): string {
        return this._expires;
    }

    public set id(value: number) {
        this._id = value;
    }

    public set category(value: string) {
        this._category = value;
    }

    public set licenseNumber(value: string) {
        this._licenseNumber = value;
    }

    public set expires(value: string) {
        this._expires = value;
    }
}
