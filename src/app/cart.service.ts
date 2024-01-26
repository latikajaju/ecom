import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList : any =[];
  public productList = new BehaviorSubject<any>([])
  constructor() { }

  addToCart(product:any){
    this.cartItemList.push(product);
    console.log(this.cartItemList);
    this.getTotalPrice();
  }

  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product:any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  getTotalPrice():number{
    let finalTotal = 0;
    this.cartItemList.map((n:any)=>{
      finalTotal+= n.total
    })
    return finalTotal;
  }

  removeCartItem(product:any){
    this.cartItemList.map((n:any, index:any)=>{
      if(product.id === n.id){
        this.cartItemList.splice(index, 1);
      }
    })
  }

  removeAllCart(){
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
