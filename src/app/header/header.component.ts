import { Component, inject } from '@angular/core';
import { CartService } from '../cart.service';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../products.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { Injector } from '@angular/core';


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
  ){}

  private injector = inject(Injector)

  ngOnInit():void {

    toObservable(this.serviceProduct.getCartCount(), { injector: this.injector }).subscribe(
      (count) => {
        this.totalProductsCount = count;
      }
    )
  }
}
