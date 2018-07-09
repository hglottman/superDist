import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(supermarkets) {
    return supermarkets.sort(function (a, b) {
        const x = a['distance'];
        const y = b['distance'];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}


