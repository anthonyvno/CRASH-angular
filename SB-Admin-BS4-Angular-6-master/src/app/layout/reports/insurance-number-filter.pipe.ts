import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../model/report.model';

@Pipe({
    name: 'insuranceNumberFilter'
})
export class InsuranceNumberFilterPipe implements PipeTransform {
    transform(reports: Report[], insuranceNumber: string): Report[] {
        if (!insuranceNumber || insuranceNumber.length === 0) {
            return reports;
        }
        return reports.filter(rep =>
            rep.profiles[0].vehicles[0].insurance.insuranceNumber.toLowerCase().startsWith(insuranceNumber.toLowerCase())
            || rep.profiles[1].vehicles[0].insurance.insuranceNumber.toLowerCase().startsWith(insuranceNumber.toLowerCase())
        );
    }
}
