import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {FbResponse, Product} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  type = 'Phone'
  cartProducts: Product[] = []

  constructor(
    private http: HttpClient
  ) { }

  create(product){
    return this.http.post(`${environment.BASE_URL}${environment.CREATE_URL}`,product)
       .pipe(map((res: FbResponse) => {
         return{
           ...product,
           id: res.name,
           date: new Date(product.date)
         }
         }
       ))
  }

  getAll(){
    return this.http.get(`${environment.BASE_URL}${environment.PRODUCT_URL}${environment.FINDALL_URL}`)
      .pipe(map(res => {
        return Object.keys(res)
          .map( key => ({
            ...res[key],
            //id: key,
            date: new Date(res[key].date)
          }))
      }))
  }

  getById(id){
    return this.http.get(`${environment.BASE_URL}${environment.PRODUCT_URL}${environment.FINDBYID_URL}/${id}`)
      .pipe(map((res: Product) => {
        return {
            ...res,
            date: new Date(res.date)
          }
      }))
  }

  remove(id){
    return this.http.delete(`${environment.BASE_URL}${environment.PRODUCT_URL}${environment.DELETE_URL}/${id}.json`)
  }

  update(product: Product){
    return this.http.patch(`${environment.BASE_URL}${environment.PRODUCT_URL}${environment.UPDATE_URL}`, product)
 }

 setType(type){
    this.type = type
 }

 addProduct(product){
    this.cartProducts.push(product)
 }
}
