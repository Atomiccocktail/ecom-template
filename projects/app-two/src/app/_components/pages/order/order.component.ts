import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { devData } from '../../../_environments/dev';
import { StoreProductsService } from '../../../_services/store-products.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  recievedSessionId:any;
  orderStatus:any;
  orderInfo:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private apiService:StoreProductsService,
    ){

    this.activatedRoute.queryParams
      .subscribe((params):any => {
        console.log('Params-->',params);
        this.recievedSessionId = params['session_id'];
        console.log('Params 2-->',this.recievedSessionId);
      }
    );
  }

  ngOnInit(){
    if(localStorage.getItem('orderInfo')){
      this.orderInfo = JSON.parse(String(localStorage.getItem('orderInfo')));
    }
    this.activatedRoute.queryParams.subscribe(params => {
      const payment_intent = params['payment_intent'];
      const payment_intent_client_secret = params['payment_intent_client_secret'];
      const redirect_status = params['redirect_status'];
      console.log('Params-->',params);
      console.log('Payment_intent-->',payment_intent);
      console.log('Payment_intent_client_secret-->',payment_intent_client_secret);
      console.log('Redirect_status-->',redirect_status);
    });
    if(this.recievedSessionId){
      this.http.get(`http://localhost:4022/session-status?session_id=${this.recievedSessionId}`)
      .subscribe((result:any) => {
        console.log('Result--->',result);
        this.orderStatus = result.status;
      },
      (error:any)=>{
        console.log('Error--->',error);
      }
      );
    }

    this.saveOrder()

  }

  saveOrder(){
    let requestBody = {
      "storeId": devData.storeId,
      "userId": devData.userId,
      "tenantId": devData.tenant_id,
      "paymentId": "string",
      "orderDate": new Date(Date.now()).toISOString(),
      "status": "Processing",
      "totalPrice": this.orderInfo.orderAmount,
      "tax": 0,
      "createdAt": new Date(Date.now()).toISOString(),
      "updatedAt": new Date(Date.now()).toISOString(),
      "orderItems": this.orderInfo.orderData,
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

}
