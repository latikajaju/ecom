import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public totalProductsCount: number = 0;
  constructor(private _productS: ProductsService){}

  ngOnInit():void{
    // this.cartService.getProducts().subscribe(res=>{
    //   this.totalProducts = res.length;
    // })
    this._productS.totalProductsCount$.subscribe(count => {
      this.totalProductsCount = count;
    });
  }
}
