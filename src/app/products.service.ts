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
  private productsSignal = signal<Product[]|undefined>(undefined)

  constructor(private http: HttpClient) { 
    this.fetchProducts().subscribe( products => {
      this.productsSignal.set(products)
      this.products = this.productsSignal()
    } )
  }

  fetchProducts() : Observable<Array<Product>> {
    return this.http.get<Product[]>("https://fakestoreapi.com/products")
  }

  totalProductLength() {
    return this.products?.length
  }

  paginatedProducts(pageNumber: number = 0, itemsPerPage: number = 5) : Array<Product> | undefined {
    
    const startIndex = (pageNumber) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const productsOnPage = this.products?.slice(startIndex, endIndex)

    return productsOnPage;
  }

  addToCart(product: Product){

    if(!this.isProductAdded(product)) {
      this.cart.push( { product, qty: 1 })
      this.setCartQty()
    } else {
      const index = this.cart.findIndex(itm => itm.product.id == product.id)
      this.cart[index].qty +=1
    }
  }
  
  setCartQty() {
      this.count.set(this.cart?.reduce((total, item) => total + item.qty, 0))
  }

  getCartItems(){
    return this.cart
  }

  removeItem(product: Product){
    this.cart = this.cart.filter(item=>item.product.id != product.id)
    this.count.set(this.cart.length)
  }

  getCartCount() { 
    return this.count()
  }

  isProductAdded(product: Product) {
    return this.cart?.some(itm => itm.product.id == product.id)
  }

  cartTotal(){
    return this.getCartItems()?.reduce((total, item) => total + (item.product.price * item.qty), 0);
  }

  incQty(item : CartItem) {
    item.qty = item.qty + 1
    this.setCartQty()
  }

  decQty(item : CartItem) {
    item.qty = item.qty - 1
    if(item.qty <= 0) this.removeItem(item.product)
    this.setCartQty()
  }

  getCartItemFromProduct(product: Product) {
    return this.cart.find( item => item.product.id == product.id )
  }

  getProductSignal() {
    return this.productsSignal()
  }
}
