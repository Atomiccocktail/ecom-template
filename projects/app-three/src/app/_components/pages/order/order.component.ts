import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  constructor(private activatedRoute: ActivatedRoute){

  }

  ngOnInit(){
    this.activatedRoute.queryParams.subscribe(params => {
      const payment_intent = params['payment_intent'];
      const payment_intent_client_secret = params['payment_intent_client_secret'];
      const redirect_status = params['redirect_status'];
      console.log('Params-->',params);
      console.log('Payment_intent-->',payment_intent);
      console.log('Payment_intent_client_secret-->',payment_intent_client_secret);
      console.log('Redirect_status-->',redirect_status);
    });
  }

}
