import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 
  constructor(private http: HttpClient) { }

 getCategories(): Observable<any> {

  return this.http.get<any>('https://online-shopping-api.herokuapp.com/onlineshopping/category');
}



}
