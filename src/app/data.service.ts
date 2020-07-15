import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Category } from './shared/models/category'
import {  throwError } from 'rxjs'
import { retry, catchError, tap } from 'rxjs/operators'
import { Message } from './shared/models/message'
import { Product } from './shared/models/product'



@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl: string = "https://online-shopping-api.herokuapp.com/mozeli"
  errorMessage: any
  
  constructor(private http: HttpClient) { }

  handleError(errorResp: HttpErrorResponse) {
    this.errorMessage = 'Unknown error!'
    if (errorResp.error instanceof ErrorEvent) {
      // Client-side errors
      this.errorMessage = `Error: ${errorResp.error.message}`
    } else {
      // Server-side errors
      this.errorMessage = `Error-Code: ${errorResp.status}\n Error-Message: ${errorResp.message}`
    }
    return throwError(this.errorMessage)
  }
  
  addCategory(newCategory: Category): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    })
    return this.http.post(this.baseUrl+'/album',newCategory,
    {responseType: 'json', headers}).pipe(catchError(this.handleError))
  }
  
  getCategories(): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    })
    return this.http.get(this.baseUrl+'/album',
    {responseType: 'json', headers}).pipe(retry(3), catchError(this.handleError))
  }
  
  deleteCategory(albumId: number): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    })
    return this.http.delete(this.baseUrl+"/album/"+albumId,
    {responseType: 'text', headers}).pipe(catchError(this.handleError))
  }

  updateCategory(id: number, value: any): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin':'*'
    })
    return this.http.put(this.baseUrl+"/album/"+id, value,
    {responseType: 'json', headers})
  }
  
  getSingleCategory(id: number): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin':'*'
    })
    return this.http.get(this.baseUrl+"/album/"+id,
    {responseType: 'json', headers})
  }

  getcategoryProducts(id: number): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    }) 
    return this.http.get(this.baseUrl+"/album/"+id+"/song",
    {responseType: 'json', headers}).pipe(retry(3), catchError(this.handleError))
  }

  getAllProducts() {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    })
    return this.http.get(this.baseUrl+'/album/song',{responseType: 'json', 
    headers}).pipe(retry(3), catchError(this.handleError))
  }

  addProduct(categoryId: number, newProduct: any): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    })
    return this.http.post(this.baseUrl+"/album/"+categoryId+"/song"
    ,newProduct,{responseType: 'json', headers})
  }

  deleteProduct(catId: number, prodId: number): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    }) 
    return this.http.delete(this.baseUrl+"/album/"+catId+"/song/"+prodId,
    {responseType: 'text', headers}).pipe(retry(3), catchError(this.handleError))
  }

  editProduct(catId: number, prodId: number, editedProd: Product): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    })
    return this.http.put(this.baseUrl+"/album/"+catId+"/song/"+prodId,editedProd,
    {responseType: 'json', headers}).pipe(retry(3), catchError(this.handleError))
  }

  getSingleProduct(catId: number, prodId: number): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    })
    return this.http.get(this.baseUrl+"/album/"+catId+"/song/"+prodId,
    {responseType: 'json', headers}).pipe(retry(3), catchError(this.handleError))
  }

  sendAutoReply(autoReply: Message): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    })
    return this.http.post(this.baseUrl+"/sendNotification",autoReply,
    {responseType: 'json', headers}).pipe(retry(3), catchError(this.handleError))
  }

}
