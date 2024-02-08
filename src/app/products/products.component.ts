import { Component, effect } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router, RouterModule } from '@angular/router';
import { Product } from '../data-type';
import { NgFor, NgIf, SlicePipe } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterModule, NgFor, SlicePipe, NgIf, MatPaginatorModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  public products ?: Array<Product>

  length = 50;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  constructor(
    private serviceProduct:ProductsService
  ){
    effect( () =>{
      this.products = this.serviceProduct.getProductSignal()
      this.products = this.serviceProduct.paginatedProducts()
      this.length = this.serviceProduct.totalProductLength() || 50
    } )
  }

  handlePageEvent(e:PageEvent){
    console.log(e.pageIndex)
    this.products = this.serviceProduct.paginatedProducts(e.pageIndex, 5)
  }

  addToCart(product: Product){
    this.serviceProduct.addToCart(product);
  }

  checkProdAdded(prod : Product) {
    return  this.serviceProduct.isProductAdded(prod)
  }

  incQty(product : Product) {
    const item = this.serviceProduct.getCartItemFromProduct(product)
    this.serviceProduct.incQty(item!!)
  }

  decQty(product : Product) {
    const item = this.serviceProduct.getCartItemFromProduct(product)
    this.serviceProduct.decQty(item!!)
  }

  getProductQuantity(product: Product) {
    return this.serviceProduct.getCartItemFromProduct(product)?.qty
  }

}
