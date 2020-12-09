import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../shared/services/product.service';
import {switchMap} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../shared/interfaces/interfaces';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {


  form: FormGroup
  product: Product
  submitted = false

  constructor(
    private route: ActivatedRoute,
    private productServ: ProductService,
    protected router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap( params => {
        return this.productServ.getById(params['id'])
      })
    ).subscribe( product => {
      this.product = product
      this.form = new FormGroup({
        type: new FormControl(product.subcategoryid,Validators.required),
        title: new FormControl(product.title,Validators.required),
        photo: new FormControl(product.photo,Validators.required),
        info: new FormControl(product.info,Validators.required),
        price: new FormControl(product.price,Validators.required),
      })
    })
  }

  submit() {
    if(this.form.invalid){
      return
    }
    this.submitted = true

    this.productServ.update( {
      ...this.product,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
      date: new Date()
    }).subscribe( res => {
      this.submitted = false
      this.router.navigate(['/admin', 'dashboard'])
    })

  }
}
