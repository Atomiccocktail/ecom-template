import { Component } from '@angular/core';
import { StoreCartService } from '../../_services/store-cart.service';
import { StoreProductsService } from '../../_services/store-products.service';
import { devData } from '../../_environments/dev';
import { StoreWishlistService } from '../../_services/store-wishlist.service';

import abc from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  tenant_id = devData.tenant_id;
  user_id = devData.userId;
  productData:any = [];
  cartItemsArray:any = [];
  cartItemsArrayDisplay:any = [];
  wishlistItemsArray:any = [];
  wishlistItemsArrayDisplay:any = [];
  cartTotal:number = 0;
  cartData:any = [];

  isObjectEmpty = (objectName:any) => {
    return abc.isEmpty(objectName);
  };

  constructor(
    private cartService:StoreCartService,
    private apiService:StoreProductsService,
    private wishlistService:StoreWishlistService,
    public router: Router,
    ){

    }

  ngOnInit(){
    // if(localStorage.getItem('CartItems')){
    //   this.cartItemsArray = JSON.parse(String(localStorage.getItem('CartItems')));
    // }
    if(localStorage.getItem('WishlistItems')){
      this.wishlistItemsArray = JSON.parse(String(localStorage.getItem('WishlistItems')));
    }
    this.cartService.transferCartToHeader.subscribe((dataRecieved) => {
      // debugger;
      if(!this.isObjectEmpty(dataRecieved)){
        // this.cartItemsArray = dataRecieved;
        // console.log('CartItems in Header--->',this.cartItemsArray,dataRecieved);
        // this.getCartModalDisplayArray(this.cartItemsArray);
        this.getProducts();
      }
    });
    this.wishlistService.transferWishlistToHeader.subscribe((dataRecieved) => {
      if(dataRecieved.length > 0){
        this.wishlistItemsArray = dataRecieved;
        console.log('CartItems in Header--->',this.wishlistItemsArray,dataRecieved);
        this.getWishlistModalDisplayArray(this.wishlistItemsArray);
        // this.getProducts();
      }
    });
    console.log('Cart in Header-->',this.cartItemsArray);
    console.log('Wishlist in Header-->',this.wishlistItemsArray);
    this.getProducts();
  }

  getProducts(){
    this.apiService.getProducts(this.tenant_id).subscribe(
        (response: any) => {
            if (response) {
                console.log('Get Product-->',response);
                this.productData = response;
                // this.getCartModalDisplayArray(this.cartItemsArray);
                this.getWishlistModalDisplayArray(this.wishlistItemsArray);
                this.getCart(this.user_id);

                // this.tableData = response;
                // this.tableData.map((item:any)=>{
                //   item.checked = false;
                // })
                // console.log('Get tableData-->',this.tableData);
        }
      },
        (error:any) => {
            console.log('Error fetching data from API', error);
        }
      );
  }

  getCart(userId:string){
    this.apiService.getCartByUserId(this.user_id).subscribe(
        (response: any) => {
            if (response) {
                console.log('Get cart-->',response);
                this.cartData = response;
                this.getCartModalDisplayArray(this.cartData);
                // this.productData = response;
                // this.getCartModalDisplayArray(this.cartItemsArray);
        }
      },
        (error:any) => {
            console.log('Error fetching data from API', error);
        }
      );
  }

  getCartModalDisplayArray(data:any){
    this.cartItemsArrayDisplay = [];
    this.cartTotal = 0;
    this.cartItemsArray = data;
    for(let i = 0; i<this.productData.length; i++){
      for(let j = 0; j<this.cartItemsArray.length; j++){
        if(this.productData[i].productId === this.cartItemsArray[j].product.productId){
          let tempObj = {
            name: this.productData[i].name,
            price: this.productData[i].price,
            image: this.productData[i].productImages[0].downloadLink,
            quantity: this.cartItemsArray[j].quantity,
            productId: this.productData[i].productId,
            cartItemId: this.cartItemsArray[j].cartItemId,
          }
          this.cartItemsArrayDisplay.push(tempObj);
          this.cartTotal += (Number(this.productData[i].price) * Number(this.cartItemsArray[j].quantity));
        }
      }
    }
    console.log('Cart in Modal Pop up-->', this.cartItemsArrayDisplay);
  }

  getWishlistModalDisplayArray(data:any){
    this.wishlistItemsArrayDisplay = [];
    for(let i = 0; i<this.productData.length; i++){
      for(let j = 0; j<this.wishlistItemsArray.length; j++){
        if(this.productData[i].productId === this.wishlistItemsArray[j].productId){
          let tempObj = {
            name: this.productData[i].name,
            price: this.productData[i].price,
            image: this.productData[i].productImages[0].downloadLink,
            quantity: this.wishlistItemsArray[j].quantity,
            productId: this.productData[i].productId,
          }
          this.wishlistItemsArrayDisplay.push(tempObj);
          // this.cartTotal += (Number(this.productData[i].price) * Number(this.wishlistItemsArray[j].quantity));
        }
      }
    }
    console.log('Cart in Modal Pop up-->', this.wishlistItemsArrayDisplay);
  }

  removeFromWishlist(product_id:string){
    this.wishlistItemsArray = this.wishlistItemsArray.filter(
      (item:any)=>{
        return item.productId != product_id
      });
    localStorage.setItem('WishlistItems',JSON.stringify(this.wishlistItemsArray));
    this.getWishlistModalDisplayArray(this.wishlistItemsArray);
  }

  removeFromCart(product_id:string,cartItemId:string){
    this.apiService.deleteCartItem(cartItemId).subscribe(
      (response: any) => {
          if (response) {
              console.log('Delete Product Response-->',response);
              this.getProducts();
              // this.cartItemsArray = this.cartItemsArray.filter(
              //   (item:any)=>{
              //     return item.productId != product_id
              //   });
              // localStorage.setItem('CartItems',JSON.stringify(this.cartItemsArray));
              // this.getCartModalDisplayArray(this.cartItemsArray);
      }
    },
      (error:any) => {
          console.log('Error fetching data from API', error);
      }
    );
    
  }

  routeToCart(){
    
    (document as any).getElementById("search-text").focus();
    this.router.navigateByUrl(`/cart`);
      // (document as any).getElementById('cart-dropdown').classList.remove('opened');
    
  }

  routeToCheckout(){
    this.router.navigateByUrl(`/checkout`);
  }

}
