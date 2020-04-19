import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './shared/models/category';
import {  throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators'
import { Message } from './shared/models/message';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  body: string;
  baseUrl: string = "https://online-shopping-api.herokuapp.com/onlineshopping";
  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error-Code: ${error.status}\n Error-Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  
  addCategory(newCategory: Category): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    });
    this.body = JSON.stringify(newCategory);
    return this.http.post(this.baseUrl+'/category',newCategory,
    {responseType: 'json', headers});
  }
  
  getCategories(): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    }); 
    return this.http.get(this.baseUrl+'/category',
    {responseType: 'json', headers}).pipe(
      retry(3),
      catchError(this.handleError));
  }
  
  deleteCategory(catId: number): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    }); 
    return this.http.delete(this.baseUrl+"/category/"+catId,
    {responseType: 'text', headers});
  }

  updateCategory(id: number, value: any): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin':'*'
    }); 
    return this.http.put(this.baseUrl+"/category/"+id, value,
    {responseType: 'json', headers});
  }
  
  getSingleCategory(id: number): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin':'*'
    }); 
    return this.http.get(this.baseUrl+"/category/"+id,
    {responseType: 'json', headers});
  }

  getcategoryProducts(id: number): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    }); 
    return this.http.get(this.baseUrl+"/category/"+id+"/product",
    {responseType: 'json', headers});
  }

  getAllProducts() {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    });
    return this.http.get(this.baseUrl+'/category/product',{responseType: 'json', 
    headers}).pipe(catchError(this.handleError));
  }

  addProduct(categoryId: number, newProduct: any): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    });
    this.body = JSON.stringify(newProduct);
    return this.http.post(this.baseUrl+"/category/"+categoryId+"/product"
    ,newProduct,{responseType: 'json', headers});
  }

  deleteProduct(catId: number, prodId: number): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    }); 
    return this.http.delete(this.baseUrl+"/category/"+catId+"/product/"+prodId,
    {responseType: 'text', headers});
  }

  editProduct(catId: number, prodId: number, editedProd: any): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    });
    this.body = JSON.stringify(editedProd);
    return this.http.put(this.baseUrl+"/category/"+catId+"/product/"+prodId,editedProd,
    {responseType: 'json', headers});
  }

  getSingleProduct(catId: number, prodId: number): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    });
    return this.http.get(this.baseUrl+"/category/"+catId+"/product/"+prodId,
    {responseType: 'json', headers});
  }

  sendAutoReply(autoReply: Message): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    });
    this.body = JSON.stringify(autoReply);
    return this.http.post(this.baseUrl+"/sendNotification",autoReply,
    {responseType: 'json', headers});
  }

}
