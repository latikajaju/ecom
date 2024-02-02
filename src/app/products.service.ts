import { Injectable } from '@angular/core';
import { CartItem, Product } from './data-type';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private cart : Array<CartItem> = new Array()
  private products?: Array<Product>
  private count = signal(0);
  private readonly productsSubject: BehaviorSubject<Array<Product> | undefined> = new BehaviorSubject<Array<Product> | undefined>(undefined);


  constructor(private http: HttpClient) { 
    this.fetchProducts().subscribe( products => {
      this.products = products
      this.productsSubject.next(products)
    } )
  }

  getProductSubject() {
    return this.productsSubject
  }

  fetchProducts() : Observable<Array<Product>> {
    return this.http.get<Product[]>("https://fakestoreapi.com/products")
  }

  // setProducts(products : Array<Product>) {
  //   this.products = products
  // }

  totalProductLength() {
    return this.products?.length
  }

  paginatedProducts(pageNumber: number = 1, itemsPerPage: number = 5) : Array<Product> | undefined {
    
    const startIndex = ((pageNumber <= 1 ? 1 : 2) - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const productsOnPage = this.products?.slice(startIndex, endIndex)

    return productsOnPage;
  }

  addToCart(product: Product){

    if(!this.cart.some(itm => itm.product.id == product.id)) {
      this.cart.push( { product, qty: 1 })
      this.setCartQty()
    } else {
      const index = this.cart.findIndex(itm => itm.product.id == product.id)
      this.cart[index].qty +=1
    }
    console.log(this.count())
  }
  
  setCartQty(op: number = 1) {
    if(op)
      this.count.set(this.cart?.reduce((total, item) => total + item.qty, 0))
    else
      this.count.set(this.cart?.reduce((total, item) => total - item.qty, 0))
  }

  getCartItems(){
    return this.cart
  }

  removeItem(product: Product){
    this.cart = this.cart.filter(item=>item.product.id != product.id)
    this.count.set(this.cart.length)
  }

  getCartCount() {
    return this.count
  }
}
