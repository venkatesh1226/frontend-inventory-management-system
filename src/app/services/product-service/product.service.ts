import { HttpClient } from '@angular/common/http';
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
   return this.http.get<Product[]>(this.URL + "/" + fid+"/products");
  }

  addProduct(p: Product): Observable<Product[]> { 
    return this.http.post<Product[]>(this.URL+"/add-product",p);
  }

  editProduct(p: Product): Observable<Product[]> { 
    return this.http.put<Product[]>(this.URL + "/edit-product", p);
  }

  deleteProduct(pId?: number): Observable<Product[]> { 
    return this.http.delete<Product[]>(this.URL + "/delete/" + pId);
  }

  uploadFile(f:FormData): Observable<string> { 
    return this.http.post<string>(this.URL + "/upload", f)
  }

  loadFile(id:string):Observable<Blob> { 
    return this.http.get(this.URL + "/download/" + id, { responseType: "blob" });
  }

}
