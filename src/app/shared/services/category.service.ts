import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category, SubCategory} from '../interfaces/interfaces';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  categoryList: Category[] = []

  currentCategory: Category
  currentSubCategory: SubCategory

  constructor(
    private http: HttpClient
  ) {}

  getAll(){
    return this.http.get(`${environment.BASE_URL}${environment.CATEGORY_URL}${environment.FINDALL_URL}`)
      .pipe(map(res => {
        return Object.keys(res)
          .map( key => ({
            ...res[key],
          }))
      }))
  }

}
