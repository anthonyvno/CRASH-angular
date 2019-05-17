import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../model/report.model';

@Pipe({
    name: 'vehicleTypeFilter'
})
export class VehicleTypeFilterPipe implements PipeTransform {
    transform(reports: Report[], type: string): Report[] {
        if (!type || type.length === 0 || type === 'Alle') {
            return reports;
        }
        return reports.filter(rep =>
            rep.profiles[0].vehicles[0].type.includes(type)
            || rep.profiles[1].vehicles[0].type.includes(type)
        );
    }
}
