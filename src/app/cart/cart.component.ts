import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Product } from '../data-type';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cart ?: Array<Product>
  public finalTotal  !: number;
  public getTotalProductsCount: number =0;
  constructor(private _productS:ProductsService) { }

  ngOnInit():void{
    this.cart = this._productS.getCartItems()
    this.getTotalProductsCount = this.cart.length;
    this._productS.updateTotalProductsCount(this.getTotalProductsCount);
  }

  getTotal(){
    return this.cart?.reduce((total, product) => total + product.price, 0);
  }

  removeProduct(item:any){
    this._productS.removeItem(item)
    this.cart = this._productS.getCartItems()
    this._productS.updateTotalProductsCount(this.getTotalProductsCount);
    console.log("testing")
  }

} 

