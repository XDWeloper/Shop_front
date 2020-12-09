import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {Subscription} from 'rxjs';
import {Category, Product} from '../../shared/interfaces/interfaces';
import {CategoryService} from '../../shared/services/category.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  products = []
  category: Category[] = []
  pSub: Subscription
  rSub: Subscription
  cSub: Subscription
  productName

  constructor(
    private productServ: ProductService,
    private categoryServ: CategoryService
  ) { }

  ngOnInit(): void {
    this.pSub = this.productServ.getAll().subscribe(products => {
      this.products = products
    })

    this.cSub = this.categoryServ.getAll().subscribe( categories => {
      this.category = categories

    })
  }

  ngOnDestroy(){
    if(this.pSub){
      this.pSub.unsubscribe()
    }
    if(this.rSub){
      this.rSub.unsubscribe()
    }
  }

  remove(id) {
    this.rSub = this.productServ.remove(id).subscribe( () => {
      this.products = this.products.filter( product => product.id ! == id)
    })
  }

}
