import { Pipe, PipeTransform } from '@angular/core';
import {Product} from './interfaces/interfaces';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(products: Product[], subCategory) : any {
    return products.filter( product => {
      return product.subcategoryid == subCategory
    })
  }
}
