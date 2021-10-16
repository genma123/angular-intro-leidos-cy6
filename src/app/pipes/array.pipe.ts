import { Pipe, PipeTransform } from '@angular/core';

import { Author } from '../model/author';
@Pipe({
  name: 'array'
})
export class ArrayPipe implements PipeTransform {

  transform(value: Author[], ...args: any[]): string {
    return value.map(author => author.name).join(", ");
  }

}
