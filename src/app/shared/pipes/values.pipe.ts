import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'values'
})
export class ValuesPipe implements PipeTransform {

    transform(value: any, args?: any[]): Object[] {
        const keyArr: any[] = Object.keys(value),
            dataArr = [];

        keyArr.forEach((key: any) => {
            if (value[key]) {
                dataArr.push({ text: key, value: value[key]});
            }
        });

        return dataArr;
    }

}
