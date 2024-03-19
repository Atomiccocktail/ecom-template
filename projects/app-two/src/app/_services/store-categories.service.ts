import { Injectable } from '@angular/core';
import { devData } from '../_environments/dev';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoreCategoriesService {

  apiUrl: string = 'https://dev-ezyy-ecommerce.azurewebsites.net/api/v1';
  apiUrlOne: string = 'https://dev-ezyy-ecommerce.azurewebsites.net/api';
  token = devData.token;
  StripePublicKey = 'pk_live_51OVIxdBGFqpkWyBM0CVU4Ba6L0HPC0FAO9rtLLf8vL2vL2KCz3Kmm50gTMLpD51yFUR4exJoWqjWRTL2UU5o0ROS00R1wJyYt9';
  StripePublicKey2= 'sk_test_51OVIxdBGFqpkWyBM4nrnenw4jIw2JwG2McTHGduutGviUyjPCMsB5tsMNio6DJe9OkzxY152MYrruZkxSQzwia5M00l1aPQnEZ';
  constructor(private http: HttpClient) { }

  getCategory(tenant_id: any){
    let header = new HttpHeaders()
        .append('Authorization', `Bearer ${this.token}`);
    return this.http.get(`${this.apiUrlOne}/Category/get-by-tenant?id=${tenant_id}`, {headers:header});
    // return this.authApiService.get(`Category/get-by-tenant?id=${id}`);
    
  }
}
