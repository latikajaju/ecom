import { Injectable } from '@angular/core';
import { Product } from './data-type';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private cart : Array<Product> = new Array()
  public productList = new BehaviorSubject<any>([])
  private totalProductsCountSubject = new BehaviorSubject<number>(0);
  totalProductsCount$ = this.totalProductsCountSubject.asObservable();

  constructor(private http: HttpClient) { }
  
  updateTotalProductsCount(count: number) {
    this.totalProductsCountSubject.next(count);
  }

  showProducts(){
    console.log(this.http.get("https://fakestoreapi.com/products"))
    return this.http.get<Product[]>("https://fakestoreapi.com/products")
  }
  fakeProducts(pageNumber: number = 1, itemsPerPage: number = 5) : Array<Product> {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const productsOnPage = this.showProducts().slice(startIndex, endIndex);

    return productsOnPage;
  }

  addToCart(product: Product){
    this.cart.push(product)
  }
  
  getCartItems(){
    return this.cart
  }

  getProducts(){
    return this.productList.asObservable();
  }

  removeItem(product:Product){
    this.cart = this.cart.filter(item=>item.id != product.id)
  }
}
