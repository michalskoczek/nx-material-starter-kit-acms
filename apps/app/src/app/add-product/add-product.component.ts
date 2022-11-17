import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Subject, takeUntil } from 'rxjs';
import { ApiService } from '../common/services/api.service';
import { SnackbarService } from '../common/services/snackbar.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit, OnDestroy {
  public form!: FormGroup;

  private _unsub$: Subject<void> = new Subject();

  constructor(private _apiService: ApiService,
              private _router: Router,
              private _snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.createForm();
  }

  get fcontrols() {
    return this.form.controls;
  }

  public postProduct(): void {
    if(this.form.invalid) return;

    this._apiService.postProductsList(this.form.value).pipe(
      catchError((err: HttpErrorResponse) => {
        this._snackbarService.openSnackBar('Error', 'OK');
        throw new Error(err.message)
      }),
      takeUntil(this._unsub$)
    ).subscribe(_ => this._router.navigate(['/products']))
  }

  private createForm(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    })
  }

  ngOnDestroy(): void {
    this._unsub$.next();
    this._unsub$.complete()
  }
}
