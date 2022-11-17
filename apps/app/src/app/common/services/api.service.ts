import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _apiUrl: string = 'https://fakestoreapi.com/'
  
  constructor(private _http: HttpClient) { }

  public getProductsList(): Observable<Product[]> {
    return this._http.get<Product[]>(`${this._apiUrl}products`);
  }

  public postProductsList(body: Product): Observable<Product> {
    return this._http.post<Product>(`${this._apiUrl}products`, body);
  }

  public getAllCategories(): Observable<string[]> {
    return this._http.get<string[]>(`${this._apiUrl}products/categories`);
  }

  public getSingleProduct(id: number): Observable<Product> {
    return this._http.get<Product>(`${this._apiUrl}products/${id}`);
  }

  public getFilterProducts(category: string): Observable<Product[]> {
    return this._http.get<Product[]>(`${this._apiUrl}products/category/${category}`);
  }

  public deleteProduct(id: number): Observable<Product> {
    return this._http.delete<Product>(`${this._apiUrl}products/${id}`);
  }
}