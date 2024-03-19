import { Component } from '@angular/core';
import { devData } from '../../../_environments/dev';
import { StoreProductsService } from '../../../_services/store-products.service';
import { StoreCartService } from '../../../_services/store-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  tenant_id = devData.tenant_id;
  user_id = devData.userId;
  productData:any = [];
  cartItemsArray:any = [];
  cartItemsArrayDisplay:any = [];
  cartTotal:number = 0;
  cartData:any = [];

  constructor(
    private apiService:StoreProductsService,
    private storeCartService:StoreCartService,
  ){

  }

  ngOnInit(){
    if(localStorage.getItem('CartItems')){
      this.cartItemsArray = JSON.parse(String(localStorage.getItem('CartItems')));
    }
    this.getProducts();
    // this.getCart(this.user_id);
  }

  ngAfterViewInit(){
    (document as any).getElementById('cart-dropdown').classList.remove('opened');
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

  getProducts(){
    this.apiService.getProducts(this.tenant_id).subscribe(
        (response: any) => {
            if (response) {
                console.log('Get Product-->',response);
                this.productData = response;
                // this.getCartModalDisplayArray(this.cartItemsArray);
                this.getCart(this.user_id);
        }
      },
        (error:any) => {
            console.log('Error fetching data from API', error);
        }
      );
  }

  // getCartModalDisplayArray(data:any){
  //   this.cartItemsArrayDisplay = [];
  //   this.cartTotal = 0;
  //   for(let i = 0; i<this.productData.length; i++){
  //     for(let j = 0; j<this.cartItemsArray.length; j++){
  //       if(this.productData[i].productId === this.cartItemsArray[j].productId){
  //         let tempObj = {
  //           name: this.productData[i].name,
  //           price: this.productData[i].price,
  //           image: this.productData[i].productImages[0].downloadLink,
  //           quantity: this.cartItemsArray[j].quantity,
  //           productId: this.productData[i].productId,
  //         }
  //         this.cartItemsArrayDisplay.push(tempObj);
  //         this.cartTotal += (Number(this.productData[i].price) * Number(this.cartItemsArray[j].quantity));
  //       }
  //     }
  //   }
  //   console.log('Cart in Modal Pop up-->', this.cartItemsArrayDisplay);
  // }

  getCartModalDisplayArray(data:any){
    this.cartItemsArrayDisplay = [];
    this.cartTotal = 0;
    for(let i = 0; i<this.productData.length; i++){
      for(let j = 0; j<data.length; j++){
        if(this.productData[i].productId === data[j].product.productId){
          let tempObj = {
            name: this.productData[i].name,
            price: this.productData[i].price,
            image: this.productData[i].productImages[0].downloadLink,
            quantity: data[j].quantity,
            productId: this.productData[i].productId,
            cartItemId: data[j].cartItemId,
          }
          this.cartItemsArrayDisplay.push(tempObj);
          this.cartTotal += (Number(this.productData[i].price) * Number(data[j].quantity));
        }
      }
    }
    console.log('Cart in Modal Pop up-->', this.cartItemsArrayDisplay);
  }

  decreaseProductQuantity(index:any){
    if(this.cartItemsArrayDisplay[index].quantity > 1){
      this.cartItemsArrayDisplay[index].quantity -= 1;
    }
    
  }

  increaseProductQuantity(index:any){
    this.cartItemsArrayDisplay[index].quantity += 1;
  }

  removeFromCart(product_id:string,cartItemId:string){
    this.apiService.deleteCartItem(cartItemId).subscribe(
      (response: any) => {
          if (response) {
              console.log('Delete Product Response-->',response);
              // this.cartItemsArray = this.cartItemsArray.filter(
              //   (item:any)=>{
              //     return item.productId != product_id
              //   });
              // localStorage.setItem('CartItems',JSON.stringify(this.cartItemsArray));
              // this.getCartModalDisplayArray(this.cartItemsArray);
              this.getProducts();
              this.storeCartService.transferCartToHeader.next(response);

      }
    },
      (error:any) => {
          console.log('Error fetching data from API', error);
      }
    );
    
  }

}
