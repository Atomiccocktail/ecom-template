import { Component, signal, ViewChild } from '@angular/core';
import { environment } from '../../../_environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

import { StripeService } from 'ngx-stripe';

import { injectStripe, StripePaymentElementComponent } from 'ngx-stripe';
import { Stripe } from '@stripe/stripe-js';
import {
  loadStripe,
  StripeElementsOptions, 
  StripePaymentElementOptions
} from '@stripe/stripe-js';
import { StoreProductsService } from '../../../_services/store-products.service';
import { Loading } from '../../common/loader/Loading';

@Component({
  selector: 'app-payment-one',
  templateUrl: './payment-one.component.html',
  styleUrls: ['./payment-one.component.css']
})
export class PaymentOneComponent {

  // stripe:any;
  stripeOld:Stripe = (window as any).Stripe('pk_test_51OVIxdBGFqpkWyBMcLDGk5CxcgTWffYm6lKUwnoGsHbEn4t4Nsuh5ZyBSf3Jn3jFvU4MGNt2ValWvQQknKkaXXCN00ZCa4KUdO');
  stripe:Stripe = (window as any).Stripe('pk_test_51OhndmJtOLThpVEtqmtO1sUo3q7BzmzGM7vgs6tatoK3jRB5WKl4o9rPGmtlDmcite5Brmq3qINY8aorYDMdIKtC00OMp3ZjSh');
  stripenew:any = loadStripe('pk_live_51OVIxdBGFqpkWyBM0CVU4Ba6L0HPC0FAO9rtLLf8vL2vL2KCz3Kmm50gTMLpD51yFUR4exJoWqjWRTL2UU5o0ROS00R1wJyYt9');
  elements:any;
  items:any = [{ id: "xl-tshirt" }];
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;
  checkoutTemp:any;

  // private readonly fb = inject(UntypedFormBuilder);
  // private readonly yourOwnAPI = inject(YourOwnAPIService);

