import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './shared/models/category';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  body: string;
  baseUrl: string = "https://online-shopping-api.herokuapp.com/onlineshopping";
  constructor(private http: HttpClient) { }
  
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
    return this.http.get(this.baseUrl+'/category',{responseType: 'json', headers});
  }
  
  deleteCategory(id: number): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    }); 
    
    return this.http.delete(this.baseUrl+'/category/${id}',{responseType: 'text', headers});
  }

  updateCategory(id: number, value: any): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin':'*'
    }
    ); 
    return this.http.put('https://online-shopping-api.herokuapp.com/onlineshopping/category/${id}', value,{responseType: 'json', headers});
  }
  
 
  
  getSingleCategory(id: number): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin':'*'
    }); 
    return this.http.get('https://online-shopping-api.herokuapp.com/onlineshopping/category/${id}',{responseType: 'json', headers});
  }}
