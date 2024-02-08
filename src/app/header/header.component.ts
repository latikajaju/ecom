import { Component, effect } from '@angular/core';
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
  constructor(
    private serviceProduct: ProductsService,
  ){
    effect(() => {
      this.totalProductsCount = serviceProduct.getCartCount()
    })
  }
}
