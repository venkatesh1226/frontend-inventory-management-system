import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Factory } from 'src/app/model/factory';
import { GlobalConstants } from 'src/app/global-constants';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  // private URL = "http://localhost:8008"
  
  private URL = GlobalConstants.apiURL;

  constructor(private http: HttpClient) { 
  }

  getAllFactories():Observable<Factory[]> { 
    let queryParams = new HttpParams();
    queryParams = queryParams.append("subscription-key",GlobalConstants.key);
    return this.http.get<Factory[]>(this.URL+"/factories",{params:queryParams});
  }

  addFactory(f:Factory): Observable<Factory[]> { 
    let queryParams = new HttpParams();
    queryParams = queryParams.append("subscription-key",GlobalConstants.key);
    return this.http.post<Factory[]>(this.URL+"/add-factory",f,{params:queryParams});
  }

  updateFactory(f: Factory): Observable<Factory[]> { 
    let queryParams = new HttpParams();
    queryParams = queryParams.append("subscription-key",GlobalConstants.key);
    return this.http.put<Factory[]>(this.URL, f,{params:queryParams});
  }

  deleteFactory(f:Factory): Observable<Factory[]> { 
    let queryParams = new HttpParams();
    queryParams = queryParams.append("subscription-key",GlobalConstants.key);
    return this.http.delete<Factory[]>(this.URL+"/delete-factory/"+f.factoryId,{params:queryParams})
  }

  getFactoryById(id: number): Observable<Factory> { 
    let queryParams = new HttpParams();
    queryParams = queryParams.append("subscription-key",GlobalConstants.key);
    return this.http.get<Factory>(this.URL + "/factory/" + id,{params:queryParams});
  }
}
