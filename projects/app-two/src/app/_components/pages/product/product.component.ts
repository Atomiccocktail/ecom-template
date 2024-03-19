import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreProductsService } from '../../../_services/store-products.service';
import { devData } from '../../../_environments/dev';
import { StoreCartService } from '../../../_services/store-cart.service';
import { StoreWishlistService } from '../../../_services/store-wishlist.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  selectedProductId:string = '';
  productData:any = [];
  storeId = devData.storeId;
  userId = devData.userId;
  tenantId = devData.tenant_id;

  constructor( 
    private route: ActivatedRoute, 
    private apiService:StoreProductsService, 
    private cartService:StoreCartService,
    private wishlistService:StoreWishlistService,
    public router: Router,
  ){
    const id: string = route.snapshot.params['id'];
        this.selectedProductId = id;
        console.log('Selected Product--->',id);
  }

  ngOnInit(){
    this.getProductDetails();
    // this.addToCart();
  }

  getProductDetails(){
    this.apiService.getProductById(this.selectedProductId).subscribe(
      (response: any) => {
          if (response) {
              console.log('Get Product Details-->',response);
              this.productData = response;



              // this.tableData = response;
      }
    },
      (error:any) => {
          console.log('Error fetching data from API', error);
      }
    );
  }

  addToCart(){
    
    // let requestBody = {
    //   "userId": this.userId,
    //   "storeId": this.storeId,
    //   "tenantId": this.tenantId,
    //   "cartItems": [
    //     {
    //       "cartId": "",
    //       "productId": this.selectedProductId,
    //       "quantity": 1
    //     }
    //   ],
    //   "createdAt": new Date(Date.now()).toISOString(),
    // }

    let requestBody = {
          "userId": devData.userId,
          "siteId": devData.storeId,
          "productId": this.selectedProductId,
          "quantity": 1
        };
    // this.cartService.saveCartLocal(requestBody);
    this.cartService.processAddCart(requestBody);
    
  }

  addToWishlist(){
    
    let requestBody = {
      "userId": this.userId,
      "storeId": this.storeId,
      "tenantId": this.tenantId,
      "cartItems": [
        {
          "cartId": "",
          "productId": this.selectedProductId,
          "quantity": 1
        }
      ],
      "createdAt": new Date(Date.now()).toISOString(),
    }
    this.wishlistService.saveWishlistLocal(requestBody);
    // this.apiService.postAddToCart(requestBody).subscribe(
    //   (response: any) => {
    //       if (response) {
    //           console.log('Post Cart Details-->',response);
    //           // this.productData = response;

    //   }
    // },
    //   (error:any) => {
    //       console.log('Error fetching data from API', error);
    //   }
    // );
  }

  browseCategory(category:string){
    console.log('Selected Category-->',category);
    this.router.navigateByUrl(`/shop?category=${category}`);
  }

}
