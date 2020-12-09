import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {Product} from '../shared/interfaces/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {OrderService} from '../shared/services/order.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  cartProducts: Product[] = []
  totalPrice = 0
  form: FormGroup
  submitted: boolean = false
  added = ''

  constructor(
    private orderServ: OrderService,
    private productServ: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartProducts = this.productServ.cartProducts
    for(let i = 0; i < this.cartProducts.length; i++){
      this.totalPrice += +this.cartProducts[i].price
    }

    this.form = new FormGroup({
      phone: new FormControl(null,Validators.required),
      name: new FormControl(null,Validators.required),
      address: new FormControl(null,Validators.required),
      payment: new FormControl('cash'),
    })


  }

  remove(cartProduct) {
    this.cartProducts = this.cartProducts.filter(product => product!== cartProduct)
    this.productServ.cartProducts = this.cartProducts
    this.totalPrice -= +cartProduct.price
  }

  submit() {
    if(this.form.invalid){
      return
    }

    this.submitted = true

    const order = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      orders: this.cartProducts,
      price: this.totalPrice,
      date: new Date()
    }

    this.orderServ.create(order).subscribe(res => {
      this.form.reset()
      this.added = 'Delivery is framed'
      this.submitted = false
    })

  }



}
