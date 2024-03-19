import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { devData } from '../_environments/dev';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class StoreWishlistService {

    transferWishlistToHeader: BehaviorSubject<any> = new BehaviorSubject({});
    // isVisiblePremissa: BehaviorSubject<any> = new BehaviorSubject(false);
    
    constructor(private http: HttpClient) { }

    saveWishlistLocal(data:any){
        if(!localStorage.getItem('WishlistItems')){
            localStorage.setItem('WishlistItems',JSON.stringify(data.cartItems));
            this.transferWishlistToHeader.next(data.cartItems);
        }
        else{
            let existingCartItems = JSON.parse(String(localStorage.getItem('WishlistItems')));
            let currentCartItems = data.cartItems;
            console.log('existingCartItems-->',existingCartItems);
            console.log('currentCartItems-->',currentCartItems);
            let itemMisMatch = 0;

            for(let i = 0; i<existingCartItems.length; i++){
                if(currentCartItems[0].productId === existingCartItems[i].productId){
                    existingCartItems[i].quantity = Number(existingCartItems[i].quantity) + Number(currentCartItems[0].quantity);
                    localStorage.setItem('WishlistItems',JSON.stringify(existingCartItems));
                    this.transferWishlistToHeader.next(existingCartItems);
                }else{
                    itemMisMatch +=1;
                }
            }

            if(itemMisMatch === existingCartItems.length){
                existingCartItems.push(currentCartItems[0]);
                localStorage.setItem('WishlistItems',JSON.stringify(existingCartItems));
                this.transferWishlistToHeader.next(existingCartItems);
            }
        }
    }

  
}