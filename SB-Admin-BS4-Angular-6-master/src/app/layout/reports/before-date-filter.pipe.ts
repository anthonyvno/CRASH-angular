import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../model/report.model';

@Pipe({
    name: 'beforeDateFilter'
})
export class BeforeDateFilterPipe implements PipeTransform {
    transform(reports: Report[], beforeDate: string): Report[] {
        if (!beforeDate || beforeDate.length === 0) {
            return reports;
        }
        const splittedDate = beforeDate.split('/');
        const beforeDateAsDate = new Date(parseInt(splittedDate[2]), parseInt(splittedDate[1]) - 1, parseInt(splittedDate[0]));
        return reports.filter(rep => new Date(rep.dateCrash) <= beforeDateAsDate);
    }
}
