import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { catchError, Subject, takeUntil } from 'rxjs';
import { Product } from '../common/interfaces/product.interface';
import { ApiService } from '../common/services/api.service';
import { SnackbarService } from '../common/services/snackbar.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  public productsList!: Product[];
  public categoriesChips!: string[];

  private _unsub$: Subject<void> = new Subject();

  constructor(private _apiService: ApiService,
              private _snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getCategoriesForChips();
  }

  public removeProduct(id: number): void {
    this._apiService.deleteProduct(id).pipe(
      catchError((err: HttpErrorResponse) => {
          this._snackbarService.openSnackBar('Error', 'OK');
          throw new Error(err.message)
        }),
      takeUntil(this._unsub$)
    ).subscribe(_ => this._snackbarService.openSnackBar('Deleted product!', 'OK'));
  }

  public sort(event: MatSelectChange): Product[] {
    if(event.value === 'asc') {
      return this.productsList = this.productsList.sort((x, y) => x.price - y.price);
    } else {
      return this.productsList = this.productsList.sort((x, y) => y.price - x.price);
    }
  }

  public productId(index: number, item: Product): number {
    return item.id
  }
 
  private getAllProducts(): void {
    this._apiService.getProductsList().pipe(
      catchError((err: HttpErrorResponse) => {
          this._snackbarService.openSnackBar('Error', 'OK');
          throw new Error(err.message)
        }),
      takeUntil(this._unsub$)
    ).subscribe(products => this.productsList = products)
  }

  private getCategoriesForChips(): void {
    this._apiService.getAllCategories().pipe(
      catchError((err: HttpErrorResponse) => {
          this._snackbarService.openSnackBar('Error', 'OK');
          throw new Error(err.message)
        }),
      takeUntil(this._unsub$)
    )
    .subscribe(categories => this.categoriesChips = categories)
  }

  ngOnDestroy(): void {
    this._unsub$.next();
    this._unsub$.complete()
  }
}
