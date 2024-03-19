import { Component } from '@angular/core';
import { devData } from '../../../_environments/dev';
import { StoreProductsService } from '../../../_services/store-products.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  tenant_id = devData.tenant_id;
  user_id = devData.userId;
  store_id = devData.storeId;
  productData:any = [];
  cartItemsArray:any = [];
  cartItemsArrayDisplay:any = [];
  cartTotal:number = 0;
  cartData:any = [];
  orderData:any = [];

  firstName:string = '';
  lastName:string = '';
  companyName:string = '';
  country:string = '';
  streetAddressOne:string = '';
  streetAddressTwo:string = '';
  city:string = '';
  state:string = '';
  zipCode:string = '';
  phoneNumber:string = '';
  emailAddress:string = '';



  constructor(
    private apiService:StoreProductsService,
    public router: Router,
    private http: HttpClient,
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
    this.orderData = [];
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
          let tempOrderData = {
            "productId": data[j].product.productId,
            "quantity": data[j].quantity,
            "totalPrice": (data[j].quantity * this.productData[i].price),
            "tax": 0
          }
          this.orderData.push(tempOrderData);
        }
        
      }
    }
    console.log('Cart in Modal Pop up Test-->', this.cartItemsArrayDisplay);
    console.log('Order Data Test-->', this.orderData);
    console.log('Cart Total Test-->', this.cartTotal);
    let orderInfo = {'orderData':this.orderData,'orderAmount':this.cartTotal};
    localStorage.setItem('orderInfo',JSON.stringify(orderInfo));
  }

  placeOrder(){
    this.router.navigateByUrl(`/payment`);
  }

  placeOrderByStripeTwo(){
    this.router.navigateByUrl(`/payment-one`);
  }

  saveOrder(){
    let requestBody = {
      "storeId": this.store_id,
      "userId": this.user_id,
      "tenantId": this.tenant_id,
      "paymentId": "string",
      "orderDate": new Date(Date.now()).toISOString(),
      "status": "Processing",
      "totalPrice": this.cartTotal,
      "tax": 0,
      "createdAt": new Date(Date.now()).toISOString(),
      "updatedAt": new Date(Date.now()).toISOString(),
      "orderItems": this.orderData,
    }
    this.apiService.postPlaceOrder(requestBody).subscribe(
      (response: any) => {
          if (response) {
              console.log('Place Order Response-->',response);
              // this.cartData = response;
              // this.getCartModalDisplayArray(this.cartData);
              // this.productData = response;
              // this.getCartModalDisplayArray(this.cartItemsArray);
      }
    },
      (error:any) => {
          console.log('Error fetching data from API', error);
      }
    );
  }

  placeOrderByStripe(){
    let tempObj = {
      name: `${this.firstName} ${this.lastName}`,
      company: this.companyName,
      country: this.country,
      state: this.state,
      city: this.city,
      address_line_one: this.streetAddressOne,
      address_line_two: this.streetAddressTwo,
      zip_code: this.zipCode,
      phone: this.phoneNumber,
      email: this.emailAddress,
    }
    console.log('Customer Address-->',tempObj);
    // this.saveOrder();
    // this.checkout();
    this.checkoutNew();
  }

  checkout() {
    // Check the server.js tab to see an example implementation
    let requestBody = [
      {
        "productId": "5eb4e532-8a80-4aad-866e-11b1819473c7",
        "productName": "Rain Lily - Heart Trob",
        "quantity": 2,
        "totalPrice": 2000,
        "tax": 0
      }
    ]
    // let httpOptions:any = {
    //   headers: new HttpHeaders({
    //     'Accept': 'text/html, application/xhtml+xml, */*',
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }),
    //   responseType: 'text'
    // };
    this.http.post('http://localhost:4022/create-checkout-session', requestBody)
      // .pipe(
      //   switchMap((session:any) => {
      //     return this.stripeService.redirectToCheckout({ sessionId: session.id })
      //   })
      // )
      .subscribe((result:any) => {
        // If `redirectToCheckout` fails due to a browser or network
        // error, you should display the localized error message to your
        // customer using `error.message`.
        // return this.stripeService.redirectToCheckout({ sessionId: session.id });
        document.location.href = result.session.url;
        console.log('Result--->',result);
        if (result.error) {
          alert(result.error.message);
        }
      },
      (error:any)=>{
        console.log('Error--->',error);
      }
      );
  }

  checkoutNew() {
    // Check the server.js tab to see an example implementation
    let requestBody = [
      {
        "productId": "5eb4e532-8a80-4aad-866e-11b1819473c7",
        "productName": "Rain Lily - Heart Trob",
        "quantity": 2,
        "totalPrice": 2000,
        "tax": 0
      }
    ]
    this.http.post('https://dev-ezyy-ecommerce.azurewebsites.net/api/Stripe/CreateChecoutOrder', requestBody)
      .subscribe((result:any) => {
        console.log('Result--->',result);
        document.location.href = result.url;
        
        if (result.error) {
          alert(result.error.message);
        }
      },
      (error:any)=>{
        console.log('Error--->',error);
      }
      );
  }

  checkoutRegime() {
    // Check the server.js tab to see an example implementation
    let requestBody = [
      {
        "productId": "5eb4e532-8a80-4aad-866e-11b1819473c7",
        "productName": "Rain Lily - Heart Trob",
        "quantity": 2,
        "totalPrice": 2000,
        "tax": 0
      }
    ]
    // let httpOptions:any = {
    //   headers: new HttpHeaders({
    //     'Accept': 'text/html, application/xhtml+xml, */*',
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }),
    //   responseType: 'text'
    // };
    this.http.post('http://localhost:4022/create-checkout-session', requestBody)
      // .pipe(
      //   switchMap((session:any) => {
      //     return this.stripeService.redirectToCheckout({ sessionId: session.id })
      //   })
      // )
      .subscribe((result:any) => {
        // If `redirectToCheckout` fails due to a browser or network
        // error, you should display the localized error message to your
        // customer using `error.message`.
        // return this.stripeService.redirectToCheckout({ sessionId: session.id });
        // document.location.href = result.session.url;
        console.log('Result--->',result);
        if (result.error) {
          alert(result.error.message);
        }
      },
      (error:any)=>{
        console.log('Error--->',error);
      }
      );
  }

}
