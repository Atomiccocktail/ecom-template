import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { devData } from '../_environments/dev';
import { BehaviorSubject } from 'rxjs';
import { StoreProductsService } from './store-products.service';

@Injectable()
export class StoreCartService {

    transferCartToHeader: BehaviorSubject<any> = new BehaviorSubject({});
    cartItemsArray:any = [];
    // isVisiblePremissa: BehaviorSubject<any> = new BehaviorSubject(false);
    
    constructor(private http: HttpClient, private apiService:StoreProductsService, ) { }

    saveCartLocal(data:any){
        let dataRequest = data;
        data.cartItemId = '';
        if(!localStorage.getItem('CartItems')){
            let cartArray = [];
            cartArray.push(data);
            // localStorage.setItem('CartItems',JSON.stringify(cartArray));
            this.addCart(dataRequest);
            // this.transferCartToHeader.next(data);
        }
        else{
            let existingCartItems = JSON.parse(String(localStorage.getItem('CartItems')));
            let currentCartItems = data;
            console.log('existingCartItems-->',existingCartItems);
            console.log('currentCartItems-->',currentCartItems);
            let itemMisMatch = 0;

            for(let i = 0; i<existingCartItems.length; i++){
                if(currentCartItems.productId === existingCartItems[i].productId){
                    existingCartItems[i].quantity = Number(existingCartItems[i].quantity) + Number(currentCartItems.quantity);
                    localStorage.setItem('CartItems',JSON.stringify(existingCartItems));
                    // this.transferCartToHeader.next(existingCartItems);
                    this.updateCart(existingCartItems[i]);
                    break;
                }else{
                    itemMisMatch +=1;
                }
            }

            if(itemMisMatch === existingCartItems.length){
                existingCartItems.push(currentCartItems);
                localStorage.setItem('CartItems',JSON.stringify(existingCartItems));
                // this.transferCartToHeader.next(existingCartItems);
                this.addCart(dataRequest);
            }
        }
    }

    processAddCart(requestBody:any){
        // debugger;
        let itemMisMatch = 0;
        this.apiService.getCartByUserId(devData.userId).subscribe((response:any)=>{
            this.cartItemsArray = response;
            for(let i=0; i<this.cartItemsArray.length; i++){
                if(this.cartItemsArray[i].product.productId === requestBody.productId)
                {
                    requestBody.quantity = Number(this.cartItemsArray[i].quantity) + 1;
                    requestBody.cartItemId = this.cartItemsArray[i].cartItemId;
                    this.updateCart(requestBody);
                }else{
                    itemMisMatch +=1;
                }
            }

            if(itemMisMatch === this.cartItemsArray.length){
                // existingCartItems.push(currentCartItems);
                // localStorage.setItem('CartItems',JSON.stringify(existingCartItems));
                // this.transferCartToHeader.next(existingCartItems);
                this.addCart(requestBody);
            }
        },
        (error:any)=>{
            console.log('Error get Cart',error);
        }
        );
    }

    addCart(requestBody:any){
        this.apiService.postAddToCart(requestBody).subscribe(
            (response: any) => {
                if (response) {
                    console.log('Post Cart Details-->',response);
                    // this.productData = response;
                    this.transferCartToHeader.next(requestBody);
                    // this.updateLocalCart(requestBody,response)
      
            }
          },
            (error:any) => {
                console.log('Error fetching data from API', error);
            }
          );
    }

    updateCart(data:any){
        let requestBody = {
            "cartItemId": data.cartItemId,
            "productId": data.productId,
            "quantity": data.quantity
          }
        this.apiService.updateCartItem(requestBody).subscribe(
            (response: any) => {
                if (response) {
                    // debugger;
                    console.log('Update Cart Details-->',response);
                    // this.updateLocalCartRecord(requestBody);
                    // this.productData = response;
                    this.transferCartToHeader.next(requestBody);
                    // this.updateLocalCart(requestBody,response);

      
            }
          },
            (error:any) => {
                console.log('Error fetching data from API', error);
            }
          );
    }

    updateLocalCart(request:any,response:any){
        let existingCartItems = JSON.parse(String(localStorage.getItem('CartItems')));
        if(existingCartItems){
            for(let i=0; i<existingCartItems.length;i++){
                if(existingCartItems[i].productId == request.productId){
                    existingCartItems[i].cartItemId = response.id;
                    break;
                    // return;
                }
            }
            localStorage.setItem('CartItems',JSON.stringify(existingCartItems));
            this.transferCartToHeader.next(existingCartItems);
        }else{
            let tempObj = {
                "userId": devData.userId,
                "siteId": devData.storeId,
                "productId": request.productId,
                "quantity": 1,
                "cartItemId": response.id
            };
            localStorage.setItem('CartItems',JSON.stringify(tempObj));
            this.transferCartToHeader.next(tempObj);
        }
        
    }

    updateLocalCartRecord(request:any){
        let existingCartItems = JSON.parse(String(localStorage.getItem('CartItems')));
        for(let i=0; i<existingCartItems.length;i++){
            if(existingCartItems[i].productId == request.productId){
                existingCartItems[i].quantity = request.quantity;
                break;
                // return;
            }
        }
        localStorage.setItem('CartItems',JSON.stringify(existingCartItems));
        this.transferCartToHeader.next(existingCartItems);
    }

  
}