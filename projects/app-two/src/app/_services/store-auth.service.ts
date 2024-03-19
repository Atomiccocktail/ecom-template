import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { devData } from '../_environments/dev';

@Injectable()
export class StoreAuthService {

  apiUrl: string = 'https://dev-ezyy-identity.azurewebsites.net/api/v1';
  token = devData.token;
  StripePublicKey = 'pk_live_51OVIxdBGFqpkWyBM0CVU4Ba6L0HPC0FAO9rtLLf8vL2vL2KCz3Kmm50gTMLpD51yFUR4exJoWqjWRTL2UU5o0ROS00R1wJyYt9';
  StripePublicKey2= 'sk_test_51OVIxdBGFqpkWyBM4nrnenw4jIw2JwG2McTHGduutGviUyjPCMsB5tsMNio6DJe9OkzxY152MYrruZkxSQzwia5M00l1aPQnEZ';
  constructor(private http: HttpClient) { }


  postRegister(requestBody:any){
    let header = new HttpHeaders()
        .append('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${this.apiUrl}/Users/register`,requestBody, {headers:header});
  }

  postLogin(requestBody:any){
    let header = new HttpHeaders()
        .append('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${this.apiUrl}/Users/login`,requestBody, {headers:header});
  }
}
