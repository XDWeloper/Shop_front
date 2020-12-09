import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {OrderService} from '../../shared/services/order.service';
import {computeStartOfLinePositions} from '@angular/compiler-cli/src/ngtsc/sourcemaps/src/source_file';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {

  orders = []
  oSub: Subscription
  rSub: Subscription

  constructor(
    private orderServ: OrderService
  ) { }

  ngOnInit(): void {
    this.oSub = this.orderServ.getAll().subscribe(orders => {
      this.orders = orders
    })
  }

  ngOnDestroy(){
    if(this.oSub){
      this.oSub.unsubscribe()
    }
    if(this.rSub){
      this.rSub.unsubscribe()
    }
  }

  remove(id) {
    this.rSub = this.orderServ.remove(id).subscribe( () => {
      this.orders = this.orders.filter( order => order.id !== id)
     })
  }
}
