import { Component } from '@angular/core';
import { StoreProductsService } from '../../../_services/store-products.service';
import { devData } from '../../../_environments/dev';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {

  wishlistItemsArray:any = [];
  tenant_id = devData.tenant_id;
  user_id = devData.userId;
  productData:any = [];
  wishlistItemsArrayDisplay:any = [];

  constructor(
    private apiService:StoreProductsService,
  ){

  }

  ngOnInit(){
    if(localStorage.getItem('WishlistItems')){
      this.wishlistItemsArray = JSON.parse(String(localStorage.getItem('WishlistItems')));
    }
    this.getProducts();
  }

  getProducts(){
    this.apiService.getProducts(this.tenant_id).subscribe(
        (response: any) => {
            if (response) {
                console.log('Get Product-->',response);
                this.productData = response;
                this.getWishlistModalDisplayArray(this.wishlistItemsArray);
                // this.getCart(this.user_id);
        }
      },
        (error:any) => {
            console.log('Error fetching data from API', error);
        }
      );
  }

  getWishlistModalDisplayArray(data:any){
    this.wishlistItemsArrayDisplay = [];
    // this.cartTotal = 0;
    for(let i = 0; i<this.productData.length; i++){
      for(let j = 0; j<this.wishlistItemsArray.length; j++){
        if(this.productData[i].productId === this.wishlistItemsArray[j].productId){
          let tempObj = {
            name: this.productData[i].name,
            price: this.productData[i].price,
            image: this.productData[i].productImages[0].downloadLink,
            quantity: this.wishlistItemsArray[j].quantity,
            productId: this.productData[i].productId,
            quantityInStock: this.productData[i].quantity,
            stockStatus: this.productData[i].productStatus,
          }
          this.wishlistItemsArrayDisplay.push(tempObj);
          // this.cartTotal += (Number(this.productData[i].price) * Number(this.wishlistItemsArray[j].quantity));
        }
      }
    }
    console.log('Wishlist in Modal Pop up-->', this.wishlistItemsArrayDisplay);
  }

  removeFromWishlist(product_id:string){

    this.wishlistItemsArray = this.wishlistItemsArray.filter(
      (item:any)=>{
        return item.productId != product_id
      });
    localStorage.setItem('WishlistItems',JSON.stringify(this.wishlistItemsArray));
    this.getWishlistModalDisplayArray(this.wishlistItemsArray);
    
  }

}