  // paymentElementForm = this.fb.group({
  //   name: ['John doe', [Validators.required]],
  //   email: ['support@ngx-stripe.dev', [Validators.required]],
  //   address: [''],
  //   zipcode: [''],
  //   city: [''],
  //   amount: [2500, [Validators.required, Validators.pattern(/d+/)]]
  // });

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
    appearance: {
      theme: 'flat',
    },
  };

  paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: false
    }
  };

  // Replace with your own public key
  // stripe = injectStripe(this.yourOwnAPI.StripePublicKey);
  // stripe = injectStripe(this.apiService.StripePublicKey);
  paying = signal(false);

  constructor(
    private http: HttpClient,
    private stripeService: StripeService,
    private apiService:StoreProductsService,
    ){
    
  }

  ngOnInit(){
    // this.checkoutRegime();
    this.checkoutRegimeNew();

  }

  ngOnDestroy(){
    this.checkoutTemp.destroy();
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
    this.http.post('https://dev-ezyy-ecommerce.azurewebsites.net/api/Stripe/CreateCustomizeCheckoutOrder', requestBody)
      // .pipe(
      //   switchMap((session:any) => {
      //     // return this.stripeService.redirectToCheckout({ sessionId: session.id });
      //     console.log('Payment Intent--->',session);
      //     return this.stripeService.verifyIdentity(session);
          
      //   })
      // )
      .subscribe((result:any) => {
        // If `redirectToCheckout` fails due to a browser or network
        // error, you should display the localized error message to your
        // customer using `error.message`.
        console.log('result--->',result);
        // return this.stripeService.verifyIdentity(result);
        document.location.href = result;
        if (result.error) {
          console.log(result.error.message);
        }
      },
      (error:any)=>{
        console.log('Error--->',error);
      }
      );
  }

  checkoutold() {
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
    this.http.post('https://dev-ezyy-ecommerce.azurewebsites.net/api/Stripe/CreateChecoutOrder', requestBody)
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
        document.location.href = result;
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

  checkoutCurrent() {
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
    // this.http.post('https://dev-ezyy-ecommerce.azurewebsites.net/api/Stripe/CreateCustomizeCheckoutOrder', requestBody)
    this.http.post('http://localhost:4022/create-payment-intent', requestBody)
      // .pipe(
      //   switchMap((session:any) => {
      //     // return this.stripeService.redirectToCheckout({ sessionId: session.id });
      //     console.log('Payment Intent--->',session);
      //     return this.stripeService.verifyIdentity(session);
          
      //   })
      // )
      .subscribe((result:any) => {
        // If `redirectToCheckout` fails due to a browser or network
        // error, you should display the localized error message to your
        // customer using `error.message`.
        console.log('result--->',result);
        this.elementsOptions.clientSecret = result.clientSecret;
        let x:any = result;
        const appearance:any = {
          theme: 'stripe',
        };
        this.elements = this.stripe.elements({
          clientSecret: result.clientSecret,
        });

        // this.stripe.elements()

        // this.elements = this.stripe.elements({ appearance, x });
      
        const paymentElementOptions = {
          layout: "tabs",
        };
      
        // const paymentElement = this.elements.create("payment");
        const paymentElement = this.elements.create("payment", paymentElementOptions);
        paymentElement.mount("#payment-element");
        // this.elementsOptions.clientSecret = 'pi_3OlT8MJtOLThpVEt1cE1w2i8_secret_EVLvNa5NVflMxtK7aV978FzZN';

        // return this.stripeService.verifyIdentity(result);
        // document.location.href = result;
        if (result.error) {
          console.log(result.error.message);
        }
      },
      (error:any)=>{
        console.log('Error--->',error);
      }
      );
  }

  checkoutRegime() {
    Loading.show();
    let requestBody = [
      {
        "productId": "5eb4e532-8a80-4aad-866e-11b1819473c7",
        "productName": "Rain Lily - Heart Trob",
        "quantity": 2,
        "totalPrice": 2000,
        "tax": 0
      }
    ]
    // this.http.post('https://dev-ezyy-ecommerce.azurewebsites.net/api/Stripe/CreateCustomizeCheckoutOrder', requestBody)
    this.http.post('http://localhost:4022/create-checkout-session-two', requestBody)
      .subscribe((result:any) => {

        const { clientSecret } = result;

        const checkout = this.stripe.initEmbeddedCheckout({
          clientSecret,
        }).then((checkout)=>{
          this.checkoutTemp = checkout;
          checkout.mount('#checkout');
          Loading.hide();
        });

        if (result.error) {
          console.log(result.error.message);
        }
      },
      (error:any)=>{
        console.log('Error--->',error);
      }
      );
  }

  checkoutRegimeNew() {
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
    // this.http.post('https://dev-ezyy-ecommerce.azurewebsites.net/api/Stripe/CreateCustomizeCheckoutOrder', requestBody)
    this.http.post('https://dev-ezyy-ecommerce.azurewebsites.net/api/Stripe/CreateCheckoutOrderV3', requestBody)
      .subscribe((result:any) => {

        const clientSecret  = result.clientSecretKey;

        const checkout = this.stripe.initEmbeddedCheckout({
          clientSecret,
        }).then((checkout)=>{
          this.checkoutTemp = checkout;
          checkout.mount('#checkout');
        });

        if (result.error) {
          console.log(result.error.message);
        }
      },
      (error:any)=>{
        console.log('Error--->',error);
      }
      );
  }





  // invokeStripe() {
  //   if (!window.document.getElementById('stripe-script')) {
  //     const script = window.document.createElement('script');
  //     script.id = 'stripe-script';
  //     script.type = 'text/javascript';
  //     script.src = 'https://js.stripe.com/v3/';
  //     script.onload = () => {
  //       this.stripe = (<any>window).Stripe(environment.STRIPE_KEY);
  //      };
  //      window.document.body.appendChild(script);
  //     }
  //   }

  //   preparePayment(id) {
  //     const data: IPreparePyamentRequest = { via: 'stripe' };
  //     this.paymentService.preparePayment(data, id).subscribe((res) => {
  //       this.clientSecret = res['client_secret'];
  //       this.initialize();
  //     });
  //   }

  //   async initialize() {
  //     let emailAddress = '';
  //     const clientSecret = this.clientSecret;
  //     const appearance = {
  //       theme: 'stripe',
  //     };
  //     this.elements = this.stripe.elements({ appearance, clientSecret });
  //     const linkAuthenticationElement =
  //       this.elements.create('linkAuthentication');
  //     linkAuthenticationElement.mount('#link-authentication-element');
  //     linkAuthenticationElement.on('change', (event) => {
  //       emailAddress = event.value.email;
  //     });
  //     const paymentElementOptions = {
  //       layout: 'tabs',
  //     };
  //     const paymentElement = this.elements.create(
  //       'payment',
  //       paymentElementOptions
  //     );
  //     paymentElement.mount('#payment-element');
  //   }


  pay() {
    // if (this.paying() || this.paymentElementForm.invalid) return;
    // this.paying.set(true);

    // const { name, email, address, zipcode, city } = this.checkoutForm.getRawValue();

    this.stripenew
      .confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              
            }
          }
        },
        redirect: 'if_required'
      })
      .subscribe((result:any) => {
        this.paying.set(false);
        console.log('Result', result);
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          alert({ success: false, error: result.error.message });
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
            alert({ success: true });
          }
        }
      });
  }

  async initialize() {
    const response = await fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.items ),
    });
    const { clientSecret } = await response.json();
  
    const appearance = {
      theme: 'stripe',
    };
    this.elements = this.stripenew.elements({ appearance, clientSecret });
  
    const paymentElementOptions = {
      layout: "tabs",
    };
  
    const paymentElement = this.elements.create("payment", paymentElementOptions);
    paymentElement.mount("#payment-element");
  }
  
  async handleSubmit(e:any) {
    e.preventDefault();
    // setLoading(true);
  
    const { error } = await this.stripenew.confirmPayment({
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:4242/checkout.html",
      }
    });
  
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      console.log(error.message);
    } else {
      console.log("An unexpected error occurred.");
    }
  
    // setLoading(false);
  }

  async payBookOrder(){

    const { error }:any = await this.stripe.confirmPayment({
      elements: this.elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:6200/order",
      }
    });
  
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      console.log(error.message);
    } else {
      console.log("An unexpected error occurred.");
    }

  }
  
  // Fetches the payment intent status after payment submission
  // async checkStatus() {
  //   const clientSecret = new URLSearchParams(window.location.search).get(
  //     "payment_intent_client_secret"
  //   );
  
  //   if (!clientSecret) {
  //     return;
  //   }
  
  //   const { paymentIntent } = await this.stripenew.retrievePaymentIntent(clientSecret);
  
  //   switch (paymentIntent.status) {
  //     case "succeeded":
  //       console.log("Payment succeeded!");
  //       break;
  //     case "processing":
  //       showMessage("Your payment is processing.");
  //       break;
  //     case "requires_payment_method":
  //       showMessage("Your payment was not successful, please try again.");
  //       break;
  //     default:
  //       showMessage("Something went wrong.");
  //       break;
  //   }
  // }

}
