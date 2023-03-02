import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { GlobalConstants } from 'src/app/global-constants';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private URL = GlobalConstants.apiURL

  getProducts(fid: number): Observable<Product[]> { 
    let queryParams = new HttpParams();
    queryParams = queryParams.append("subscription-key",GlobalConstants.key);
   return this.http.get<Product[]>(this.URL + "/" + fid+"/products",{params:queryParams});
  }

  addProduct(p: Product): Observable<Product[]> { 
    let queryParams = new HttpParams();
    queryParams = queryParams.append("subscription-key",GlobalConstants.key);
    return this.http.post<Product[]>(this.URL+"/add-product",p,{params:queryParams});
  }

  editProduct(p: Product): Observable<Product[]> { 
    let queryParams = new HttpParams();
    queryParams = queryParams.append("subscription-key",GlobalConstants.key);
    return this.http.put<Product[]>(this.URL + "/edit-product", p,{params:queryParams});
  }

  deleteProduct(p: Product): Observable<void>{ 
    let queryParams = new HttpParams();
    queryParams = queryParams.append("subscription-key",GlobalConstants.key);
    return this.http.delete<void>(this.URL + "/delete/" + p.productId,{params:queryParams});
  }

  uploadFile(f:FormData): Observable<string> { 
    let queryParams = new HttpParams();
    queryParams = queryParams.append("subscription-key",GlobalConstants.key);
    return this.http.post<string>(this.URL + "/upload", f,{params:queryParams})
  }

  loadFile(id:string):Observable<Blob> { 
    let queryParams = new HttpParams();
    queryParams = queryParams.append("subscription-key",GlobalConstants.key);
    return this.http.get(this.URL + "/download/" + id, { responseType: "blob",params: queryParams});
  }

}
