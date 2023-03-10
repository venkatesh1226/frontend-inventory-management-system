import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/global-constants';
import { Order } from 'src/app/model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  URL:string=GlobalConstants.orderURL;

  constructor(private http: HttpClient) { }

  placeOrder(o:Order):Observable<Number> { 
    // let queryParams = new HttpParams();
    // queryParams = queryParams.append("subscription-key",GlobalConstants.key);
    // return this.http.get<Factory[]>(this.URL+"/factories",{params:queryParams});
    return this.http.post<Number>(this.URL+"order",o);
    
  }

  countOrders(id:number):Observable<Number>{
    return this.http.get<Number>(this.URL+"count/"+id);
  }
}
