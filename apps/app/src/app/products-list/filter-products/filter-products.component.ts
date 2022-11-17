import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, Subject, takeUntil } from 'rxjs';
import { Product } from '../../common/interfaces/product.interface';
import { ApiService } from '../../common/services/api.service';
import { SnackbarService } from '../../common/services/snackbar.service';

@Component({
  selector: 'app-filter-products',
  templateUrl: './filter-products.component.html',
  styleUrls: ['./filter-products.component.scss'],
})
export class FilterProductsComponent implements OnInit, OnDestroy {
  public filterList!: Product[]
  public category!: string;

  private _unsub$: Subject<void> = new Subject();

  constructor(private _apiService: ApiService,
              private _route: ActivatedRoute,
              private _snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.getCategory();
    this.getFilterProducts();
  }

  public removeProduct(id: number): void {
    this._apiService.deleteProduct(id).pipe(
      catchError((err: HttpErrorResponse) => {
        this._snackbarService.openSnackBar('Error', 'OK');
        throw new Error(err.message)
      }),
      takeUntil(this._unsub$)
    ).subscribe(_ => this._snackbarService.openSnackBar('Deleted product!', 'OK'))
  }

  public productId(index: number, item: Product): number {
    return item.id
  }
  
  private getCategory(): void {
    this.category = this._route.snapshot.url[0].path;
  }
  
  private getFilterProducts(): void {
    this._apiService.getFilterProducts(this.category).pipe(
      catchError((err: HttpErrorResponse) => {
        this._snackbarService.openSnackBar('Error', 'OK');
        throw new Error(err.message)
      }),
      takeUntil(this._unsub$)
    ).subscribe(filters => this.filterList = filters)
  }

  ngOnDestroy(): void {
    this._unsub$.next();
    this._unsub$.complete()
  }
}