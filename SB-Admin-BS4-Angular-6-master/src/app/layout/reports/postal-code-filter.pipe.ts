import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../model/report.model';

@Pipe({
  name: 'postalCodeFilter'
})
export class PostalCodeFilterPipe implements PipeTransform {

  transform(reports: Report[], postalCode: string): Report[] {
    if (!postalCode || postalCode.length === 0) {
        return reports;
    }
    return reports.filter(rep =>
        rep.postalCode.startsWith(postalCode)
    );
}

}
