import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import { AddProductComponent } from "./add-product/add-product.component";
import { FilterProductsComponent } from "./products-list/filter-products/filter-products.component";
import { ProductDetailComponent } from "./products-list/product-detail/product-detail.component";
import { ProductsListComponent } from "./products-list/products-list.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products'
  },
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'add-product',
    component: AddProductComponent
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent
  },
  {
    path: ':filter/products',
    component: FilterProductsComponent
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  declarations: [],
  exports: []
})
export class AppRoutingModule {
}
