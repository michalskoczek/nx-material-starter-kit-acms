import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {MaterialModule} from './material.module';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from "./app-routing.module";
import {RouterModule} from "@angular/router";
import { ProductsListComponent } from './products-list/products-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductDetailComponent } from './products-list/product-detail/product-detail.component';
import { FilterProductsComponent } from './products-list/filter-products/filter-products.component';

@NgModule({
  declarations: [
    AppComponent, 
    ProductsListComponent, 
    AddProductComponent, 
    ProductDetailComponent, 
    FilterProductsComponent
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule, 
    HttpClientModule, 
    MaterialModule, 
    ReactiveFormsModule, 
    RouterModule, 
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
