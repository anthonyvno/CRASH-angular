import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../model/report.model';

@Pipe({
    name: 'insuredByLoggedInInsurer'
})
export class InsuredByLoggedInInsurerPipe implements PipeTransform {
    transform(report: Report, args?: any): any {
        let counter = 0;
        report.profiles.forEach(profile => {
            if (
                profile.vehicles[0].insurance.insurer.name
                    .toLowerCase()
                    .localeCompare(atob(sessionStorage.getItem('token')).split(':')[0].toLowerCase()) === 0
            ) {
                counter++;
            }
        });
        return counter;
    }
}
