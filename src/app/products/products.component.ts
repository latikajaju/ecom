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
  productList: undefined | Product[];
  public products : any = [];
  public cartCount: any = 0;
  length = 50;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  public getTotalProductsCount!: number;
  constructor(private _products:ProductsService){}

  ngOnInit(){
    this.products = this.listProducts()
    this.length = this.products.length;
  }

  listProducts(){
    this._products.showProducts().subscribe((result)=>{
      if(result){
        this.productList = result
        console.log(result)

        this.productList.forEach((n:any)=>{
          Object.assign(n,{quantity:1, total:n.price})
        })
      }
    })
  }

  handlePageEvent(e:PageEvent){
    this.products = this._products.showProducts()
  }

  addToCart(products:any){
    this._products.addToCart(products);
    this.cartCount = this._products.getCartItems()
    this.getTotalProductsCount = this.cartCount.length
    console.log(this._products.updateTotalProductsCount(this.getTotalProductsCount));
  }
}
