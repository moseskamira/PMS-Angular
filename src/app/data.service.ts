import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './shared/models/category';
import {  throwError } from 'rxjs';
// import { retry, catchError } from 'rxjs/operators';
import { retry, catchError, tap } from 'rxjs/operators'



@Injectable({
  providedIn: 'root'
})
export class DataService {

  public first: string = "";  
  public prev: string = "";  
  public next: string = "";  
  public last: string = "";

  body: string;
  baseUrl: string = "https://online-shopping-api.herokuapp.com/onlineshopping";

  constructor(private http: HttpClient) { }

  parseLinkHeader(header) {
    if (header.length == 0) {
      return ;
    }

    let parts = header.split(',');
    var links = {};
    parts.forEach( p => {
      let section = p.split(';');
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;

    });

    this.first  = links["first"];
    this.last   = links["last"];
    this.prev   = links["prev"];
    this.next   = links["next"]; 
  }

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
    return this.http.post(this.baseUrl+'/category',newCategory,{responseType: 'json', headers});
  }
  
  getCategories(): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    }); 
    return this.http.get(this.baseUrl+'/category',{responseType: 'json', headers}).pipe(catchError(this.handleError));
  }
  
  deleteCategory(catId: number): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    }); 
    
    return this.http.delete(this.baseUrl+"/category/"+catId,{responseType: 'text', headers});

  }

  updateCategory(id: number, value: any): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin':'*'
    }
    ); 
    return this.http.put(this.baseUrl+"/category/"+id, value,{responseType: 'json', headers});
  }
  
  getSingleCategory(id: number): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin':'*'
    }); 
    return this.http.get(this.baseUrl+"/category/"+id,{responseType: 'json', headers});
  }

  getcategoryProducts(id: number): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    }); 
    return this.http.get(this.baseUrl+"/category/"+id+"/product",{responseType: 'json', headers});
  }


}
