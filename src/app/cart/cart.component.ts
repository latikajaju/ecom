import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { CartItem, Product } from '../data-type';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cart ?: Array<CartItem>
  finalTotal  ?: number;

  constructor(private serviceProduct:ProductsService) { }

  ngOnInit():void{
    this.cart = this.serviceProduct.getCartItems()
  }

  cartTotal(){
    return this.serviceProduct.cartTotal()
  }

  removeProduct(item: CartItem){
    this.serviceProduct.removeItem(item.product)
    this.cart = this.serviceProduct.getCartItems()
  }

  incQty(item : CartItem) {
    item.qty = item.qty + 1
    this.serviceProduct.setCartQty()
  }

  decQty(item : CartItem) {
    item.qty = item.qty - 1
    if(item.qty <= 0) this.removeProduct(item)
    this.serviceProduct.setCartQty()
  }
} 

