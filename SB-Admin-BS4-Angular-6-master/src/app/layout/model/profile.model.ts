import { License } from './license.model';
import { Vehicle } from './vehicle.model';

export class Profile {
    private _id: number;
    private _license: License;
    private _vehicles: Vehicle[];
    private _firstName: string;
    private _lastName: string;
    private _email: string;

    constructor(id: number, license: License, vehicles: Vehicle[], firstName: string, lastName: string, email: string) {
        this._id = id;
        this._license = license;
        this._vehicles = vehicles;
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
    }

    public get id(): number {
        return this._id;
    }

    public get license(): License {
        return this._license;
    }

    public get vehicles(): Vehicle[] {
        return this._vehicles;
    }

    public get firstName(): string {
        return this._firstName;
    }

    public get lastName(): string {
        return this._lastName;
    }

    public get email(): string {
        return this._email;
    }

    public set id(value: number) {
        this._id = value;
    }

    public set license(value: License) {
        this._license = value;
    }

    public set vehicles(value: Vehicle[]) {
        this._vehicles = value;
    }

    public set firstName(value: string) {
        this._firstName = value;
    }

    public set lastName(value: string) {
        this._lastName = value;
    }

    public set email(value: string) {
        this._email = value;
    }

    static fromJson(json: any): Profile {
        if (json != null) {
            const ins = new Profile(
                json.id,
                json.license,
                json.vehicles.map(Vehicle.fromJson),
                json.firstName,
                json.lastName,
                json.email
            );
            return ins;
        } else {
            return null;
        }
    }
}
