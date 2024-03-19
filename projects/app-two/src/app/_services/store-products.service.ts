import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { devData } from '../_environments/dev';

@Injectable()
export class StoreProductsService {

  apiUrl: string = 'https://dev-ezyy-ecommerce.azurewebsites.net/api/v1';
  apiUrlOne: string = 'https://dev-ezyy-ecommerce.azurewebsites.net/api';
  token = devData.token;
  StripePublicKey = 'pk_live_51OVIxdBGFqpkWyBM0CVU4Ba6L0HPC0FAO9rtLLf8vL2vL2KCz3Kmm50gTMLpD51yFUR4exJoWqjWRTL2UU5o0ROS00R1wJyYt9';
  StripePublicKey2= 'sk_test_51OVIxdBGFqpkWyBM4nrnenw4jIw2JwG2McTHGduutGviUyjPCMsB5tsMNio6DJe9OkzxY152MYrruZkxSQzwia5M00l1aPQnEZ';
  constructor(private http: HttpClient) { }

  getProducts(tenant_id: any){
    let header = new HttpHeaders()
        .append('Authorization', `Bearer ${this.token}`);
    return this.http.get(`${this.apiUrl}/product/get-by-tenant?id=${tenant_id}`, {headers:header});
    
  }

  getProductById(product_id: any){
    let header = new HttpHeaders()
        .append('Authorization', `Bearer ${this.token}`);
    return this.http.get(`${this.apiUrl}/Product?id=${product_id}`, {headers:header});
    
  }

  postAddToCart(requestBody:any){
    let header = new HttpHeaders()
        .append('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${this.apiUrl}/Cart`,requestBody, {headers:header});
  }

  updateCartItem(requestBody:any){
    let header = new HttpHeaders()
        .append('Authorization', `Bearer ${this.token}`);
    return this.http.put(`${this.apiUrl}/Cart/update-cart-item`,requestBody, {headers:header});
  }

  deleteCartItem(cartItemId:string){
    let header = new HttpHeaders()
    .append('Authorization', `Bearer ${this.token}`);
    // header.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    // header.set('Pragma', 'no-cache');
    // header.set('Expires', '0');
    return this.http.delete(`${this.apiUrl}/Cart/delete-cart-item?id=${cartItemId}`,{ headers:header } );
  }

  getCartByUserId(userId: string){
    let header = new HttpHeaders()
        .append('Authorization', `Bearer ${this.token}`);
    return this.http.get(`${this.apiUrl}/Cart?id=${userId}`, {headers:header});
    
  }

  postPlaceOrder(requestBody:any){
    let header = new HttpHeaders()
        .append('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${this.apiUrlOne}/Order`,requestBody, {headers:header});
  }

  getProductsByCategory(tenant_id: any,category_id:any){
    let header = new HttpHeaders()
        .append('Authorization', `Bearer ${this.token}`);
    return this.http.get(`${this.apiUrl}/product/get-by-tenant?id=${tenant_id}&Category=${category_id}`, {headers:header});
    
  }
}
