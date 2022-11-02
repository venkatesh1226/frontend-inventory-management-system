import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Factory } from 'src/app/model/factory';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  private URL="http://localhost:8008"

  constructor(private http: HttpClient) { }

  getAllFactories():Observable<Factory[]> { 
    return this.http.get<Factory[]>(this.URL+"/factories");
  }

  addFactory(f:Factory): Observable<Factory[]> { 
    return this.http.post<Factory[]>(this.URL+"/add-factory",f);
  }

  updateFactory(f: Factory): Observable<Factory[]> { 
    return this.http.put<Factory[]>(this.URL, f);
  }

  deleteFactory(f:Factory): Observable<Factory[]> { 
    return this.http.delete<Factory[]>(this.URL+"/delete-factory/"+f.factoryId)
  }

  getFactoryById(id: number): Observable<Factory> { 
    return this.http.get<Factory>(this.URL + "/factory/" + id);
  }
}
