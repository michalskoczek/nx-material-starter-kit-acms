import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { Product } from '../../common/interfaces/product.interface';
import { ApiService } from '../../common/services/api.service';
import { SnackbarService } from '../../common/services/snackbar.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  public product!: Product | null;
  public spinner!: boolean;

  private _unsub$: Subject<void> = new Subject();

  constructor(private _apiService: ApiService,
              private _route: ActivatedRoute,
              private _snackbarService: SnackbarService){}

  ngOnInit(): void {
    this.spinner = true;
    this.getProductDetails();
  }

  private getProductDetails(): void {
    const id: number = this._route.snapshot.params['id']
    this._apiService.getSingleProduct(id).pipe(
      catchError((err: HttpErrorResponse) => {
        this._snackbarService.openSnackBar('Error', 'OK');
        throw new Error(err.message)
      }),
      takeUntil(this._unsub$)
    )
    .subscribe(product => {
      this.product = product;
      this.spinner = false;
    })
  }

  ngOnDestroy(): void {
    this._unsub$.next();
    this._unsub$.complete()
  }
}
