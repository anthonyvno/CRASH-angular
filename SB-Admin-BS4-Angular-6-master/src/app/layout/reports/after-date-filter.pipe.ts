import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../model/report.model';

@Pipe({
    name: 'afterDateFilter'
})
export class AfterDateFilterPipe implements PipeTransform {
    transform(reports: Report[], afterDate: string): Report[] {
        if (!afterDate || afterDate.length === 0) {
            return reports;
        }
        const splittedDate = afterDate.split('/');
        const afterDateAsDate = new Date(parseInt(splittedDate[2]), parseInt(splittedDate[1]) - 1 , parseInt(splittedDate[0]));
        return reports.filter(rep => new Date(rep.dateCrash) > afterDateAsDate);
    }
}
