import { Component } from '@angular/core';
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
  ){}

  ngOnInit(){

    this.serviceProduct.fetchProducts().subscribe(products => {
      this.serviceProduct.setProducts(products)

      this.products = this.serviceProduct.paginatedProducts()

      this.length = this.serviceProduct.totalProductLength() || 50
    })
   
  }

  handlePageEvent(e:PageEvent){
    this.products = this.serviceProduct.paginatedProducts(e.pageIndex, 5)
  }

  addToCart(products:any){
    this.serviceProduct.addToCart(products);
    // this.cartCount = this.serviceProduct.getCartItems()  
    // this.getTotalProductsCount = this.cartCount.length
    // console.log(this._products.updateTotalProductsCount(this.getTotalProductsCount));
  }
}
